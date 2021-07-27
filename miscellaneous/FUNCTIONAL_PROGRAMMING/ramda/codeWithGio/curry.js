const R = require('ramda')

/**
 * @Curry
 */

const greaterThan = R.curry((a, b) => a > b)
const greaterThanThree = greaterThan(R.__, 3)
const greaterThanThreeToo = R.partial(R.flip(greaterThan), [3])

R.bind(console.log, console)({
  1: greaterThanThree(10),
  2: greaterThanThreeToo(10)
})
