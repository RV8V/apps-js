const R = require('ramda')

/**
 * @Reverse to R.Curry - returns a function of arity n from a (manually) curried function.
 * Can be both partial called or at once
 */

const addFour = a => b => c => d => (console.log(a, b, c, d), a + b + c + d)
const uncurryAddFour = R.uncurryN(4, addFour)

const sumTwo = R.curry((a, b) => a + b)
const uncurrySumTwo = R.uncurryN(2, sumTwo)

R.bind(console.log, console)({
  uncurryAddFour: uncurryAddFour.length,
  uncurryN: uncurryAddFour(1, 2, 3, 9),
  uncurryNBoth: uncurryAddFour(1, 2, 3)(9),
  uncurrySumTwoQ: uncurrySumTwo(1, 2),
  uncurrySumTwo: uncurrySumTwo(1)(2)
})
