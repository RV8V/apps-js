const R = require('ramda')

/**
 * @R.call return result calling function f with arguments -> f(...args)
 */

const l = R.bind(console.log, console)
const call = (fn, ...args) => fn(...args)
const normal = fn => (...args) => fn(...args)

l({
  math: Math.max(10, 20, 30),
  callMath: R.call(Math.max, 10, 20, 30),
  call: call(Math.max, 10, 20, 30),
  normal: normal(Math.max)(10, 20, 30),
  add: R.call(R.add, 10, 20)
})
