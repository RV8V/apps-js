const { curry } = require('ramda');

// const toEither = (left, right) => (errMessage, value) => {
//   if (value) return right(value);
//   return left(errMessage);
// };

const toEither = (left, right) =>
  curry((errMessage, value) => {
    if (value) return right(value);
    return left(errMessage);
  });

// const toEitherSafe = (left, right) =>
//   curry((f, value) => {
//     try {
//       return right(f(value));
//     } catch (err) {
//       return left(err);
//     }
//   });

const toEitherSafe =
  (left, right) =>
  (f) =>
  (...value) => {
    try {
      return right(f(...value));
    } catch (err) {
      return left(err);
    }
  };

module.exports = { toEither, toEitherSafe };
