const R = require('ramda')

/**
 * @R.binary holds only two parameters - returns a wrapper
 * @R.unary holds only one parameter
 * @R.nAry holds n parameters
 */

const l = console.log

const three = (a, b, c) => [a, b, c]
const two = R.binary(three)
const one = R.unary(two)
const nAry = R.nAry(2, three)

l({
  threeLength: three.length,
  twoLenght: two.length,
  oneLenght: one.length,
  nAryLength: nAry.length,
  three: three(1, 2, 3),
  two: two(1, 2, 3),
  one: one(1, 2, 3),
  nAry: nAry(1, 2, 3)
})
