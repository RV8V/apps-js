const { Future, Either } = require('ramda-fantasy');
const { curry, always, compose, call } = require('ramda');

const { toEitherSafe, toEither } = require('../../cartoons/to-either');

const cacheFuture = Future.cache;
const either = Either.either;
const parse = JSON.parse;

const constant = compose(call, always);

const idToFuture = (id) => Future.of(id.join());

const eitherToFuture = either(Future.reject, Future.of);

const liftA2 = curry((f, v1, v2) => v1.map(f).ap(v2));

const trace = curry((message, v) => (console.log({ message, v }), v));

const id = (x) => ({
  map: (f) => id(f(x)),
  inspect: () => `id(${x})`,
  chain: (f) => f(x),
  ap: (f) => f.map((v) => x(v)),
  join: () => x,
});

const safe = toEitherSafe(Either.Left, Either.Right);
const safeParse = safe(parse);

const ramdaEither = toEither(Either.Left, Either.Right);

const logger = (message) => (value) => console.log({ message, value });

const futurifyWithEither =
  (f) =>
  (...args) =>
    new Future((reject, resolve) => {
      args.push((err, data) => {
        if (err) return reject(Either.Left(err));
        return resolve(Either.Right(data));
      });
      return f(...args);
    });

module.exports = {
  idToFuture,
  liftA2,
  cacheFuture,
  id,
  safeParse,
  trace,
  eitherToFuture,
  logger,
  constant,
  ramdaEither,
  futurifyWithEither,
};
