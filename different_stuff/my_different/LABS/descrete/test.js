'use strict'

const matrix = [
  0, 0, 0, 0 ,0 ,0 ,0, 0, 1, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
  1, 1, 0, 0 ,0 ,0 ,0, 0, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
  0, 1, 1, 0, 1, 0, 0, 1, 0, 1,
  1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
  0, 0, 1, 1, 1, 0, 0, 0, 1, 1
]

const graphs = [
  [1,9],
  [2,1], [2,10],
  [3,1], [3,2], [3,7], [3,8], [3,9], [3,10],
  [4,6], [4,10],
  [5,1], [5,2], [5,9], [5,10],
  [6,10],
  [7,1],
  [8,2], [8,3], [8,5], [8,7], [8,10],
  [9,1], [9,5], [9,6],
  [10,3], [10,4], [10,5], [10,8]
]


const data = '1'
const num = Number(data)
const d = Number('1', '3')
console.log({ d })
const n = +data
console.log({ num, n })
console.log(typeof num, typeof n)
