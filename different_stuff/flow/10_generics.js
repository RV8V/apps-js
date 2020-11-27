'use strict'
// @flow

type Response<T> = {
  success: boolean,
  entries: Array<T>,
  total: number,
  data: string
}

type User = {| name: string |}

const data: Response<User> = {
  success: true,
  entries: [{ name: 'John' }, { name: 'Bob' }],
  total: 10,
  data: '20'
}

// next
function withStatus<T>(a: T): {| data: T, status: boolean |} {
  return { data: a, status: true }
}

const r = withStatus(data)
// r: { data: Response<{| name: string |}>, status: boolean }


// next
function extract<I, O>(fn: (val: I) => O, v: I): O {
  return fn(v)
}

function cb(x: number) { return 'val' }

const s = extract(cb, 5)


//next
class Wrapper<O> {
  data: O
}

const r_: Wrapper<{| name: string |}> = new Wrapper()
console.log(r_.data.name.includes('1'))


// next
type ObjectMap<T> = { [key: string]: T }
const f: ObjectMap<number> = { a: 1, b: 2 }
