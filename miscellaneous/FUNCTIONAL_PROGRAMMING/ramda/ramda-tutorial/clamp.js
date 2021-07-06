const R = require('ramda')

/**
 * @R.clamp make restriction (min, max, value)
 * value in (min, max) -> value
 * value not in (min, max) && value > max -> max
 * value not in (min, max) && value < min -> min
 */

const l = R.bind(console.log, console)

l({
  compare: 'a' > 'b',
  inRange: R.clamp(1, 5, 2),
  outOfRange: R.clamp(1, 5, 8),
  outOfRangeToo: R.clamp(1, 8, 0)
})
