const R = require('ramda')

/**
 * @R.all return Boolean if all values check some condition
 * @R.allPass collect an array of fns to check on other structure (match multiple predicates with single value)
 */

const INITIAL_ARR = [1, 2, 3]
const ARR_OF_TENS = [10, 10]
const VALUE = 10

console.log({
  flag: R.all(x => x == VALUE)(INITIAL_ARR),
  ten: R.all(R.equals(VALUE), ARR_OF_TENS),
  gte: R.all(R.gte(VALUE), R.map(R.multiply(VALUE))(INITIAL_ARR)),
  rest: R.all(R.gte(10), [1, 2, 4]),
  theSame: R.all(R.gte(10, R.__), [2, 4, 5]),
  test: R.all(R.gte(R.__, 10), [2, 3, 6]),
  allPassForValue: R.allPass([
    R.gte(R.__, 10),
    R.lte(R.__, 20)
  ])(1),
  allPassForArray: R.all(R.allPass([
    R.lte(R.__, 20),
    R.gte(R.__, 10)
  ]), [11, 12, 13])
})
