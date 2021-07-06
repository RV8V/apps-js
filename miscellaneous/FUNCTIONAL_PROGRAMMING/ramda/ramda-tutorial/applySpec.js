const R = require('ramda')

/**
 * @R.applySpec return object with the same structure but instead of refenreces to functions places its result
 * @R.applyTo gives a value and applies a function to given value
 */

const l = console.log

l({
  getMetrics: R.applySpec({
    diff:   R.subtract,         /* R.subtract(2, 4) */
    sum:    R.add,              /* R.add(2, 4) */
    nested: { mul: R.multiply } /* R.multiply(2, 4) */
  })(2, 4),
  to:       R.applyTo(10)(R.add(1)),
  ap:       R.apply(R.add(1))([10])
})
