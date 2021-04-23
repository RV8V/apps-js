'use strict'

function functor(x) {
  return function(fn) {
    return functor(fn(x))
  }
}

functor(10)(console.log)
functor(2)(x => x + 5)(x => x + 3)(console.log)
