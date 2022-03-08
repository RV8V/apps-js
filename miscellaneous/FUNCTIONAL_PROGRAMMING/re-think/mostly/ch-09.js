const {
  compose,
  construct,
  identity,
  curry,
  chain,
  split,
  last,
  map,
} = require('ramda');
const { Maybe, IO } = require('ramda-fantasy');

/*****************exercise-a******************** */

const user = {
  id: 1,
  name: 'Albert',
  address: {
    street: {
      number: 22,
      name: 'Walnut St',
    },
  },
};

const maybe = compose(construct(Maybe), identity);
const safeProp = curry((field, o) => maybe(o[field]));
const tag = (x) => (console.log({ x }), x);

// getStreetName :: User -> Maybe String
const getStreetName = compose(
  chain(safeProp('name')),
  chain(safeProp('street')),
  safeProp('address')
);

console.log({ getStreetName: getStreetName(user) });

/*****************exercise-b******************** */

const path = '/home/mostly-adequate/ch09.md';

// getFile :: () -> IO String
const getFile = () => IO.of(path);

// pureLog :: String -> IO ()
const pureLog = (str) => new IO(() => console.log(str));

const basename = compose(last, split('/'));
const logFilename = compose(chain(pureLog), map(basename), getFile);

console.log({ logFilename: logFilename().runIO() });
