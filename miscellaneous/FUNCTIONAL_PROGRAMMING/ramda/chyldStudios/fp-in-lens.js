const R = require('ramda')

/**
 * @Lens is a pair of a getter and a setter in normal OOP language
 * - Lenses allows to take a large data structure, allows to peer inside of it and only operate on a certain section of it
 * - it can be an object, array, any type of data structure
 * - it allows to peer inside that is why they are called lenses. Because it focuses on a specific part ot the data structure
 *
 * There are 3 different methods we can do on lens:
 * - view - see a particular part of data structure, params: lens, data structure
 * - set  - change a par of data structure, params: lens, field-name, data structure
 * - over - similar to 'set' only the main difference. Over and set - these are both about changing things. Set takes a value(as second parameter). Over takes as second parameter a function
 *
 * @R.lens, params: getter, setter
 * @R.lensIndex creates a lens based on an index, params: index
 * @R.lensPath  creates a lens based on a path: (combination of field into deapth). Used for more complicated data structures
 * @R.lensProp  createa a lens based on a specific field in object
 *
 * Interesting thing abount lenses it gives you outputs - entire data structure
 */

const xLens = R.lens(R.prop('x'), R.assoc('x'))
const headLens = R.lensIndex(0)
const propLens = R.lensProp('v')
const propTestLens = R.lensProp('age')

const quotes = [
  { symbol: 'aapl', amount: 120, name: 'Apple' },
  { symbol: 'banl', amount: 124, name: 'Somls' }
]

const amountLens = R.lensProp('amount')
const otherCurrency = R.over(amountLens, x => x * 1.7)

R.bind(console.dir, console)({
  result: R.map(otherCurrency, quotes)
}, {
  depth: 4
})

R.bind(console.log, console)({
  xLens: {
    view: R.view(xLens, { x: 2, y: 4 }),
    set: R.set(xLens, 6, { x: 2, y: 4 }),
    over: R.over(xLens, R.inc, { x: 2, y: 4 })
  },
  lensIndex: {
    view: R.view(headLens, ['a', 'b']),
    set: R.set(headLens, 'x', ['a', 'b']),
    over: R.over(headLens, R.toUpper, ['a', 'v'])
  },
  lensProp: {
    vies: R.view(propLens, { v: 12, k: 4 }),
    set: R.set(propLens, 5, { v: 12, k: 5 }),
    over: R.over(propLens, R.multiply(R.__)(2), { v: 3, g: 5 })
  },
  lensPropExample: {
    vies: R.view(propTestLens, { name: '1n', age: 12 }),
    set: R.set(propTestLens, 5, { name: '1n', age: 12 }),
    over: R.over(propTestLens, age => age + 3, { name: '3n', age: 5 })
  }
})
