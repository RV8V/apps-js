/** @: parameters should not be in context */

const R = require('ramda')

/** @: map :: (a -> b) -> [a] -> [b]  */
const map = R.curry((f, xs) => xs.map(f))

/** @: double :: number -> number */
const double = x => x * 2

/** @: map1 :: [numbers] -> [numbers] */
const map1 = xs => xs.map(double)

/** @: map2 :: [numbers] -> [numbers] */
const map2 = xs => map(double, xs)

/** @: map3 :: [numbers] -> [numbers] */
const map3 = map(double)

/** @: xs :: [numbers] */
const xs = [1, 2, 3]

console.log({
  map1: map1(xs),
  map2: map2(xs),
  map3: map3(xs)
})
