const R = require('ramda')

/**
 * @Test RegExp → String → Boolean
 * Takes RegExp as first parameter, String as second parameter, returns Boolean
 */

R.bind(console.log, console)({
  1: R.test(/^x/, 'xyz'),
  2: R.test(/^y/)('xyz')
})
