'use strict'
// @flow

type Foo = { name: string }
//type Foo = {? name: string ?}

type ExactFoo = $Exact<Foo>

const u: ExactFoo = { name: 'str', /*foo: 'bar'*/ }

// next
/*
type Language = 'ru' | 'en' | 'de'
type Languages = { [key: Language]: string }

const languages: Languages = {
  ru: 'ru.json',
  en: 'default.json',
  de: 'de.json'
}
*/

const languages = {
  ru: 'ru.json',
  en: 'default.json',
  de: 'de.json'
}

type Language = $Keys<typeof languages>

let language: Language = 'ru' // | 'en' | 'de'

// next
/*const acceptedColors = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue'
})*/

const acceptedColors = /*::Object.freeze(*/{
  red: 'red',
  green: 'green',
  blue: 'blue'
}/*::)*/

//const color: $Values<typeof acceptedColors> = 'redw'
const color: $Values<typeof acceptedColors> = 'red'

// next

type User = { name: string, age: number, wallet: { amount: number } }

//const logUser = (user: { +name: string, +age: number }) =>
const logUser = (user: $ReadOnly<User>) => {
  //user.name = 'John' // error
  user.wallet.amount = 100 // ok
}


// next

const updateUser = (u: User, newData: $Shape<User>) => {}

updateUser({
  name: 'John',
  age: 20,
  wallet: { amount: 100 }
}, { age: 21 } // { agee: 21 }
)

// next
/*
type Pagination = {
  url: string,
  limit: number,
  offset: number,
  total: number
}

const defaultPaginationValues = {
  limit: 0,
  offset: 0
}//const logUser = (user: { +name: string, +age: number }) =>


const createPagination = (config: $Diff<Pagination, typeof defaultPaginationValues>) => { // field that intersects -- so 2 params is required --- limit and total
  const actualConfig = { ...defaultPaginationValues, ...config }
}

const res = createPagination({ url: 'foo', total: 100, limit: 10 })
*/

// next --- $Rest

type SameUser = { name: string, age: number, amount: number }

const s: SameUser = { name: 'str', age: 20, amount: 100 }

type RestProps = $Rest<SameUser, {| age: number |}> // object without field age ------ amount and name
const { age, ...other } = s
const r: RestProps = other
