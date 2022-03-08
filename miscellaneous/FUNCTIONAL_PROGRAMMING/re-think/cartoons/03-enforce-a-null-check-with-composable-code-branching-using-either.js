/**
 * @const either = right || left;
 * @allows to do:
 * - pure functional error handling
 * - code branching
 * - null checks
 */

const mEither = require('./03-my-implementation-of-either');
const nEither = require('./03-another-either-implementation');
const rEither = require('./03-ramda-fantasy');

const toEither = (left, right) => (errMessage, value) => {
  if (value) return right(value);
  return left(errMessage);
};

/**
 * @testing different either implementations
 */

{
  nEither
    .left(10)
    .map((x) => x + 1)
    .fold(console.log, console.log);

  nEither
    .right(10)
    .map((x) => x + 1)
    .fold(console.log, console.log);
}

{
  const add = (x) => x + 1;
  const id = (x) => x;

  const r = mEither.right(10);
  const l = mEither.left(10);

  const either = mEither.either(id)(add);
  console.log({ eitherLeft: either(l), eitherRight: either(r) });
}

/**
 * @find color example
 */

const findColor = (name) => {
  const set = { red: 'ff2', blue: 'ff4', yellow: 'ed2' };
  return set[name];
};

const id = (x) => x;
const transform = (s) => s.slice(1).toUpperCase();

{
  /**
   * @without either
   */

  const result = findColor('red').slice(1).toUpperCase();
  /**
   * @error
   * @const result = findColor('green').slice(1).toUpperCase();
   * @TypeError: Cannot read property 'slice' of undefined
   */
  console.log({ result });
}

{
  /**
   * @with my either
   */

  const color = findColor('red');
  //   const color = findColor('read');

  const myToEither = toEither(mEither.left, mEither.right);
  const ei = myToEither('could not find color', color);
  const either = mEither.either(id)(transform);

  console.log({ either: either(ei) });
}

{
  /**
   * @with my either
   */

  const color = findColor('red');
  //   const color = findColor('read');

  const myToEither = toEither(mEither.left, mEither.right);
  const ei = myToEither('could not find color', color);

  //   const either = mEither.either(id)(transform);
  const either = ei.map(transform).fold(id);

  console.log({ either });
}

{
  /**
   * @with ramda-fantasy either
   */

  const color = findColor('red');
  //   const color = findColor('read');

  const { Either, toEither } = rEither;

  const ei = toEither('could not find color', color);
  const either = Either.either(id)(transform);

  console.log({ either: either(ei) });
}

{
  /**
   * @with ramda-fantasy either
   */

  const color = findColor('red');
  //   const color = findColor('read');

  const { Either, toEither } = rEither;

  const ei = toEither('could not find color', color);
  //   const either = Either.either(id)(transform);

  console.log({ ei });

  const either = ei.map(transform).chain(id);

  console.log({ ramda: either });
}
