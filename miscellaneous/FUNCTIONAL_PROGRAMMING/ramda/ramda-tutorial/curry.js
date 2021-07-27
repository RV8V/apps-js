const R = require('ramda')

/**
 * @R.partial      left-to-right order >>>
 * @R.partialRight right-to-left order <<<
 * @R.curryN for ...args variadic
 * @R.curry returns a curried equivalent of the provided function
 * (...args) => i => ... => n, i = 0...n
 */

const l = R.bind(console.log, console)

const sub = (x, b) => x - b
const sum = (...params) => R.sum(params)
const s = (...args) => R.reduce(R.add, 0, args)
const mult = R.partial((a, b) => a * b, [2])
const same = R.partial((f, l, m) => f + l + m, ['one ', 'two '])
const sameRight = R.partialRight((f, l, m) => f + l + m, [' one', ' two'])

l({
  /* err: R.map(sub(1), [1, 2, 3]), function is not curried */
  ok: R.map(R.curry(sub)(1), [1, 2, 3]),
  flip: R.map(R.curry(sub)(R.__, 1), [1, 2, 3]),
  f: R.map(
    R.flip(R.curry(sub))(1),
    [1, 2, 3]
  ),
  flipSame: R.map(x => x - 1, [1, 2, 3]),
  okSame: R.map(x => 1 - x, [1, 2, 3]),
  Rdot: R.map(
    R.call(
      R.curry(sub)(R.__),
      1
    ),
    [1, 2, 3]
  ),
  sum: sum(1, 2, 3, 4),
  curryN: R.curryN(4, sum)(1)(2, 3)(4),
  curryNSum: R.curryN(
    4,
    (...args) => R.reduce(R.add, 0, args)
  )(1)(2)(3, 4),
  partial: mult(3),
  same: same('last'),
  sameRight: sameRight('hello')
})
