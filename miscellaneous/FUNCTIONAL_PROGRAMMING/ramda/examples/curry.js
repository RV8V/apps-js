const R = require('ramda')

const curriedSum = R.curry((x, y, z) => x + y + z)

curriedSum(1, 2, 3)
curriedSum(3)(1, 4)
curriedSum(1)(2)(3)
