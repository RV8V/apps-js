const R = require('ramda')

/**
 * @R.ap applies a list of functions to a list of values
 */

const l = console.log

const sCombinator = (x, y, z) =>
  x(z)(y(z));

const obj = {
  data: 'hello',
  reps: 3
}

l(
  R.ap([R.multiply(2), R.add(4)])([1, 4]),
  R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']),
  R.ap(R.concat, R.toUpper)('Ramda'), /* concat('ramda', upper('ramda')) */
  sCombinator(R.concat, R.toUpper, 'Ramda'),
  R.concat('Ramda')(R.toUpper('Ramda')),
  R.ap(R.repeat, R.prop('reps'))(obj), /* repeat(obj)(prop('reps')) */
  R.ap(R.pipe(R.prop('data'), R.repeat), R.prop('reps'))(obj),
  R.ap(R.pipe(R.prop('data'), R.repeat), () => 3)(obj),
  R.prop('reps')(obj)
)
