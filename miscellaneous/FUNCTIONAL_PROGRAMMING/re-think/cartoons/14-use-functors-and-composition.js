const { Maybe } = require('ramda-fantasy');
const { map, compose, F } = require('ramda');

const addOne = (x) => x + 1;
const addTen = (x) => x + 10;

`
functor.map(f).map(g) === functor.map((x) => g(f(x)))) === functor.map(compose(g, f));`;

const chaining = Maybe.of(10).map(addOne).map(addTen);

const composition = map(compose(addTen, addOne));

console.log({ chaining, composition: composition(Maybe.of(10)) });
