const R = require('ramda')

/**
 * @R.contains return Boolean value [includes] [Deprecated since v0.26.0]
 */

const l = R.bind(console.log, console)

l({
  arr: R.contains([3], [1, 2, [3]]),
  str: R.contains('b', 'abx')
})
