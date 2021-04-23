'use strict'

function Functor(x) {
  this.x = x
}

Functor.prototype.map = function(fn) {
  return new Functor(fn(this.x))
}

new Functor(10).map(x => x + 4).map(x => x + 1).map(console.log)
