'use strict'
// @flow

type PromiseObject = { +[key: string]: Promise<mixed> }

type ExtractPromiseType = <T>(x: Promise<T>) => T // extract value from promise
type StringTypeFn = () => string // map in js

async function props<P: PromiseObject/*{}*/>(promiseObject: P): Promise<$ObjMap<P, StringTypeFn>> {
  const promises = Object.values(promiseObject)
  const responses = await Promise.all(promises)
  const res = {}
  Object.keys(promiseObject).forEach((key, i) => res[key] = responses[i])
  return res
}

const res = props({
  a: Promise.resolve(1),
  b: Promise.resolve('str'),
  c: Promise.resolve(true)
}).then(x => {
  console.log(x.a) // x is type of string
  //(x.a: number) // пробуем привести к типу чтоби проверить что єто ето строка
  console.log(x.b)
  console.log(x.c)
})

// next
/
type PromiseObjectType = { [key: string]: Promise<mixed> }
type ApplyFnType = <T>(input: Promise<T>) => T

const props_ = async <P: PromiseObjectType>(promiseObject: P): Promise<$ObjMap<P,ApplyFnType>> => {
  const promises = Object.values(promiseObject)
  const responses = await Promise.all(promises)
  const res = {}
  Object.keys(promiseObject).forEach((key, i) => res[key] = responses[i])
  return res
}

props_({
  a: Promise.resolve('1'),
  b: Promise.resolve(2)
}).then(res => {
  console.log(res.a)
  console.log(res.b)
})
*/
