const R = require('ramda')

/**
 * @R.compose is right-to-left composition
 * @R.pipe    is left-to-right composition
 *
 * R.compose(f, g)(x) (f <<< g)(x) = f(g(x)) - compose, '<<<' is right-to-left composition
 * R.pipe(f, g)(x)    (f >>> g)(x) = g(f(x)) - pipe,    '>>>' is left-to-right composition
 */

const l = R.bind(console.log, console)

const greet = (first, last) => `hello, ${first} ${last}`
const f = x => x.toUpperCase()
const g = x => `${x}!`
const composed = R.compose(R.toUpper, greet)

l({
  composed: composed('James', 'Bond'),
  comp: R.compose(R.concat('HELLO, '), R.toUpper)('James Bond'),
  calculate: R.compose(Math.abs, R.add(R.__))(1, -4),
  fgx: R.compose(f, g)('hello')
})
