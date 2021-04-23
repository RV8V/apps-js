'use strict'

function functorMaybe(x) {
  return function(fn) {
    if (x && fn) {
      return functorMaybe(fn(x))
    } else {
      return functorMaybe(null)
    }
  }
}

functorMaybe(10)()(console.log)
functorMaybe(10)(x => x - 2)(console.log)
