const R = require('ramda')

/**
 * @R.addIndex return function for iteration from already existing function, also add two params: index, list - reference to the iterator itself
 * @R.adjust call function to value in arr to given index
 */

const log = console.log

const mapIndex = R.addIndex(R.map)

const double = R.multiply(R.__)
const doubleImp = x => y => x * y

log(
  mapIndex((val, i, list) => `${i} -> ${val}`)(['one', 'two']),
  R.map(double(4), [1, 2]),
  R.addIndex
    (R.map)
    ((v, i, l) => v + i + ' | ' + JSON.stringify(l))
    ([10, 20]),
  R.addIndex(R.map)(R.add)([1, 2]), /* R.add(val, index -> 0..l.lenght) */
  R.adjust(1, R.toUpper, ['a', 'b', 'c']),
  R.adjust(R.__, R.__)(1, R.toUpper)(['a', 'b', 'c']),
  R.adjust(
    1,                              /* index in array */
    R.subtract(R.__, 10),           /* function to call */
    [1, 2, 3]                       /* list - array with values */
  )
)

const promisify = f => (...args) => new Promise((resolve, reject) => (
  args.push((err, data) => err && reject(err) || resolve(data)),
  f(...args)
))
