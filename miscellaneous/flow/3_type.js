'use strict'
// @flow

type PossibleStatusType = 'success' | 'warning' | 'error' // union type |
const status: PossibleStatusType = 'success'

type NameType = { name: string }
type HistoryType = { history: string[] }

declare var user: NameType & HistoryType
user.name
//user.history
//u: { history: Array<string> } & { name: string }

type ImpossibleType = number & string



type NameT = {
  metadata: { originalName: string },
  name: string
}
type HistoryT = {
  metadata: { historyLimit: number },
  history: string[]
}

/*type User = {
  name: string,
  history: string[],
  metadata: { originalName: string } & { historyLimit: number }
}*/

declare var u_: NameT & HistoryT
u_.name = '20'
u_.history = ['1', '2']
u_.metadata.originalName = '200'
//u_.metadata.historyLimit = 200 // do not work


/*
type T = {| name: string, version: string |}
type S = {| history: string[], version: number |}

//type Y = T & S
type Y = { ...T, ...S }

const x: Y = { name: 'John', histoty: ['1', '2'], version: 200 }
*/



type T = { name: string, version: string }
type S = { history: string[], version: number }

//type Y = T & S
type Y = { ...$Exact<T>, ...$Exact<S> }

//const x: Y = { name: 'John', histoty: ['1', '2'], version: 200 }
