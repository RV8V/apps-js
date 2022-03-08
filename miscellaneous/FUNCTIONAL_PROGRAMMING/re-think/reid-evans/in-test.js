const {
  append,
  uniq,
  lensPath,
  over,
  toUpper,
  lift,
  curry,
  sequence,
  traverse,
  of,
} = require('ramda');
const Either = require('ramda-fantasy/src/Either');
const Maybe = require('ramda-fantasy/src/Maybe');

/************01-append-unique-set-error*************** */

const list = ['syntax error'];

const updatedList = append('network error', list);
const uniqInTest = uniq([1, 2, 1]);

const o = {
  message: {
    name: 'object name for lens',
  },
};

const lens = lensPath(['message', 'name']);
const ov = over(lens, (message) => toUpper(message), o);

console.log({ ov, o, append: append.length });

const left = Either.Left(1).map((x) => x + 1);
console.log({ left });

const sum = curry((x) => x + 1);
const sumLifted = lift(sum);

const lifted = sumLifted(Either.of(1));
console.log({ lifted });

console.log({ same: Either.of(sum).ap(Either.of(1)) });

/*********************sequence-vs-traverse********************************** */
/*********************traversable-vs-applicative**************************** */

const one = sequence(Maybe.of, [Maybe.Just(1), Maybe.Just(2), Maybe.Just(3)]); //=> Just([1, 2, 3])
const two = sequence(Maybe.of, [Maybe.Just(1), Maybe.Just(2), Maybe.Nothing()]); //=> Nothing()

const three = sequence(of, Maybe.Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
const four = sequence(of, Maybe.Nothing()); //=> [Nothing()]

console.log({ one, two, three, four });

// Returns `Maybe.Nothing` if the given divisor is `0`
const safeDiv = (n) => (d) => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d);

const tr1 = traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
const tr2 = traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing

console.log({ tr1, tr2 });
