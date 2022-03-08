const { Maybe, Either } = require('ramda-fantasy');
const { curry, compose, chain, map, toUpper, identity } = require('ramda');

const save = curry((f, x) => {
  try {
    return Maybe.of(f(x));
  } catch (err) {
    return Maybe.Nothing();
  }
});

const parse = JSON.parse;
const nth = curry((n, xs) => xs[n]);

const saveParse = save(parse);
const saveNth = curry(compose(Maybe.toMaybe, nth));

const json = compose(chain(saveNth(1)), saveParse);

console.log({ json: json('["hello",1]') });

const maybe = Maybe.of('chain');
const either = Either.of(maybe);

console.log({ either: map(map(toUpper))(either) });
console.log({ either: map(chain(toUpper))(either) });
console.log({ either: chain(chain(toUpper))(either) });
console.log({ either: chain(chain(identity))(either) });
