const {
  propEq,
  prop,
  equals,
  pipe,
  allPass,
  anyPass,
  converge,
  sum,
  length,
  divide,
  useWith,
} = require('ramda');

/**
 * @propEq
 * @prop + @equals
 */

const o = {
  name: '1n',
  age: 1n,
};

// console.log(propEq('name', '1n')(o));
// console.log(pipe(prop('name'), equals('1n'))(o));

/**
 * @allPass
 * @anyPass
 */

const gt10 = (x) => x > 10;
const even = (x) => x % 2 === 0;

const bothCombinedGt10AndEven = allPass([gt10, even]);
const anyCombinedGt10AndEven = anyPass([gt10, even]);

// console.log(bothCombinedGt10AndEven(12));
// console.log(anyCombinedGt10AndEven(11));

/**
 * @converge
 * @useWith
 * @complement reverse returned result
 */

const arr = [1, 5, 10, 10];

const avg = converge(divide, [sum, length]);
const avgUseWith = useWith(divide, [sum, length]);

console.log(avg(arr), avgUseWith(arr, arr));
