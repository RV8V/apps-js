const R = require('ramda')

/**
 * @Reduce,     parameters(function, initial-value, list), function(initial-value, list[i])
 * @ReduceRight parameters(function, initial-value, list), function(list[i], initial-value)
 */

R.bind(console.log, console)({
  0: [1, 2].reduce((state, val) => R.add(state, val), 0),
  1: R.reduce(R.__, 0, R.map(R.identity, [1, 2]))(R.add),
  2: R.reduce(R.add, 0, R.map(R.identity, [1, 2])),
  3: R.reduceRight(R.add, 0, [1, 2]),

  4: R.reduce(R.subtract, 0, [1, 2]),            // => 0 - 1 - 2
  5: R.reduceRight(R.subtract, 0, [1, 2]),       // => 1 - (2 - 0)
  6: R.reduceRight(R.subtract, 0, [1, 2, 3, 4]), // => (1 - (2 - (3 - (4 - 0)))) = -2
})
