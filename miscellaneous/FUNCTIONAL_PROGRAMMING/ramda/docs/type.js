const R = require('ramda')

/**
 * @Type typeof x
 */

R.bind(console.log, console)({
  0:  R.type(),
  1:  R.type([]),
  2:  R.type({}),
  3:  R.type(''),
  4:  R.type(0),
  5:  R.type(null),
  6:  R.type(undefined),
  7:  R.type(true),
  8:  R.type(false),
  9:  R.type(Symbol()),
  10: R.type(Boolean()),
  11: R.type(Number()),
  12: R.type(String()),
  // 13: R.isEmpty(new Symbol()),
  14: R.type(new Boolean()),
  15: R.type(new Number()),
  16: R.type(new String()),
  17: R.type(new Function()),
  18: R.type(new Object()),
  19: R.type(new Array()),
  20: R.type(new Set()),
  21: R.type(new Set()),
  22: R.type(new Map()),
  23: R.type(new WeakSet()),
  24: R.type(new WeakMap()),
  25: R.type(function() {}),
  26: R.type(() => ([], [])),
  27: R.type(async function() {}),
  28: R.type(async () => ([], [])),
  29: R.type(async function* () {}),
  30: R.type(Promise),
  31: R.type(new Promise(r => r(1))),
  32: R.type(Promise.resolve(1)),
  33: R.type(Promise.reject(1).catch(e => e)),
  // 34: R,isEmpty('setTimeout(function () {}, 10);'),
  35: R.type(setTimeout),
  36: R.type(require),
  37: R.type(__dirname),
  38: R.type(console),
  39: R.type(require('ramda')),
  40: R.type(require('fs')),
  41: R.type(module),
  42: R.type((async () => {}).__proto__),
  43: R.type((async () => {}).AsyncFunction)
})
