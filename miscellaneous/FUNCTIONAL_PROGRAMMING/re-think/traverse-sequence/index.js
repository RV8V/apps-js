const { Maybe, Either, Future } = require('ramda-fantasy');
const {
  map,
  chain,
  sequence,
  traverse,
  construct,
  reject,
  add,
  identity,
} = require('ramda');

/**
 * @sequence transform traversable of applicatives to applicative of traversable
 */

const maybe = construct(Maybe);
const just = construct(Maybe.of);

const future = (v) =>
  new Future((reject, resolve) => {
    if (!v) return reject(new Error(`err in future`));
    return resolve(v);
  });

const arrInMaybe = sequence(just, [maybe(1), maybe(2)]);
const arrInFuture = sequence(Future.of, [future(1), future(2)]);

arrInFuture.fork(
  (err) => console.log({ err }),
  (ok) => console.log({ ok })
);

console.log({ arrInMaybe, arrInFuture });

/**
 * @traverse apply fn to 3th param and then run @sequence fn
 */

const addOneInMaybe = traverse(
  just,
  map((x) => x + 1),
  [maybe(1), maybe(2), maybe(3)]
);

console.log({ addOneInMaybe });

const objects = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const getPost = (obj) => Future.of({ post: 'my post ' + obj.id });

const arrOfFutures = map(getPost, objects);
const futureOfArray = traverse(Future.of, getPost, objects);
const same = sequence(Future.of, map(getPost, objects));

console.log({ arrOfFutures, futureOfArray, same });
