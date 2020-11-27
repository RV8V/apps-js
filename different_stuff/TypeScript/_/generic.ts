
function geneticGetter<T>(data: T): T {
  return data
}
// function description
let newGenericFunction: <T>(d: T) => T = geneticGetter

// rewrite without description of function

const genericFunc = <T>(data: T): T => data

const data = newGenericFunction<string>('hello world').toUpperCase()
const number = newGenericFunction<number>(20).toFixed(2)

// class with generics
class Add<T extends number | string> {
  private a: T
  private b: T

  constructor(a: T, b: T) {
    this.a = a
    this.b = b
  }

  public getSum(): void {
    console.log({ a: this.a, b: this.b })
    //return this.a + this.b
  }
}

const res = new Add<number>(10, 20)
const str = new Add<string>('10', '20')

res.getSum()
