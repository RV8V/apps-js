const R = require('ramda')

const sum = (...params) => R.sum(params)

console.log({ sum: sum(1, 2, 3) })

/**************************************/

/** @Usage of curryN for waiting of amount of function calls  */
/** @Log, function that makes logging only when it is call 3 times */

/** @Dirty solution */

let counter = 0

const logAfter3Calls = () => {
  if (++counter === 3) {
    console.log('called me 3 times')
  }
}

logAfter3Calls()
logAfter3Calls()
logAfter3Calls()

/** @Normal solution */
/** @Usage for Applicative Validation */

const log = () => console.log('called me 3 times')
const logAfter3CallsNormal = R.curryN(3, log)

logAfter3CallsNormal('')('')('')
