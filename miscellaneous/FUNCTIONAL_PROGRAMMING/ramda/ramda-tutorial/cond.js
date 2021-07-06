const R = require('ramda')

/**
 * @R.cond - switch(expression) {
 *   case expression:
 *     break;
 *   default:
 * }
 *
 * @R.cond[
 *  [condition_a, consequence_a],
 *  [condition_b, consequence_b]
 * ]
 *
 * condition   :: *... -> Bool | condition function called with ...args should return Boolean value
 * consequence :: *... -> *    | consequence function called wiht ..args should return value of any type
 *
 * return a function that represents if-else logic | mathing pattern
 * @R.T a function that always returns true value.  Any passed in parameters are ignored.
 * @R.F a function that always returns false value. Any passed in parameters are ignored.
 * @R.always is function that represents constant
 */

const l = R.bind(console.log, console)

l({
  true: R.T(),
  false: R.F(),
  0: R.equals(0)
})

const handler = R.cond([
  [R.equals(0),   R.always('water freezes at 0°C')],
  [R.equals(100), R.always('water boils at 100°C')],
  [R.T, temp => `noting special happens at temperature ${temp}°C`]
])

const expression = 0

switch (expression) {
  case 0:
    l('water freezes at 0°C')
    break;
  case 100:
    l('water boils at 100°C')
    break;
  default:
  l(`noting special happens at temperature ${expression}°C`)
}

l({
  0: handler(0),
  100: handler(100),
  50: handler(50)
})
