/**
 * @if combining this of segigroups
 *
 * @semigroup is a type with concat method with is associative
 * @example string is a semigroup because it has concat method
 * @name semigroup comes from abstract algebra
 */

/**
 * @create sum type to capture addition operation
 * @sum :: 1 + (1 + 1) = (1 + 1) + 1
 * @associative example
 */

const sum = (x) => ({
  x,
  concat: ({ x: y }) => sum(x + y),
  inspect: () => `Sum(${x})`,
});

/**
 * @all
 * @lets create a new type to capture this conjunction
 * true && false -> false
 * true && true  -> true
 */

const all = (x) => ({
  x,
  concat: ({ x: y }) => all(x && y),
  inspect: () => `all(${x})`,
});

/**
 * @first always return first
 */

const first = (x) => ({
  x,
  concat: ({ x: y }) => first(x),
  inspect: () => `first(${x})`,
});

const map = (x) => ({
  x,
  concat: ({ x: y }) => {
    const keys = Object.keys(x);
    const mapped = keys.reduce((acc, key) => {
      const concated = x[key].concat(y[key]);
      return { ...acc, [key]: concated.x || concated };
    }, {});
    return map(mapped);
  },
  inspect: () => `map(${x})`,
});

module.exports = { first, all, sum, map };
