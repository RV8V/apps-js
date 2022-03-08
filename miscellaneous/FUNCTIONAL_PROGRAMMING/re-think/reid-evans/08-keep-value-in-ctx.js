const { curry } = require('ramda');
const Maybe = require('ramda-fantasy').Maybe;

const withDefault = curry((functor, v) => functor.join() || v);

console.log({
  three: Maybe(3).getOrElse(1),
  null: Maybe(null).getOrElse(1),
  arr: withDefault([1, 2, 3], '1..3'),
});
