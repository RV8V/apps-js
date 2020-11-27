'use strict'
// @flow

function addId<T: { id: string }>(o: T): { ...$Exact<T>, uuid: string } {
  return { ...o, uuid: `${Math.random().toString()}-${o.id}` }
}

type User = { id: string, name: string }

const u: User = { id: '1', name: 'John' }

const r = addId(u)
//const r_ = addId({ name: 'John' })
console.log(`${r.uuid} - ${r.id} - ${r.name}`)
