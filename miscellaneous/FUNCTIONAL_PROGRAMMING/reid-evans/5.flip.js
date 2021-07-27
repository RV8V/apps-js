const R = require('ramda')

const items = {
  Jane: [],
  Jake: []
}

const existsFirst = R.curry((item, items) => R.flip(R.contains)(Object.keys(items))(item))

R.pipe(existsFirst('Jane'), console.log)(items)

/***************************************************/

const existSecond = R.flip(R.contains)(Object.keys(items))

R.pipe(existSecond, console.log)('Jane')
