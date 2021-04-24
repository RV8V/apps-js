const R = require('ramda')

/**
 * @R.addIndex have value and index to later usage
 * @R.addjust return new array applied with value at index
 */

const TWO = 2
const INDEX = 1
const VALUE_TO_MULTIPLY = 10
const INITIAL_ARR = [1, 2, 3]

console.log({
  double: R.multiply(TWO)(VALUE_TO_MULTIPLY),
  mapDouble: R.map(R.multiply(TWO))(INITIAL_ARR),
  normalDoubleOnMap: R.map(x => x * TWO, INITIAL_ARR),
  theSame: R.map(x => x * TWO)(INITIAL_ARR),
  addIndex: R.addIndex(R.map)(R.add, INITIAL_ARR),
  addSmth: R.addIndex(R.map)((val, i) => i + '-' + val, INITIAL_ARR),
  adjust: R.adjust(1, R.subtract(R.__, 4), [20, 30, 40])
})
