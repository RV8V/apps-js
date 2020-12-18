const str_: string = '10'
const num: number = 2

class Construct {
  constructor(public name: string, private email: string) {}
}

const construct = new Construct('hello world', 'world')
construct.name = 'hello'

const arr = [1,2,3]

for (let i = 0; i < arr.length; i++) {
  //setTimeout(() => console.log(i), 1000)
}

//arr.forEach(element => setTimeout(() => console.log(element)), 1000)

type User = { name: string }
interface IUser { age: number }

const user: User = { name: 'hello' }
const person: IUser = { age: 20 }

const mixed: User | IUser = { name: '' }

// notice

type TypedProduct = { // хотим использовать именно продукт в таком виде
  id: string
  price: number
  description: any
}

type NumberString = number | string

type Product = { // такой тип приходит с сервера
  id: NumberString
  price: number
  description: any
}

let product: Product

product = {
  id: 55,
  price: 30,
  description: 1
}

if (typeof product.id === 'number') {
  product.id = product.id + ''
}

// 1. подгоняем под себя используя <TYPE>variable
const typedProduct: TypedProduct = <TypedProduct>product
// приводим таким образом к нужному нам типу
let description1 = <string>typedProduct.description

// 2. variable as TYPE
const typedProduct2: TypedProduct = product as TypedProduct

const data: string = '10'
const data1: number = <number><any>data

const numb: number = 10
const string: string = <string>(numb as any)

// intersection

type T = number
type R = string
type S = string | number

const valir: T | R = 'hello world' // -- union |
const lora: S & R = '20' //20 -- intersection &

type SimpleProduct = {
  price: number
  total: number
}

type HardProduct = {
  hello: string
  world: string
}

// intersection it is not intersection -- it is
// combining all properties from 2 differernt types
const myProduct: SimpleProduct & HardProduct = {
  price: 39,
  total: 20,
  hello: 'world',
  world: 'hello'
}

const productV: SimpleProduct & HardProduct = {
  ...myProduct // раскрили продукт
}

type Combine = SimpleProduct & HardProduct

const responseFromServer: Partial<Combine> = {
  price: 39
  // newField: 38 -- error
}

type C = {
  name: string
  age: number
}

class Constructor {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

const smallConstructor: Partial<Constructor> = new Constructor('hello', 30)

// function typing

function sum (a: number, b: number): number {
  return a + b
}

const attempt = (a: number, b: number): number => a + b
const first = (a: T, b: R): R => a + b

first(40, '40') // return string type

const log = (input: string = 'hello world'): void => console.log(input)

const collect = (param: number, ...rest: number[]) => {
  return rest.reduce((acc, value) => acc + value) + param
}

//console.log(collect(10, 10, 20))

// function overloading

function overload(a: string, ...rest: string[]): string
function overload(a: number, ...rest: number[]): number
function overload(a: string, ...rest: number[]): any

function overload(a: unknown, ...rest: unknown[]): unknown {
  return typeof a === 'number' ? true : false
}

overload(30, 30 ,30)
overload('49', 40)

// callbavk declaration

const functionWithCallback = (
  a: number,
  callback: (acc: number, value: number) => number, // it is callback declaration -- (a: number) => number -- it is a callback
  ...rest: number[]   // because function needs like this (a: number): number
): void => console.log('hello world')


// data access key words (public, privare, protectef, readonly)

class Persone {
  public username: string // public is default
  public surname: string
  public readonly email: string
  private password: string
  private readonly address: string // only for reading inside

  constructor(name: string, surname: string, email: string, password: string, address: string) {
    this.username = name
    this.surname = surname
    this.email = email
    this.password = password
    this.address = address
  }

  changeAddress(address: string) {
    //return this.address = address // --> can not change even in this context
  }

  changeField(value: string) {
    //return this.email = value
  }

  changePassword(password: string) {
    return this.password = password
  }
}

const persone = new Persone('Bob', 'Brown', 'bob@gmail.com', 'password', 'home address')
persone.username = 'John'
persone.surname = 'Royling'
//persone.email = 'john@gmail.com' --> readonly
//persone.password  --> private
persone.changePassword('myNewPassword') // we can change it because we can get access to this context

// short code

class ShortCodeExamle {
  constructor(
    readonly testField:string,
    public name: string,
    private readonly surname: string,
    private password: string,
    protected readonly value: any,

    protected _admin = false
  ) {}

  isAdmin(): boolean {
    return this._admin
  }

/*  get fullname(): string {
    return this.name + ' ' + this.surname
  } */

/*  set username(username: string) {
    this.name = username // setter can not return a value
  } */
}

const example = new ShortCodeExamle('testField' ,'name', 'surname', 'password', 'value')
//console.log({ example })
//console.log({ data: example.fullname })

class Inherited extends ShortCodeExamle {
  constructor(
    testField: string,
    name: string,
    surname: string,
    password: string,
    value: string,
    admin: boolean,
  ) {
    super(testField, name, surname, password, value, admin)
    this._admin = true // we can override thit fiels because of "protected data access"
  }
}

// abstaract class

interface Logger {
  info(input: string): void,
  error(input: string): void
}

class ConsoleLogger implements Logger {
  info(input: string): void { console.log(input) }
  error(input: string): void { console.log(input) }
}

class DateLogger extends ConsoleLogger {
  info(input: string): void { console.log(`${input} and hello world`) }
  error(input: string): void { console.log(console.log(`${input} and hello error`)) }
}

class AnotherLogger extends ConsoleLogger {
  private getDataMessage(str: string): string {
    return (new Date()).toLocaleString() + ': ' + str
  }
  info(input: string): void {
    super.info(this.getDataMessage(input))
  }
  error(input: string): void {
    super.error(this.getDataMessage(input))
  }
}

const logger = () =>  ({
  info: (input: string) => console.log(input),
  error: (input: string) => console.error(input)
})

class Jon {
  constructor(private logger: Logger) {}
  public run() {
    try {
      this.logger.info('Instance started job')
      throw new Error('error while working')
    } catch(err) { this.logger.error('You can not call abstaract class methods only override later') }
  }
}

// It is about class extenging -- Barbara Liskov Principle
const funcLog = logger()
const classLog = new ConsoleLogger()
const extendsLog = new DateLogger()
const anotherLog = new AnotherLogger()

const instanceFunc = new Jon(funcLog)
const instanceClass = new Jon(classLog)
const instanceExt = new Jon(extendsLog)
const instanceAnt = new Jon(anotherLog)

//instanceFunc.run()
//instanceClass.run()
//instanceExt.run()

// ABSTRACT EXAMPLE HERE

abstract class BaseLogger implements Logger {
  protected abstract log(message: string, level: number): void
  protected level: number = 1 // 1 = log everything

  info(message: string): void {
    this.log(message, this.level)
  }

  error(message: string): void {
    this.log(message, this.level)
  }
}

class FirstLevelLogger extends BaseLogger {
  protected log(message: string, level: number): void {
    throw new Error("Method not implemented.")
  }
}


// GENERICS

// 1. generics in functions
const stringArr: Array<string> = ['1', '2']
const numberArr: Array<number> = [1, 2]

const genericArr: Array<T> = []
genericArr.push(<number><any>'3')

type NumberOrString = number | string

function takeId<T>(input: T) {
  return typeof input
}

takeId<string>('1')
takeId<number>(1)
takeId<Array<string>>(['1'])
takeId<NumberOrString>('2')

// 2, generics in classes

class Customer<S, V> {
  private readonly name: S
  private readonly surname: S
  private readonly age: V

  constructor(name: S, surname: S, age: V) {
    this.name = name
    this.surname = surname
    this.age = age
  }

  getId(): S {
    return this.name
  }

  getInfo(): S {
    return this.surname
  }
}

const customer: Customer<string, number> = new Customer('name', 'surname', 20)
const customerNext = new Customer<string, number>('name', 'surname', 30)

// 3. generics in interface

interface IModel {
  id: number
}

type Input = {
  id: number,
  data: string
}

class Collection<T extends IModel> {
  private items: T[]

  constructor(items: T[]) {
    this.items = items
  }
}

const collection: Collection<Input> = new Collection([{ id: 3, data: 'hello' }])

// 4. generics in factories

/*function factory<T>(type: { new (...args: any[]): T }, ...args: any[]): T {
  return new type(...args)
}

const set = factory<Collection<IModel>>(Collection, [{ id: 42 }])
*/


// DECORATORS

function ClassDecorator<T extends { new (...args: any[]): {}}>(Constructor: T) {
  console.log(Constructor)
  return Constructor
}

@ClassDecorator
class Foo {
  static value: string = 'hello world'
  instanceValue: string = 'instanceof'
}

console.log(new Foo())



























//
