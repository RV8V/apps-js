// we use let insteas of cosnt in order to describe funtions
let func: (a: number, b: number) => number

function sum(num1: number, num2: number): number {
  return num1 + num2
}

const s = (v1: number, v2: number): number => v1 + v2

func = sum

console.log(
  func(10, 20),
  s(10, 20)
)
































//
