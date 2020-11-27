const str: string = ''

const promiseStr = new Promise<string>(resolve => {
  setTimeout(() => {
    resolve('hello world')
  }, 1000)
})

const promiseNum: Promise<number> = new Promise(resolve => {
  setTimeout(() => {
    resolve(200)
  }, 1000)
})


//promiseStr.then(str => console.log(str.toUpperCase()))
//promiseNum.then(num => console.log(num.toFixed(2)))

// next object

const mergeObjects = <T extends object, B extends object>(a: T, b: B): {} & T & B => {
  return Object.assign({}, a, b)
}

const merged1 = mergeObjects({ name: 'name' }, { age: 39 })
const merged2 = mergeObjects({ hello: 'world' }, { from: 'server' })
//const merged3 = mergeObjects('hello', 'world')

console.log({
  merged1,
  merged2,
  //merged3
})

const username = merged1.name
const { from, hello } = merged2

type One = { name: string }
type Two = { username: string }

const user: One & Two = {
  name: '',
  username: ''
}

// next example -- generics needs to use in order to say or declare what we really want
// probably analogy REST API and Graphql -- where (generics are like Graphql)
interface ILength {
  length: number
}

type Output<T> = {
  value: T,
  count: string
}

const countLength = <T extends ILength>(value: T): Output<T> => {
  return {
    value,
    count: `length of this value is ${value.length}`
  }
}

console.log({
  lenght: countLength('30'),
  //lenght: countLength(30),
})

// next example

const person = {
  name: 'name',
  surname: 'surname',
  password: 'password'
}

const getValueFromObject = <T extends object, K extends keyof T>(data: T, key: K) => {
  return data[key]
}

const value1 = getValueFromObject(person, 'name')
//const value2 = getValueFromObject(person, 'job')

// next example -- classes

interface IId {
  id: string
}

class Collection<T extends IId> {
  private _items: T[] = []

  constructor(_items: T[]) {
    this._items = _items
  }

  add(item: T) {
    this._items.push(item)
  }
  remove(item: T) {
    this._items = this._items.filter(elem => elem.id !== item.id)
  }
  get items(): T[] {
    return this._items
  }
}

type Ob = { id: string, [key: string]: string | number }

const objects = new Collection<Ob>([
  { id: '3', name: 'string', age: 20 }
])

objects.add({ id: '2', name: 'good morning' })

objects.add({ id: '3', name: 'good morning' })
objects.remove({ id: '3' })

console.log({ objects })

//const strings = new Collection<string>(['hello', 'world', 'from', 'server'])
//const numbers = new Collection<number>([10, 20, 30])

interface Car {
  model: string
  year: number
}

const createAndValidate = (model: string, year: number): Car => {
  const car: Partial<Car> = {}
  if (model.length > 3) car.model = model
  if (year > 2000) car.year = year
  return car as Car // return <Car>car
}

// next example -- Readonly

const ford: Readonly<Car> = {
  model: 'ford',
  year: 2000
}

const bmw: Readonly<Car> = {
  model: 'bmw',
  year: 2019
}

//ford.model = 'ferari'

const cars: Readonly<Array<Car>> = [ford, bmw]

























//
