const R = require('ramda')

/**
 * @R.converge
 * @R.useWith
 * @R.call returns the result of calling its first argument with the remaining arguments
 *
 * const f = R.converge(c, [b1, b2, b3])(x)
 * f(x)    -> c(b1(x), b2(x), b3(x))
 *
 * const f = R.converge(c, [b1, b2, b3])(x, y)
 * f(x)    -> c(b1(x), b2(x), b3(x)) -> parameter y is ignored, so that we should pass an array
 *
 * const f = R.useWith(c, [b1, b2, b3])(x, y) ?
 * f(x)    -> c(b1(x, y), b2(x, y), b3(x, y)) -> parameter y is not ignored
 */

const l = R.bind(console.log, console)

const average = R.converge(R.divide, [R.sum, R.length])
const concatString = R.converge(R.concat, [R.toUpper, R.toLower])

l({
  average: average([1, 2, 3, 4]),
  concatString: concatString('hello'),
  same: R.concat(R.toUpper('hello'), R.toLower('hello')),
  use: R.useWith(Math.pow, [R.dec, R.inc])(3, 4),       /* 32 + parameter 4 is not ignored */
  converge: R.converge(Math.pow, [R.dec, R.inc])(3, 4), /* 16 - parameter 4 is     ignored */

  call: R.call(
    R.concat,
    R.toUpper('hello'),
    R.toLower('hello')
  ),
  converge: R.converge(
    R.concat,
    [R.toUpper, R.toLower]
  )('hello'),

  replaceTwo: R.replace(/^(?!$)/gm).length,
  replaceOne: R.replace(/^(?!$)/gm)('  ').length,

  /**
   * INPUT:  'hello' (5 chars)
   * OUTPUT: 'hello-hello-hello-hello-hello'
   */

   upper: R.toUpper.length,
   convergeLenght: R.converge.length,

   one: R.converge(
     R.repeat,
     [R.identity, R.length]
   )('hello'),

   add: R.converge(
     R.call, [
       R.unary(R.add),
       R.add(R.__)
     ]
   )(100, 2),

   sameAsOne: R.converge(
     R.call, [
       R.unary(R.add), // should be function, Because 'call' will be call this function     | R.unary(R.add)(100) returns a function with argument 100 already applied
       R.add(2)        // should be arguments for function with will call a 'call' function | R.add(2)(100) = 102
     ]
   )(100),             // R.call(R.add(100), 102)

   RCall: R.call(R.add(100), 102),

   ul: R.unary(R.add).length,
   u: R.unary(R.add)(1)(1),

   sameAsOneToo: R.call(
     R.add(100),   // function to call 100 + 102 = 202
     R.add(2)(100) // with this arguments (102)
   ),

   math: R.converge(
     Math.max,
     [
       R.length,
       R.sum,
       R.reduce(R.max, 0) //  R.max(0)(x)
     ]
   )([1, 2, 3, 4]),

   reduce: R.reduce(R.max, 0, [1, 2, 3]) // R.max(0, 3)
})
