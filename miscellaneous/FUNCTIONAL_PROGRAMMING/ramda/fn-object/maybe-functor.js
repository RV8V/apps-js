'use strict'

function Maybe(x) {
  this.x = x
}

Maybe.prototype.map = function(fn) {
  return new Maybe(this.x && fn ? fn(this.x) : null)
}

new Maybe(10).map(x => x + 2).map(console.log)
new Maybe(10).map().map(console.log)
