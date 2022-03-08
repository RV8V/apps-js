const request = require('request');
const { Future, Either } = require('ramda-fantasy');
const { compose, curry, always, call } = require('ramda');

const { toEither, toEitherSafe } = require('../to-either');
const { futurifyWithEither } = require('../to-future/to-future');

const fs = require('fs');

const eitherToFuture = Either.either(Future.reject, Future.of);
const ramdaEither = toEither(Either.Left, Either.Right);

const readFile = futurifyWithEither(fs.readFile);

const parse = JSON.parse;

const httpGet = (url) =>
  new Future((reject, resolve) =>
    request(url, (err, code, body) => {
      if (err) return reject(err);
      return resolve(body);
    })
  );

const nth = (n) => (xs) => xs[n];

const first = curry(
  compose(ramdaEither('first element is null or undefined'), nth(0))
);

const safe = toEitherSafe(Either.Left, Either.Right);
const safeParse = safe(parse);

const getJson = (url) => httpGet(url).map(safeParse).chain(eitherToFuture);

const identity = (x) => x;

module.exports = {
  readFile,
  httpGet,
  first,
  safeParse,
  getJson,
  identity,
  eitherToFuture,
};
