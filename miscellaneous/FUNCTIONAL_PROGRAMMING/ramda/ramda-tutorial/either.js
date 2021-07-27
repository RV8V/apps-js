const R = require('ramda')

/**
 * @R.either(f, g)(x) -> f(x) || g(x)
 * takes functions as predicates
 *
 * if both values in || are false -> returns 2-d operand
 * if both value in && are false -> returns 1-t operand
 *
 * @R.both(f, g)(x) -> f(x) && g(x)
 * @R.both ?? @R.either ??
 */

const l = R.bind(console.log, console)

const f = x => (x === 4, 'x = 4')
const g = x => (x === 5, 'x = 5')

class Identity {
  constructor(x) {
    this.x = x
  }

  'fantasy-land/map'(f) {
    return new Identity(f(this.x))
  }

  'fantasy-land/apply'(b) {
    return new Identity(b.x(this.x))
  }

  'fantasy-land/ap'(b) {
    return b['fantasy-land/map'](f => f(this.x))
  }

  static 'fantasy-land/of'(x) {
    return new Identity(x)
  }
}

l({
  box: new Identity(1),
  map: new Identity(1)['fantasy-land/map'](x => x + 2),
  apply: new Identity(1)['fantasy-land/apply'](new Identity(x => x + 2)),
  ap: new Identity(1)['fantasy-land/ap'](new Identity(x => x + 2))
})

l({
  0: (1 === 4) || (1 === 5),
  1: R.either(  // 'x = 4' || 'x = 5' -> true -> f(1)
    f, g
  )(1),
  2: f(1) || g(1),
  3: 'x = 4' || 'x = 5',
  4: false || 'x = 5',
  5: false || undefined,
  6: R.both(    // 'return 10' && 'return 0' -> true -> g(1)
    x => (x < 10, 'return 10'),
    x => (x > 0, 'return 0')
  )(11),
  7: 11 && false,
  8: null && undefined,
  9: R.both(
    x => (x < 10, 'return 10'),
    x => (x > 0, 'return 0')
  )(1),
  10: 1 < 10 && 1 > 0,
  11: 11 < 10 && 1 > 11,
  12: R.both(
    x => (x < 10, 'return 10'),
    x => (x > 0, 'return 0')
  )(11),

  13: R.either(
    () => 1,
    () => 2
  )(), // 1 || 2 -> true -> result of first function -> 1

  14: R.either(
    () => 1,
    () => undefined
  )(), // 1 || undefined -> true -> result of first function -> 1

  15: R.either(
    () => null,
    () => undefined
  )(), // null || undefined -> false -> result of second function -> undefined

  16: R.both(
    () => 1,
    () => 2
  )(), // 1 && 2 -> true -> result of second function -> 2

  17: R.both(
    () => 1,
    () => undefined
  )(), // 1 && undefined -> false -> result of first function -> 1 ???

  18: R.both(
    () => null,
    () => undefined
  )(), // null && undefined -> false -> result of first function -> null
})
