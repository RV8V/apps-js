const R = require('ramda')

/**
 * @R.aperture return a list of lists with passed n
 * @R.append return a new list with pushed element in last position
 * @R.prepend return a new list with pushed element in first position
 * @R.apply call function to a list of arguments
 * @R.unapply reverse to R.apply ?
 * @R.pipe provides left-to-right function composition
 */

const l = console.log

l(
  R.aperture(2, [1, 2, 3]),
  R.aperture(4, [1, 2, 3, 4, 5]),
  R.append('new element', ['old elements']),
  R.prepend('new element', ['old elements']),
  R.apply(Math.max, [1, 2, 3]),
  R.unapply(JSON.stringify)(1, 2, 3),
  R.pipe(Math.pow, R.negate, R.inc)(3, 4), /* -(3^4) + 1 */
)
