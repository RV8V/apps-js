const R = require('ramda')

/**
 * @Monoid -> set + concat
 * Structure Set over the operation R.union - [...new Set(a.concat(b))]
 *
 * Extends Set Structure to represent Monoid
 */

Set.empty = function() {
  return new Set()
}

Set.prototype.concat = function(set) {
  return new Set(
    Array.from(this).concat(Array.from(set))
  )
}

concat :: Monoid a => a -> a -> a

function concat(m1 :: Monoid, m2 :: Monoid) {
  return m1.concat(m2)
}

R.bind(console.log, console)({
  strings: concat('hello, ', 'world'),
  sets: concat(new Set([1, 2]), new Set([2, 3]))
})

R.bind(console.log, console)({
  s: new Set([1, 2, 3]).concat(new Set([2, 3, 4])),
  v: Array.from(new Set([1, 2, 3]).values())
})
