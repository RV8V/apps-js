'use strict'
// @flow

// boolean
// number
// string
// null
// undefined / void
// symbols

function divide(a: number, b: number): string {
  return (a / b).toString()
}

const s = divide(8, 5)
//const s_ = divide('20', '50')

//let a: 2 = 2
let status: 'success' | 'error' | 'warning' = 'success'
//status = 'bred'

let data: string | number = 5
data = '30'

declare var ss: any
const foo: number = ss

let str: ?string = '20'
str = undefined

if (str) str.includes('foo')


function sum_(a: number, b: number): number { return a + b }
const sum__ = (a: number, b?: number): number => a + 20

const test = (...args: Array<number>) => args
const res = test(1,2,3,4)

function process(cb: (err: Object) => void) {
  cb({ err: 'error' })
}

process((o: { a: 20 }) => console.log(a))

// array

const array: Array<number> = [1,2,3,4,5]
const a: number[] = [1,2,3,4]

const a_: (number | null)[] = [1,2,3,4, null]
const _a: ?number[] = [1,2,3,4] || null // array of numbers or null
const a__: (?number)[] = [1,2,3,4, null] // array of numbers and nulls



const coords: [number, number] = [1,2]


declare var at: string[]
const five = at[4]


type ArrStrs = (?string[])
declare var t: ArrStrs
//const d = t[30]

const as: string[] = ['1', '2']
