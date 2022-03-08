/** @: safe operations */
/** @: Maybe,toMaybe Returns Nothing for a null/undefined value, otherwise a Just of the value for any other value. */

const Maybe = require('ramda-fantasy').Maybe;
const Future = require('ramda-fantasy').Future;
const Either = require('ramda-fantasy').Either;

const R = require('ramda');

const nth = R.curry((n, arr) => arr[n]);

const safeNth = R.curry((n, arr) => Maybe(arr[n]));
const safeNthToo = R.compose(Maybe.toMaybe, nth);

console.log({
  undefined: nth(9, []),
  /** @: canNotReadPropertyMapOfUndefined: nth(9, []).map(R.add(1)), */
  normal: safeNth(9, []).map(R.add(1)),
  normalToo: safeNthToo(9, []).map(R.add(1)),
  resultOfNth: safeNth(1, [2, 3, 4]).map(R.add(1)),
  resultOfNthToo: safeNthToo(1, [2, 3, 4]).map(R.add(1)),
});

console.log({
  maybeOk: Maybe.toMaybe({ f: () => '' }).map((v) => v.f()),
  /** @: maybeBad: Maybe.toMaybe({ f: () => '' }).map(v => v.g()) */
});

console.log({
  right: Either.Right({ v: 'value' }).map((v) => v.v.toUpperCase()),
  left: Either.Left('left value').map((v) => v.toUpperCase()),
});

Future((reject, resolve) => reject('err in future')).fork(
  (err) => console.log({ err }),
  (data) => console.log({ data })
);

Future((reject, resolve) =>
  process.env.dev === undefined
    ? reject(Either.Left(new Error('error in either and future')))
    : resolve(process.env)
).fork(
  (err) => console.log({ err }),
  (res) => console.log({ res })
);
