const R = require('ramda')

/**
 * @R.__ a place for future value, allows partial application
 */

const log = console.log

const addToLeft = R.add(R.__, 10)
const addToRight = R.add(10, R.__)
const subtractFromR__10 = R.subtract(R.__, 10)
const subtractFrom10R__ = R.subtract(10, R.__)

const greetImp = name => `hello, ${name}`
const greetFunc = R.replace('name', R.__, 'hello, name')

log(
  R.add(10)(20),
  addToLeft(10),
  addToRight(10),
  subtractFromR__10(1),
  subtractFrom10R__(1),
  greetImp('alice'),
  greetFunc('alice')
);

R.pipe(
  R.add(1),
  addToLeft,
  addToRight,
  subtractFrom10R__,
  subtractFromR__10,
  log
)(10)
