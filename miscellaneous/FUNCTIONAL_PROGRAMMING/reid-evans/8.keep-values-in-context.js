const Maybe = require('ramda-fantasy').Maybe
const R = require('ramda')

/** @: One does not simply remove a value from a context */

const withDefault = R.curry((v, functor) => functor.join() || v)

console.log({
  value: Maybe.Just(1).getOrElse(2),
  default: Maybe.Nothing(1).getOrElse(2),
})
