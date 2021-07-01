'use strict'

'C5 = 9303 % 5 = 3'
'C7 = 9303 % 7 = 0'
'C11 = 9303 % 11 = 8'

'C = A xor B'
'matrix element = double'
'average value of each record'

const xorMatrix = (m1, m2) => {
  const xorResult = []
  const averageValueInRecord = []

  for (let i = 0; i < m1.length; i++) {

    let sum = 0

    for (let j = 0; j < m1[i].length; j++) {

      if (m1.length !== m2.length && (m1[i] && m1[i].length !== m2[i] && m2[i].length)) {
        throw new Error('A and B must have the same dimensions (or one can be a scalar).')
      }

      if (m1[i][j] === 1 && m2[i][j] === 1) {
        if (!xorResult[i]) {
          xorResult[i] = [0]
        } else {
          xorResult[i] = [...xorResult[i], 0]
        }

      } else if(m1[i][j] === 0 && m2[i][j] === 0) {
        if (!xorResult[i]) {
          xorResult[i] = [0]
        } else {
          xorResult[i] = [...xorResult[i], 0]
        }

      } else if (m1[i][j] === 0 && m2[i][j] === 1 || m1[i][j] === 1 && m2[i][j] === 0) {
        if (!xorResult[i]) {
          xorResult[i] = [0]
        } else {
          xorResult[i] = [...xorResult[i], 1]
        }
      }

      sum += m1[i][j] + m2[i][j]
    }

    averageValueInRecord.push(sum / m1[i].length)
  }

  return {
    xorResult,
    averageValueInRecord
  }
}

const m1 = [
  [3, 0, -1, 1],
  [3, 1, 1, 0],
  [4, 5, 0, 1],
  [1, 2, 1, 1]
]

const m2 = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 1, 0, 1],
  [1, 0, 1, 0]
]

const sumMatrix = (m1, m2) => {
  const sumResult = []
  const maxValueInRecord = []
  const minValueInRecord = []

  for (let i = 0; i < m1.length; i++) {

    let sum;

    for (let j = 0; j < m1[i].length; j++) {

      if (m1.length !== m2.length && (m1[i] && m1[i].length !== m2[i] && m2[i].length)) {
        throw new Error('A and B must have the same dimensions (or one can be a scalar).')
      }

      sum = m1[i][j] + m2[i][j]

      if (!sumResult[i]) {
        sumResult[i] = [sum]
      } else {
        sumResult[i] = [...sumResult[i], sum]
      }

    }
  }

  for (let i = 0; i < sumResult.length; i++) {

    let max = sumResult[i][0]
    let min = sumResult[i][0]

    for (let j = 0; j < sumResult[i].length; j++) {

      if (sumResult[i][j] > max) {
        max = sumResult[i][j]
      }

      if (sumResult[i][j] < min) {
        min = sumResult[i][j]
      }

    }

    if (i & 1) {
      maxValueInRecord.push(max)
      minValueInRecord.push(min)
    }

  }

  return {
    sumResult,
    maxValueInRecord: maxValueInRecord.reduce((acc, value) => acc + value, 0),
    minValueInRecord: minValueInRecord.reduce((acc, value) => acc + value, 0),
  }
}

'console.dir({ result: xorMatrix(m1, m2) }, { depth: 3 })'
'console.dir({ result: sumMatrix(m1, m2) }, { depth: 3 })'
