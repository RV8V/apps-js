'use strict'
// @flow

type User = {| name: string, age?: ?number |} // exact type - точний тип

const x: User = { name: 'John', age: 20 }
//const y: User = { name: 'Bob' }
//x.power = true

type LogEntry = { name: string }

const log = (entry: LogEntry) => entry.name
const save = (input: User) => input.age

const res = save({ name: 'X', age: null })
const res_ = save({ name: 'Y', age: undefined })

const res__ = save({ name: 'F' })


type MapObject = { name?: string, [key: string]: number }

const map: MapObject = {}
map['1'] = 1
map.first = 1
//map['2'] = 2






function fn() {}
fn.dropCache = () => {}

type FooType = {
  dropCache?: (err: ?Object, data: number) => number,
  //$call: (a: number, b: number) => number
  //[[call]]: (a: number, b: number) => number
}

declare var process: FooType
//process.dropCache({ err: 'error' }, 20)
