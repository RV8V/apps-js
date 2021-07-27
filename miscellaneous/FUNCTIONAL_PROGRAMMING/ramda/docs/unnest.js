const R = require('ramda')

/**
 * @Unnest === Chain(Identity)
 * Remove one level of nesting
 */

R.bind(console.log, console)({
  1: R.chain(x => x, [[1], [2], [3]]),
  2: R.chain(R.identity)([[1], [2], [3]]),
  3: R.unnest([[1], [2], [3], [4, [5]]])
})
