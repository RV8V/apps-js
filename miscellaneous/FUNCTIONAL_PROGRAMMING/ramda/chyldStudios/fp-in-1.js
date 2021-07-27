/*****************************************/

let total = 0;
let count = 0;

for (var i = 10; i < 21; ++i) {
  if (i % 2 === 0) {
    total = total + i ** 2
    count = count + 1
  }
}

let average = total / count

console.log(average, total, count)

/*****************************************/

const R = require('ramda')

const fromTo = a => b => {
  const arr = []
  for (let i = a; i <= b; i++) {
    arr.push(i)
  }
  return arr
}

const fromToR = a => (b, c) => (c = 0, [...Array(b - a + 1).keys()].reduce((acc, value) => (
  acc.push(a + c++), acc
), []))

const isEven = n => n % 2 === 0
const square = n => n ** 2
const increment = n => n++
const length = nums => nums.length
const sum = nums => nums.reduce((total, number) => total + number, 0)
const avg = nums => sum(nums) / length(nums)

const avgEvenSquaresNumbersFrom10 = R.pipe(
  fromToR(10),
  R.filter(isEven),
  R.map(square),
  avg
)

const avgEvenSquaresNumbersFrom = a => (b, c = 0) => {
  const result = [...Array(b - a + 1).keys()].reduce((acc, value) => (
      acc.push(a + c++), acc
    ), [])
    .filter(x => x % 2 === 0)
    .map(x => x ** 2)
  return result.reduce((acc, value) => acc + value, 0) / result.length
}

R.bind(console.dir, console)({
  avgEvenSquaresNumbersFrom10: avgEvenSquaresNumbersFrom10(21),
  avgEvenSquaresNumbersFrom: avgEvenSquaresNumbersFrom(10)(21),
  from10To21: fromTo(10)(21),
  from10To21R: fromToR(10)(21),
  x: R.range(1),
  numbers: R.range(10, 21).reduce((total, number) => total + number, 0)
}, {
  depth: 4
})
