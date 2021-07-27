const R = require('ramda')

/**
 * @IsEmpty a → Boolean
 *
 * @R.isEmpty(new Symbol()),
 * @R,isEmpty('setTimeout(function () {}, 10);')
 */

R.bind(console.log, console)({
  0:  R.isEmpty(),
  1:  R.isEmpty([]),
  2:  R.isEmpty({}),
  3:  R.isEmpty(''),
  4:  R.isEmpty(0),
  5:  R.isEmpty(null),
  6:  R.isEmpty(undefined),
  7:  R.isEmpty(true),
  8:  R.isEmpty(false),
  9:  R.isEmpty(Symbol()),
  10: R.isEmpty(Boolean()),
  11: R.isEmpty(Number()),
  12: R.isEmpty(String()),
  // 13: R.isEmpty(new Symbol()),
  14: R.isEmpty(new Boolean()),
  15: R.isEmpty(new Number()),
  16: R.isEmpty(new String()),
  17: R.isEmpty(new Function()),
  18: R.isEmpty(new Object()),
  19: R.isEmpty(new Array()),
  20: R.isEmpty(new Set()),
  21: R.isEmpty(new Set()),
  22: R.isEmpty(new Map()),
  23: R.isEmpty(new WeakSet()),
  24: R.isEmpty(new WeakMap()),
  25: R.isEmpty(function() {}),
  26: R.isEmpty(() => ([], [])),
  27: R.isEmpty(async function() {}),
  28: R.isEmpty(async () => ([], [])),
  29: R.isEmpty(async function* () {}),
  30: R.isEmpty(Promise),
  31: R.isEmpty(new Promise(r => r(1))),
  32: R.isEmpty(Promise.resolve(1)),
  33: R.isEmpty(Promise.reject(1).catch(e => e)),
  // 34: R,isEmpty('setTimeout(function () {}, 10);'),
  35: R.isEmpty(setTimeout),
  36: R.isEmpty(require),
  37: R.isEmpty(__dirname),
  38: R.isEmpty(console),
  39: R.isEmpty(require('ramda')),
  40: R.isEmpty(require('fs')),
  41: R.isEmpty(module)
})
