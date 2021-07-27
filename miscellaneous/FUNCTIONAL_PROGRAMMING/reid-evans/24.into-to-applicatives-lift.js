/** @: lift function allows working with different context: Array, Future, Maybe, Eihter, IO, Promise... */
/** @: lift function 'lift passed function' to needed context */

const Maybe = require('ramda-fantasy').Maybe
const R = require('ramda')

/** @: add :: number -> number -> number */
const add = R.curry((a, b) => a + b)

/** @: lifted :: Apply f => f number -> f number -> f number */
const lifted = R.lift(add)

console.log({
  liftedToMaybeContext: lifted(Maybe.of(1), Maybe.of(2)),
  liftedToArrayContext: lifted([1], [2]),
  lifting: lifted(Maybe.toMaybe(1), Maybe.Nothing()),
})

console.log({
  applicativeOne: Maybe.of(add(1)).ap(Maybe.of(2)),
  applicativeTwo: Maybe.of(1).map(add).ap(Maybe.of(2))
})
