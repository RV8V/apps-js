'use strict'

'C2 = 9303 % 2 = 1'
'C3 = 9303 % 3 = 0'
'C5 = 9303 % 5 = 3'
'C7 = 9303 % 7 = 0'

'O1 = -'
'C = C3 = 0'
'O2 = +'
'i, j = byte'

const doubleSum = (a, n, b, m) => {
  let result = 0; 

  if (n < a) {
    throw new Error('n should me more than a')
  }

  if (m < b) {
    throw new Error('m should me more than b')
  }

  for (let i = a; i < n; i++) {
    for (let j = b; j < m; j++) {
      result += (i + j) / (i - 0)
    }
  }

  return result;
}

const doubleSumNext = (a, n, b, m) => {
  let result = 0;

  if (n < a) {
    throw new Error('n should me more than a')
  }

  if (m < b) {
    throw new Error('m should me more than b')
  }

  for (let i = a; i < n; i++) {
    for (let j = b; j < m; j++) {
      result += (i % j) / (i + 2)
    }
  }

  return result;
}

'console.log({ result: doubleSum(2, 1, 2, 1) })'
'console.log({ result: doubleSumNext(2, 31, 2, 32) })'
