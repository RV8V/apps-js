const R = require('ramda')

/**
 * @R.assoc makes clone, sets value, overides one. used for scalar types, refenreces are copied -> associate some property with some value in some object
 * @R.dissoc reverse to R.assoc - shallow clone without passed property in it
 * @R.pick return object with selected fields
 * @R.omit reverse to R.pick
 * @R.props return an array of values for passed keys
 * @R.assocPath makes clone, sets value, overides one, used for scalar types, refenreces are copied -> set value for given combination of fields
 * @R.dissocPath reverse to R.assocPath
 */

const l = console.log

l({
  assoc: R.assoc('key', 'value', {}),
  set: R.assoc('c', '(', { a: '-', b: ')' }),
  dissoc: R.dissoc('c', { c: 4, d: 5 }),
  pick: R.pick(['a', 'c'], { a: 1, b: 2, c: 3, d: 4 }),
  omit: R.omit(['a', 'c'], { a: 1, b: 2, c: 3, d: 4 }),
  props: R.compose(R.join(' '), R.props(['first', 'last']))({last: 'Bullet-Tooth', age: 33, first: 'Tony'}),
  assocPath: R.assocPath(['a', 'b', 'c'], 10, { a: { b: { c: 1} } }),
  dissocPath: R.dissocPath(['one', 'nested'], { one: { nested: 10 } })
})
