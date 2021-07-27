const R = require('ramda')

/**
 * @Keys   === Object.keys
 * @Values === Object.values
 */

const o = { n: 'm' }

R.bind(console.log, console)({
  1: R.keys(o),
  2: Object.keys(o),
  3: R.values(o),
  4: Object.values(o)
})
