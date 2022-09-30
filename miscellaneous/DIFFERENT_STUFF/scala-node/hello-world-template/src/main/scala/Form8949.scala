package ai.computis.reports

import ai.computis.models.{Report, ReportResponse}
import ai.computis.mongodb.Mongo
import ai.computis.s3.Files
import ai.computis.tax.{Calculations, Form8949Row, TaxEngine}
import ai.computis.util.Functions._
import ai.computis.util.Comparators.{Comparator}
import ai.computis.solvers.{SolverResult}
import ai.computis.wrapper.TaxableTransaction
import akka.NotUsed
import akka.stream.scaladsl.{FileIO, Source}
import akka.util.ByteString
import com.univocity.parsers.csv.{CsvWriter, CsvWriterSettings}
import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm
import org.json4s._
import org.json4s.jackson.Serialization.write
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters.equal
import org.slf4j.{Logger, LoggerFactory}

import java.io.{File, FileWriter, _}
import java.net.URL
import java.text.SimpleDateFormat
import java.util.{Calendar, Date, TimeZone, UUID}
import scala.collection.parallel.CollectionConverters._
import scala.concurrent.duration.{Duration, SECONDS}
import scala.concurrent.{Await, ExecutionContext, Future}
import scala.language.postfixOps
import scala.sys.process._
import scala.collection.parallel.immutable.ParVector

object Form8949 {
  val logger: Logger = LoggerFactory.getLogger(this.getClass)
  implicit val formats: DefaultFormats.type = DefaultFormats

  /**
   * Runs the tax engine and filters out taxable transactions for the given year
   *
   * @param report [[Report]]
   * @param ec     implicit [[ExecutionContext]]
   * @return [[Tuple[Vector[Form8949]\]]\]
   */
  def processTaxResults(
                         report: Report
                       )(implicit ec: ExecutionContext): (Vector[Form8949Row], Vector[String], List[String]) = {
    var messages: Vector[String] = Vector()
    val cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"))

    cal.set(report.taxYear.getOrElse(0) + 1, 0, 1, 0, 0, 0)

    val te = new TaxEngine(
      report.clientId,
      cal.getTime,
      report.costingMethod.getOrElse("FIFO"),
      report.amount.getOrElse(0).toFloat,
      report.persist.getOrElse(false)
    )

    if (te.message.nonEmpty) throw new Exception(te.message)

    val year = report.taxYear.getOrElse(1970)

    val findByFieldYear = (year: Option[Int], start: Date, end: Date) => {
      val checkStart = new Comparator(start, new Date(0))
      if (year.getOrElse(0) == 0) checkStart.equal
      else true
    }

    val getFilteredTransactions = (
      transactions: ParVector[SolverResult],
      start: Date,
      end: Date,
      yearTime: Option[Int]
    ) => {
      val year = yearTime.getOrElse(1970)

      if (findByFieldYear(yearTime, start, end)) {
        transactions.filter(x => x.tx.isCapitalGain && x.tx.getYear == year)
      }
      else transactions.filter(x => {
        val from = new Comparator(x.tx.datetime, start)
        val to = new Comparator(x.tx.datetime, end)
        x.tx.isCapitalGain && to.lessOrEqueal && from.greaterOrEqual
      })
    }

    val tePars = te.process().par

    val filtered = getFilteredTransactions(tePars, report.startDate, report.endDate, report.taxYear)

    val grouped = filtered.groupBy(_.tx.fullySourced)

    val rows =
      if (grouped.contains(true))
        grouped(true)
          .flatMap(x =>
            x.vector.map((basis: TaxableTransaction) => Calculations.createForm8949(basis))
          )
          .toVector
      else {
        messages = Vector("Error: Solver returned no taxable results")
        Vector()
      }

    var logs = List[String]()
    if (grouped.contains(false)){
      messages = messages :+ s"Could not solve for ${grouped(false).size} capital gain transactions"
      grouped(false).foreach(group => {
        val log = s"""
                     |  id             : ${group.tx._id}
                     |  datetime       : ${group.tx.datetime}
                     |  txHash         : ${group.tx.txHash}
                     |  creditAsset    : ${group.tx.creditAsset}
                     |  creditAccount  : ${group.tx.creditAccount}
                     |  possible srcTxs: ${group.possibleTxsIds.length}
                     |  filter errors  : ${group.filterErrorsMap.toString()}
                     |  srcTxs         : ${group.srcTxsIds.length}
                     |  message        : ${group.msg}""".stripMargin
        logger.warn(log)
        logs = logs :+ log
      })
    }
    else if (rows.nonEmpty) messages = Vector("success")

    (rows, messages, logs)
  }

  /**
   * Create an 8949 report, will automatically pick to output to CSV if there are too many transactions
   * to put on the PDF
   *
   * @param report [[Report]] object
   * @return [[ReportResponse]]
   */
  def createReport(report: Report)(implicit ec: ExecutionContext): ReportResponse = {
    val preProcessed = processTaxResults(report)
    val vector = preProcessed._1
    var messages = preProcessed._2

    val outFile: File =
      if (report.outputFormat.getOrElse("pdf") == "csv" || report.outputFormat.getOrElse("pdf") == "xlsx" ||
        vector.count(_.shortTerm) > 14 || vector.count(!_.shortTerm) > 14) {
        if (report.outputFormat.getOrElse("pdf") == "pdf") {
          report.updateFileType("csv")
          messages = messages :+ "Too many results to use PDF, defaulting to CSV"
        }
        createCSV(report, vector)
      } else if (report.outputFormat.getOrElse("pdf") == "json") {
        createJSON(report, vector)
      } else {
        createPDF(report, vector)
      }

    if (preProcessed._3.nonEmpty) {
      val logsFileName = createLogs(report._id, preProcessed._3.mkString("\n"))
      report.updateReportLogsPath(logsFileName)
    }

    ReportResponse(outFile, messages)
  }

  def createLogs(reportId: ObjectId, content: String): String = {
    val fileName = s"${reportId}-${UUID.randomUUID().toString}.txt"
    val file = new File(fileName)
    val bw = new BufferedWriter(new FileWriter(file))

    bw.write(content)
    bw.close()

    val src = FileIO.fromPath(file.toPath).asInstanceOf[Source[ByteString, NotUsed]]
    new Files().writeToS3(src, file.getName, "report_logs/")
    file.delete()
    fileName
  }

  def createJSON(report: Report, vector: Vector[Form8949Row]): File = {
    val fileName = s"${report._id}-${UUID.randomUUID().toString}.json"
    val file = new File(fileName)
    val json = write(vector)
    val pw = new PrintWriter(file)

    pw.write(json)
    pw.close()

    file
  }

  def createCSV(report: Report, vector: Vector[Form8949Row]): File = {
    val client = getClient(report)
    val fileName = s"${report._id}-${UUID.randomUUID().toString}.csv"
    val outputWriter = new FileWriter(fileName)
    val csvWrtier = new CsvWriter(outputWriter, new CsvWriterSettings)

    csvWrtier.writeHeaders(
      "Description of property",
      "Date acquired",
      "Date sold or disposed of",
      "Proceeds",
      "Cost or other tx.",
      "Gain or (loss)",
      "TxHash",
    )

    vector
      .groupBy(_.shortTerm)
      .foreach(grp => {
        var totalProceeds = 0.0
        var totalBasis = 0.0
        var totalGain = 0.0

        csvWrtier.writeRow(if (grp._1) "Short Term" else "Long Term")

        grp._2.foreach(row => {
          val line = Array(
            row.description,
            formatTS(row.txDate),
            formatTS(row.soldDate),
            row.proceeds.toString,
            row.basis.toString,
            row.gain.toString,
            row.txHash
          )
          totalBasis += row.basis
          totalGain += row.gain
          totalProceeds += row.proceeds

          csvWrtier.writeRow(line)
        })

        csvWrtier.writeRow(
          Array("Totals:", "", "", totalProceeds.toString, totalBasis.toString, totalGain.toString)
        )
      })

    csvWrtier.close()
    outputWriter.close()

    new File(fileName)
  }

  def createPDF(report: Report, vector: Vector[Form8949Row])(
    implicit ec: ExecutionContext
  ): File = {
    val client = getClient(report)

    logger.debug(s"Loading downloaded 8949")
    val pdfDocument = PDDocument.load(new File(downloadFile(report.taxYear.getOrElse(1970))))
    val docCatalog = pdfDocument.getDocumentCatalog
    val acroForm = docCatalog.getAcroForm

    //page 1
    acroForm
      .getField("topmostSubform[0].Page1[0].f1_1[0]")
      .setValue(client.map(_.clientName.getOrElse("")).getOrElse(""))

    val ssn = client.map(_.taxId.getOrElse("")).getOrElse("")
    val ssnf =
      if (ssn.length == 9) s"${ssn.substring(0, 3)}-${ssn.substring(3, 5)}-${ssn.substring(5, 9)}"
      else ssn

    acroForm
      .getField("topmostSubform[0].Page1[0].f1_2[0]")
      .setValue(ssnf)

    acroForm
      .getField("topmostSubform[0].Page1[0].c1_1[2]")
      .setValue("3")

    //page 2
    acroForm
      .getField("topmostSubform[0].Page2[0].f2_1[0]")
      .setValue(s"${client.map(_.clientName).getOrElse("")}")

    acroForm
      .getField("topmostSubform[0].Page2[0].f2_2[0]")
      .setValue(ssnf)

    acroForm
      .getField("topmostSubform[0].Page2[0].c2_1[2]")
      .setValue("3")

    // 14 lines per page

    fillTable(vector.filter(_.shortTerm), acroForm, true)
    fillTable(vector.filter(!_.shortTerm), acroForm, false)

    val fileName = s"${report._id}-${UUID.randomUUID().toString}.pdf"
    val outFile = new File(fileName)

    if (outFile.exists()) outFile.delete()

    pdfDocument.save(fileName)
    pdfDocument.close()

    new File(fileName)
  }

  private def fillTable(
                         rows: Vector[Form8949Row],
                         acroForm: PDAcroForm,
                         isShortTerm: Boolean
                       ): Unit = {
    var i = 1
    var j = 3
    val page = if (isShortTerm) 1 else 2

    var totalProceeds = 0.0
    var totalBasis = 0.0
    var totalGain = 0.0

    for (row <- rows) {
      totalProceeds += row.proceeds
      totalBasis += row.basis
      totalGain += row.gain

      // loop each column
      for (k <- 0 to 7) {
        try {
          acroForm
            .getField(s"topmostSubform[0].Page$page[0].Table_Line1[0].Row$i[0].f${page}_$j[0]")
            .setValue(getValue(row, k))
        } catch {
          case e: Throwable =>
            e.printStackTrace()
        }
        j += 1
      }
      i += 1
    }

    //    if (totalProceeds > 0.0)
    acroForm
      .getField(s"topmostSubform[0].Page$page[0].f${page}_115[0]")
      .setValue(round(totalProceeds).toString)

    acroForm
      .getField(s"topmostSubform[0].Page$page[0].f${page}_116[0]")
      .setValue(round(totalBasis).toString)

    try {
      // 2018+
      acroForm
        .getField(s"topmostSubform[0].Page$page[0].f${page}_119[0]")
        .setValue(round(totalGain).toString)
    } catch {
      // <2018
      // this has not been fully tested to make sure this is the right
      case _: Throwable =>
        acroForm
          .getField(s"topmostSubform[0].Page$page[0].f${page}_118[0]")
          .setValue(round(totalGain).toString)
    }
  }

  private def getValue(row: Form8949Row, idx: Int) = {
    idx match {
      case 0 => row.description
      case 1 => formatTSPDF(row.txDate)
      case 2 => formatTSPDF(row.soldDate)
      case 3 => row.proceeds.toString
      case 4 => row.basis.toString
      case 7 => row.gain.toString
      case _ => ""
    }
  }

  private def formatTS(ts: Date) = {
    val date = new Date(ts.getTime)
    date.setTime(ts.getTime)
    new SimpleDateFormat("yyyy-MM-dd hh:mm:ss a").format(date)
  }

  private def formatTSPDF(ts: Date) = {
    val date = new Date(ts.getTime)
    date.setTime(ts.getTime)
    new SimpleDateFormat("MM, dd, yyyy").format(date)
  }

  private def getClient(report: Report) = {
    Await.result(
      Mongo.clientCollection
        .find(equal("_id", report.clientId))
        .headOption(),
      Duration.Inf
    )
  }

  private def downloadFile(year: Int)(implicit ec: ExecutionContext) = {
    val url = "https://www.irs.gov/pub/irs-prior/f8949--#YEAR#.pdf"
      .replace("#YEAR#", year.toString)
    val tmpPDFPath = s"/tmp/f8949-$year.tmp"
    logger.debug("Trying to download 8949 from IRS")

    if (!new File(tmpPDFPath).exists()) {
      val fut = Future {
        new URL(url) #> new File(tmpPDFPath) !!
      }

      try {
        Await.ready(fut, Duration(15, SECONDS))
      } catch {
        case e: Throwable =>
          // clean up hanging file from FS
          new File(tmpPDFPath).delete()
          val errMsg = s"Could not download file ${url.split("/").last} from IRS"
          logger.error(errMsg)
          throw new Exception(errMsg)
      }
    }

    tmpPDFPath
  }
}
