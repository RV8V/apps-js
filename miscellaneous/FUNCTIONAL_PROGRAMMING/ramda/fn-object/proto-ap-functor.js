'use strict'

function MaybeApplicative(x) {
  this.x = x
}

MaybeApplicative.prototype.map = function(fn) {
  const res = this.x && fn ? fn(this.x) : null
  return res instanceof MaybeApplicative ? res : new MaybeApplicative(res)
}

MaybeApplicative.prototype.ap = function(functor) {
  return this.map(x => functor.map(fn => fn(x)))
}

const a = new MaybeApplicative(10)
const f1 = new MaybeApplicative(x => x + 5)
const f2 = new MaybeApplicative(x => x + 2)

a.ap(f1).ap(f2).map(console.log)
