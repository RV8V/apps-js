const R = require('ramda')

/**
 * @Module === x % y
 */

R.bind(console.log, console)({
  1: R.modulo(17, 5),
  2: 17 % 5
})
