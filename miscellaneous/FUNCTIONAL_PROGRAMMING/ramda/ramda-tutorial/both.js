const R = require('ramda')

/**
 * @R.both similar to R.and, returns && of the results -> it is R.and but with functions as parameters
 * @R.flip change first and second parameters
 */

const l = R.bind(console.log, console)

const both = (f, g) => x => f(x) && g(x)
const merge = (a, b, c) => [].concat(a, b, c)

l({
  both: R.both(
    R.gt(R.__, 10),
    R.lt(R.__, 20)
  )(15),
  own: both(
    R.gt(R.__, 10),
    R.lt(R.__, 20)
  )(15),
  n: both(
    R.flip(R.gt)(10),
    R.flip(R.lt)(20)
  )(15),
  merge: merge(1, 2, 3),
  flip: R.flip(merge)(1, 2, 3),
  sub: R.subtract(R.__, 10)(20),
  subt: R.subtract(10)(20),
  subtract: R.flip(R.subtract)(10, 20)
})
