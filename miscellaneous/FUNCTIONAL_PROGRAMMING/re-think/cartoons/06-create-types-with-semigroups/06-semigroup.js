const { sum, all, first } = require('./types');

/**
 * @if combining this of segigroups
 *
 * @semigroup is a type with concat method with is associative
 * @example string is a semigroup because it has concat method
 * @name semigroup comes from abstract algebra
 */

const string = 'a'.concat('b').concat('c');
const arr = [1, 2].concat([3, 4]).concat([5, 6]);

console.log({ string, arr });

const sumResult = sum(2).concat(sum(4));
console.log({ sumResult });

const allFalse = all(false).concat(all(true));
const allTrue = all(true).concat(all(true));

console.log({ allFalse, allTrue });

const firstResult = first('ice cream')
  .concat(first('ignore'))
  .concat(first('meta programming'));

console.log({ firstResult });
