const R = require('ramda')

/**
 * @R.__ placeholger for values, can handle order of auguments
 */

const f = (x, y, z) => x + y + z
const g = R.curry(f)

const inc = R.add(1)
const inc__ = R.add(R.__, 1)

const dec = R.subtract(1)
const sameTodec = R.subtract(1, R.__)
const dec__ = R.subtract(R.__, 1)

const greet = R.replace('{name}', R.__, 'Hello, {name}')

console.log({
  a: g(1, 2, 3),
  b: g(1, 2)(3),
  c: g(1)(2)(3),
  d: R.add(10, 20),
  e: R.add(10)(20),
  inc: inc(inc(10)),
  inc__: inc__(inc__(10)),
  dec: dec(10),
  dec__: dec__(10),
  greet: greet('alice')
})
