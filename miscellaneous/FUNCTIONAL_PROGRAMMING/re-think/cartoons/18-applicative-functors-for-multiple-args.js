/**
 * @law functor(x).map(f) === functor(f).ap(functor(x))
 * @apply multiple args to a function in a generic way(liftN)
 */

const { Maybe } = require('ramda-fantasy');

const transform = (number) => number.toString();

const map = Maybe.of(10).map(transform);
const ap = Maybe.of(transform).ap(Maybe.of(10));

const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);
const liftA2 = (f, fx, fy, fz) => fx.map(f).ap(fy).ap(fz);

const forLift = (n1) => (n2) => ({ n1, n2 });

const lift = liftA2(forLift, Maybe.of('n1'), Maybe.of('n2'));

console.log({ map, ap, lift });
