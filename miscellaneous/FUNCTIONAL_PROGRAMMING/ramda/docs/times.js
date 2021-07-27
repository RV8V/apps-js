const R = require('ramda')

/**
 * @Times call function n times, returns a list
 * Parameters: (f, n, count), call f from 0 to n - 1 times
 */

R.bind(console.log, console)({
  1: R.times(R.identity, 5),
  2: R.times(R.add(1), 5)
})
