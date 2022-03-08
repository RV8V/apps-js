const { Either, toEither } = require('../03-ramda-fantasy');
const { toEitherSafe } = require('../to-either');
const {
  prop,
  map,
  compose,
  equals,
  filter,
  curry,
  head,
  always,
} = require('ramda');
const { Maybe } = require('ramda-fantasy');

/********************example-4************************* */

{
  const concatUniq = (x, ys) => {
    const found = ys.filter((y) => y === x);
    const head = found[0];
    return found.length ? ys : ys.concat(x);
  };

  console.log({ concatUniq: concatUniq(1, [1, 2]) });
  console.log({ concatUniq: concatUniq(1, [-1, 2]) });
}

{
  const getHead = (x) => compose(head, filter(equals(x)));

  const safeHead = curry(
    compose(toEither('head is null or undefined'), getHead)
  );

  const eitherList = toEither(`list is null`);

  const ap = (x, list) => safeHead(x).ap(eitherList(list)).chain(toEither(x));

  const onHeadNull = (list) => (x) => list.concat(x);

  const concatUniq = (x, list) => {
    const either = ap(x, list);
    return Either.either(onHeadNull(list), always(list), either);
  };

  console.log({ concatUniq: concatUniq(1, [1, 2]) });
  console.log({ concatUniq: concatUniq(1, [-1, 2]) });
}
