const R = require('ramda')

/**
 * @R.complement is theory of set. if 'a' is area, then the complement 'a' is everything else from 'area'
 * @R.isNil check if value is null or undefined
 * @R.not === !
 *
 * area A. complement area A is out of area A
 * R.complement constucts a new function from a given function, so R.complement is one level above in abstraction compare to R.not
 */

const l = R.bind(console.log, console)
const isNotNil = R.complement(R.isNil)
const lessThanTen = R.lt(R.__, 10)
const greaterThanTen = R.complement(lessThanTen)
const identity = R.identity
const isNotIdentity = R.complement(identity)
const isOne = x => x === 1
const isNotOne = R.complement(isOne)

l({
  isNil: {
    null: R.isNil(null),
    undefined: R.isNil(undefined),
    arr: R.isNil([]),
    obj: R.isNil({}),
    str: R.isNil('')
  },
  isNotNil: {
    null: isNotNil(null),
    undefined: isNotNil(undefined),
    arr: isNotNil([]),
    obj: isNotNil({}),
    str: isNotNil('')
  },
  numbers: {
    oneLessThanTen: lessThanTen(1),
    elevenGreaterThanTen: greaterThanTen(11),
    isOne: isOne(1),
    isNotOne: isNotOne(2),
  },
  convert: {
    true: R.not(true),
    false: R.not(false)
  }
})
