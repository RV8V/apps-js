const R = require('ramda')

/**
 * @R.defaultTo ~ ||
 */

const l = R.bind(console.log, console)

l({
  one: R.defaultTo(43)(null),
  two: R.defaultTo(43)(1),
  and: R.and(1, 2),
  or: R.or('', 1),
  do: 'condition' ? 'one branch' : 'next branch',
  amp: 'condition' && 'one branch' || 'next branch'
})
