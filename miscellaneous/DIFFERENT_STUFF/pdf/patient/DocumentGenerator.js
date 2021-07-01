const PDFGenerator = require('pdfkit')
const fs = require('fs')

class DocumentGenerator {
    constructor(document) {
        this.document = document
    }

    generateHeaders(doc) {
        const patientSection = this.document.patientSection
        const prescriptionSection = this.document.prescriptionSection
        const orderingProvider = this.document.orderingProvider

        doc
            .image('./images.png', 170, 40, { width: 250})
            .fillColor('#000')
            .fontSize(20)
            .text('FLORIDA ORTHOPAEDIC', 190, 130, {align: 'centre'})

            .fontSize(10)
            .text(`ASSOCIATES`, 275, 150, {align: 'centre'})

            .text(`MRI IMAGINE REQUEST FORM`, 235, 180, {bold: true, align: 'centre'})

            .text(`
              Name: ${patientSection.first}                                           Home Phone: ${''}                                                   Weigth: ${''}
              Date of Birth: ${patientSection.dateOfBirth}                      Mobile Phone: ${patientSection.phoneNumber}                          Sex: ${''}
              Address: ${''}                                                                                                                         Date: ${''}`,
              30, 200, {align: 'left'}
            )

            .text(`
              Reason for test: ${prescriptionSection.reasonForScan}
              Referring Provider: ${''}
              Referring Provider NPID: ${''}
              Schedule Imaging: ${''}
              Suggested Diagnosis: ${''}
              Test Requested: ${''}`,
              30, 280, {align: 'left'}
            )

            .text(`Comments: ${prescriptionSection.comments}`, 70, 380, {bold: true, align: 'left'})
    }

    generateFooter(doc) {
        doc
            .fontSize(10)
            .text(`Payment due upon receipt. `, 50, 700, {
                align: 'left'
            })
    }

    generate() {
        const theOutput = new PDFGenerator
        const fileName = `Invoice ${this.document.invoiceNumber}.pdf`

        theOutput.pipe(fs.createWriteStream(fileName))
        this.generateHeaders(theOutput)
        theOutput.moveDown()
        this.generateFooter(theOutput)
        theOutput.end()
    }
}

module.exports = DocumentGenerator
