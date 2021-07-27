const R = require('ramda')

/**
 * @R.empty - Returns the empty value of its argument's type.
 */

R.bind(console.log, console)({
  arr: R.empty([1, 2]),
  obj: R.empty({ 1: 2 }),
  str: R.empty('string'),
  num: R.empty(0123)
})
