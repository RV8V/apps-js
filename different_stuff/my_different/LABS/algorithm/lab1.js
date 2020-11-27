'use strict'

const input = [30, 19, 9, 15, 55, 24, 3, 78, 46, 41] // 9
const output = [24, 30, 46, 78, 55, 41, 19, 15, 9, 3] // 9

const sort = input => {
  let a = []; let b = []
  for (let i = 1; i < input.length; i++) {
    let value = input[i]
    let j = i - 1
    while (j >= 0) {                  console.log({ j })
      if (value < input[j]) {
        input[j + 1] = input[j]
        input[j] = value;             console.log(input)
        j = j - 1
      }
      else { break }
    }
  }
  return input
}

const res = sort(input)
console.log(res)












//
