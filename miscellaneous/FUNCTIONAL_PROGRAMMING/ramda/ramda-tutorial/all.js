const R = require('ramda')

/**
 * @R.all return Boolean value after applying function to values in list -> f(arr[i0]) && f(arr[i1]) && ... && f(arr[n]), i = [0...n]
 * @R.allPass return Boolean value after applying [array of functions] to given arr of object
 */

const log = console.log

log(
  R.all(
    R.equals(R.__)(3),
    [3, 3]
  ),
  R.all(R.equals(5), [1, 5, 6]),
  R.all(R.gte(R.__, 10), [1, 2, 3]),
  R.allPass([
    R.propEq('rank', 'high'),
    R.propEq('suit', 'normal')
  ])({
    rank: 'high',
    suit: 'normal'
  }),
  R.allPass(
    [
      R.gte(R.__, 10),
      R.lte(R.__, 20)
    ]
  )(11),
  R.all(
    R.allPass(
      [R.gte(R.__, 10), R.lte(R.__, 20)]
    )
  )([11, 12]),
  R.allPass([
    R.lte,
    R.gte
  ])(10, 20),
  R.allPass([
    R.lte,
    R.flip(R.gte)
  ])(10, 20)
)
