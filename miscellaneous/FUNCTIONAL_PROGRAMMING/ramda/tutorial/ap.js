const R = require('ramda')

/**
 * @R.ap apply a list of functions to a list of data
 */

console.log({
  a: R.ap([R.multiply(2), R.add(3)], [1, 2, 3]),
  b: R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salat']),
  c: R.ap(R.concat, R.toUpper)('Ramda')
})
