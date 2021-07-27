'use strict'

const map = (list, mapFn, res = [], index = 0) => {
  if (index === list.length) {
    return res
  }
  res.push(mapFn(list[index]))
  return map(list, mapFn, res, index + 1)
}

// const mapS = (list, mapFn, res = [], index) => (
//   index === list.length && res || res.push(mapFn(list[index])), map(list, mapFn, res, index + 1)
// )

const arr = ['hello', 'world']
const f = x => (console.log(x), x)

console.log({
  result: map(arr, f),
  // mapS: mapS(arr, f)
})
