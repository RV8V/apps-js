const str: string = 'hello'

// tuple
const o = { name: 'hello', age: 30 }
const { name: string, age: number } = o

// any
let variable: string = '43'
const data: number = <number><any>variable

// never
const func = (): never => {
  throw new Error()
}

type Type = string | null | undefined

























//
