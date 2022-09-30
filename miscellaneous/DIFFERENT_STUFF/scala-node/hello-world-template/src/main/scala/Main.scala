// object Main extends App {
  //*************************************** functions /***************************************/

  // val addOne = (value: Int) => value + 1
  // val withoutParams = () => 10

  // println("addOne: " + addOne(10)) // concatination of strings
  // println(s"withoutParams ${withoutParams()}") // use interpolation via s

  // val x: Int = 10
  // println(s"value for x is $x") // $ is for values

  //*************************************** methods ***************************************/

  // def addValues(x: Int, y: Int): Int = x + y

  // def addValuesAndApOneMore(x: Int, y: Int)(last: Int): Int = x + y + last 

  // def name: String = System.getProperty("user.name")

  // println(addValues(1, 3))
  // println(addValuesAndApOneMore(1, 2)(3))
  // println("Hello, " + name + "!")

  // def getSquareString(input: Double): String = {
  //   val square: Double = input * input
  //   // return square.toString() // is same
  //   square.toString
  // }

  // println(getSquareString(3.1))

  //*************************************** Classes ***************************************/

  // class Greeter(first: String, last: String) {
  //   def greet(value: String): Unit = println(s"$value - $first $last")
  // }

  // val greeter: Greeter = new Greeter("John", "Brown")
  
  // greeter.greet("Scala")

  //*************************************** Case Classes ***************************************/

  // case class Point(x: Int, y: Int)

  // val point = Point(1, 2)
  // val anotherPoint = Point(1, 2)
  // val yetAnotherPoint = Point(2, 2)

  // if (point == anotherPoint) {
  //   println(s"$point and $anotherPoint are the same")
  //   // println(s"${point.toString()} are ${anotherPoint.toString} are the same.")
  // } else {
  //   println(s"$point and $anotherPoint are not the same.")
  // }

  // if (point == yetAnotherPoint) {
  //   println(s"$point and $yetAnotherPoint are the same")
  // } else {
  //   println(s"$point and $yetAnotherPoint not are the same")
  // }

  //*************************************** Objects ***************************************/

  // object idFactory {
  //   private val counter = 0

  //   def create(): Int = {
  //     counter + 1
  //   }
  // }

  // val idOne: Int = idFactory.create()
  // val idNext: Int = idFactory.create()

  // println(s"$idOne, $idNext")

  //*************************************** Traits ~ abstract data types ***************************************/

  // trait Greeter {
  //   def greet(name: String): Unit
  // }

  // trait Greeter {
  //   def greet(name: String): Unit = println(s"hello, $name")
  // }

  // class DefaultGreeter extends Greeter

  // class CustomGreeter(first: String, last: String) extends Greeter {
  //   override def greet(name: String): Unit = println(s"$first - $last - $name")
  // }

  // val greeter = new DefaultGreeter // can be without paranticise new DefaultGreeter()
  // greeter.greet("name")

  // val custom = new CustomGreeter("first", "last")
  // custom.greet("name")

// }

//*************************************** Main Method ***************************************/

import intro.{Block}
import users.{User, UserPreferences, UserProfile}

import org.joda.time.{Days, LocalDate}
import java.util.Date;
import java.util.Calendar
import java.util.TimeZone

object Main {
  def main(args: Array[String]): Unit = {
    // println("hello from scala main")

    //*************************************** blocks ***************************************/

    // (new Block).block

    //*************************************** import export ***************************************/

    // val user = new User()
    // val preferences = new UserPreferences()
    // val profile = new UserProfile()
    // user.user()
    // preferences.preferences()
    // profile.profile()

    //*************************************** Scala Type Hierarchy ***************************************/

    // val list: List[Any] = List(
    //   "this is a string",
    //   19,
    //   'x',
    //   true,
    //   () => "an anonymous function returning a string"
    // )

    // list.foreach(element => println(element))

    // val arr: Array[Any] = Array(
    //   "string",
    //   18,
    //   () => "function"
    // )

    // arr.foreach(element => println(element)) // correct

    // println(arr) not correct

    //*************************************** Debug ***************************************/

    trait Debug {
      def debugVars(): Any = {
          val vars = this.getClass.getDeclaredFields
          for (v <- vars) {
          v.setAccessible(true)
          println("Field: " + v.getName() + " => " + v.get(this))
        }
      }
    }

    // class TestUser(name: String) extends Debug {
    //   def getName: String = name

    //   val x = 10
    //   val y = 20
    // }

    // val testUsers: Array[TestUser] = Array(
    //   new TestUser("first"),
    //   new TestUser("second")
    // )

    // testUsers.foreach(user => println(user.toString))

    // testUsers.foreach(user => user.debugVars())

    // object LocalDateExtension {
    //   class LocalDateExtension(a: LocalDate) {
    //     def dayDiff(b: LocalDate): Int = {
    //       Days.daysBetween(a, b).getDays.abs
    //     }

    //     def >(b: LocalDate): Boolean = {
    //       a.isAfter(b)
    //     }

    //     def >=(b: LocalDate): Boolean = {
    //       a.isAfter(b) || a.isEqual(b)
    //     }

    //     def <(b: LocalDate): Boolean = {
    //       a.isBefore(b)
    //     }

    //     def <=(b: LocalDate): Boolean = {
    //       a.isBefore(b) || a.isEqual(b)
    //     }
    //   }

    //   implicit def extendLocalDate(a: LocalDate) = new LocalDateExtension(a)
    // }

    // class LocalDateExtension(a: LocalDate) {
    //   def dayDiff(b: LocalDate): Int = {
    //     Days.daysBetween(a, b).getDays.abs
    //   }

    //   def greater(b: LocalDate): Boolean = {
    //     a.isAfter(b)
    //   }

    //   def greaterOrEqual(b: LocalDate): Boolean = {
    //     a.isAfter(b) || a.isEqual(b)
    //   }

    //   def less(b: LocalDate): Boolean = {
    //     a.isBefore(b)
    //   }

    //   def lessOrEqueal(b: LocalDate): Boolean = {
    //     a.isBefore(b) || a.isEqual(b)
    //   }
    // }

    // val date1 = new LocalDateExtension(LocalDate.parse("2017-02-07"))
    // val date2 = LocalDate.parse("2017-03-07")

    // println(date1.greater(date2))
    // println(date1.greaterOrEqual(date2))
    // println(date1.less(date2))
    // println(date1.lessOrEqueal(date2))
    // println(date1.dayDiff(date2))

    // println(LocalDate.parse("2017-02-07"))

    // val date1 = LocalDateExtension.extendLocalDate(LocalDate.parse("2010-04-29"))
    // val date2 = LocalDateExtension.extendLocalDate(LocalDate.parse("2011-04-29"))

    // val a = LocalDate.parse("2010-04-29")
    // val b = LocalDate.parse("2010-04-29")

    // print(date1.>(date2)) // false
    // print(date1 >= date2) // true
    // print(date1 < date2) // false
    // print(date1 <= date2) // true

    ////////////////////////////////////////////////////////////////////////////

    // val compareDates(date: Date, anotherDate: Date): Unit = {
    //   val result: Int = date.compareTo(anotherDate)

    //   object comparator {
    //     def greater: Boolean = result > 0
    //     def greaterOrEqual: Boolean = result >= 0
    //     def less: Boolean = result < 0
    //     def lessOrEqueal: Boolean = result <= 0
    //     def equal: Boolean = result == 0
    //   }
    // }

    class Comparator(date: Date, anotherDate: Date) {
      private val result: Int = date.compareTo(anotherDate)
      def greater: Boolean = result > 0
      def greaterOrEqual: Boolean = result >= 0
      def less: Boolean = result < 0
      def lessOrEqueal: Boolean = result <= 0
      def equal: Boolean = result == 0
    }

    class Transaction(name: String, created: Date) extends Debug {
      val name1 = name
      val created1 = created
    }

    val trx = new Transaction("first transaction", new Date(2020, 1, 1))

    val transactions: Array[Transaction] = Array(
      new Transaction("first transaction", new Date(2011, 2, 1)),
      new Transaction("first transaction", new Date(2020, 3, 1)),
      new Transaction("first transaction", new Date(2022, 4, 1)),
      new Transaction("first transaction", new Date(2024, 5, 1))
    )

    var start = new Date(2020, 1, 1);
    var end = new Date(2021, 1, 1);
    val year: Option[Int] = Option(0)

    // val findByFieldYear = (year: Option[Int], start: Date, end: Date) => {
    //   val checkStart = new Comparator(start, new Date(0))
    //   if (year.getOrElse(0) == 0) {
    //     println("enter")
    //     println(checkStart.equal)
    //     if (checkStart.equal) return true
    //     else return false
    //     // if (checkStart.equal) false
    //     // else true
    //   }
    //   true
    // }

    val findByFieldYear = (year: Option[Int], start: Date, end: Date) => {
      val checkStart = new Comparator(start, new Date(0))
      if (year.getOrElse(0) == 0) checkStart.equal
      else true
    }

    val getYear = (date: Date) => {
      val cal = Calendar.getInstance
      cal.setTime(start)
      cal.setTimeZone(TimeZone.getTimeZone("UTC"))

      cal.get(Calendar.YEAR)
    }

    // val getFilteredTransactions = (
    //   transactions: Array[Transaction],
    //   start: Date,
    //   end: Date,
    //   yearTime: Option[Int]
    // ) => {
    //   val year = yearTime.getOrElse(0)
    //   val byYear = findByFieldYear(yearTime, start, end)

    //   if (byYear) {
    //     // transactions.filter(trx => getYear(trx.created1) == year)
    //     transactions.filter(trx => {
    //       println(getYear(trx.created1))
    //       println(year)

    //       getYear(trx.created1) == year
    //     })
    //   }
    //   else transactions.filter(trx => {
    //     val from = new Comparator(trx.created1, start)
    //     val to = new Comparator(trx.created1, end)
    //     to.lessOrEqueal && from.greaterOrEqual
    //   })
    // }

    val getFilteredTransactions = (
      transactions: Array[Transaction],
      start: Date,
      end: Date,
      yearTime: Option[Int]
    ) => {
      val year = yearTime.getOrElse(0)

      if (findByFieldYear(yearTime, start, end)) {
        transactions.filter(trx => getYear(trx.created1) == yearTime.getOrElse(0))
      }
      else transactions.filter(trx => {
        val from = new Comparator(trx.created1, start)
        val to = new Comparator(trx.created1, end)
        to.lessOrEqueal && from.greaterOrEqual
      })
    }

    

    // println(s"check: ${findByFieldYear(year, start, end)}")

    // var start = new Date(2020, 1, 1);
    // var end = new Date(2022, 1, 1);
    // val year: Option[Int] = Option(10)

    val filtered = getFilteredTransactions(transactions, start, end, year)

    println(s"check: ${findByFieldYear(year, start, end)}")

    println(start)
    println(end)
    println(year.getOrElse(0))

    println(transactions.length)
    println(filtered.length)

    // val checkStart = new Comparator(new Date(0), new Date(0))

    // println(checkStart.equal)

    // println(new Date(0))

    // if (year.getOrElse(0) != 0) {
    //   println("year is specified")
    // }

    // println(year.getOrElse(0))

    val minValue = (a: Int, b: Int) => if (a < b) a else b

    // if (yearTime == null) {
    //   println("yearTime is null")
    // } else {
    //   println("not null")
    // }


    // println(minValue(1, 2))

    // val filtered = transactions.filter(trx => {
    //   val from = new Comparator(start, trx.created1)
    //   val to = new Comparator(end, trx.created1)
    //   to.greaterOrEqual
    //   // date.lessOrEqueal 
    // })

    // Thu Jun 02 12:40:47 EEST 2022

    // println(start)
    // println(end)

    // val filtered = transactions.filter(trx => {
    //   val from = new Comparator(trx.created1, start)
    //   val to = new Comparator(trx.created1, end)
    //   to.lessOrEqueal && from.greaterOrEqual
    // })

    // val getYear(datetime: Date): Int = {
    //   val cal = Calendar.getInstance
    //   cal.setTime(datetime)
    //   cal.setTimeZone(TimeZone.getTimeZone("UTC"))

    //   cal.get(Calendar.YEAR)
    // }


    // println(getYear(start))

    
    // println(transactions.length)
    // println(filtered.length)

    

    // var date1 = new Date(2020, 1, 1);
    // var date2 = new Date(2021, 6, 1);

    // val compare = new Comparator(date1, date2)

    // println(date1)
    // println(date2)

    // println(s"greater ${compare.greater}")
    // println(s"greaterOrEqual ${compare.greaterOrEqual}")
    // println(s"less ${compare.less}")
    // println(s"lessOrEqueal ${compare.lessOrEqueal}")
    // println(s"equal ${compare.equal}")


    // val compareDates(date: Date, anotherDate: Date): Unit = {
    //   val result: Int = date.compareTo(anotherDate)
    // }

    // var date1 = new Date(2020, 1, 1);
    // var date2 = new Date(2021, 6, 1);
    // var date3 = new Date(2020, 1, 1);

    // var result: Int = 0;

    // result = date1.compareTo(date2);

    // if (result == 0)
    //   println("date1 and date2 are equal");
    // else if (result > 0)
    //   println("date1 is comes after date2");
    // else
    //   println("date1 is comes before date2");

    // result = date1.compareTo(date3);

    // if (result == 0)
    //   println("date1 and date3 are equal");
    // else
    //   println("date1 and date3 are not equal")
  }

  //*************************************** Defining a class ***************************************/

  // class Point(x: Int, y: Int) {
  //   override def toString: String = s"Point($x, $y)"
  // }

  // val point = new Point(1, 2)
  // println(point.toString)
}