const { Either } = require('ramda-fantasy');
const { curry } = require('ramda');

const toEither = curry((errMessage, value) => {
  if (value) return Either.Right(value);
  return Either.Left(errMessage);
});

/**
 * @usage
 */

// const either = Either.either(console.log, (x) => x + 1);

// const ten = 10;
// const n = null;

// const ei = toEither('err message', n);

// const result = either(ei);

// console.log({ result });

module.exports = { Either, toEither };
