const R = require('ramda')

/**
 * @R.always returns first parameter
 * @R.identity returns its parameter
 * @R.and returns true if both parameters are true in Boolean logic - the same as &&
 * @R.any reverse meaning
 * @R anyPass reverse meaning
 */

const _const = x => _ => x
const identity = x => x

console.log({
  _const: _const(10)(20),
  _always: R.always(10)(20),
  identity: identity(10),
  _identity: R.identity(10),
  true: R.and(true)(true),
  false: R.and({}, 10),
  any: R.any(R.equals(10), [10, 20])
})
