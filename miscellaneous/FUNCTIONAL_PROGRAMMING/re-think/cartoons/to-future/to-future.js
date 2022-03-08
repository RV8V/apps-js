const { Future, Either } = require('ramda-fantasy');
const { curry, compose, prop } = require('ramda');

const futurify =
  (f) =>
  (...args) =>
    new Future((reject, resolve) => {
      args.push((err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
      return f(...args);
    });

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

const toFuture = curry(compose(futurify, prop));

module.exports = { futurify, toFuture, futurifyWithEither };
