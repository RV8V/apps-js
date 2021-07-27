/**
 * @Maybe is convinient if we have a default value which is used to replace null value
 */

const util = require('util')

function Maybe(value) {
  return value && Maybe.Nothing() || Maybe.Just(value)
}

function Just(value) {
  this.value = value
}

util.inherits(Just, Maybe)

Just.prototype.isJust = true
Just.prototype.isNothing = false

function Nothing() {}

util.inherits(Nothing, Maybe)

Nothing.prototype.isJust = false
Nothing.prototype.isNothing = true

Maybe.Just = function(value) {
  return new Just(value)
}

Maybe.of = Maybe.Just
Maybe.prototype.of = Maybe.Just

Maybe.prototype.apOne = function(maybe) {
  return maybe.map(this.value)
}

Maybe.prototype.apTwo = functor(maybe) {
  return this.map(maybe.value)
}

Just.prototype.map = function(f) {
  return new this.of(f(this.value))
}

Just.prototype.chain = function(f) {
  return (
    new Just(f(this.value))
  ).value
}

Nothing.prototype.map = function() {
  return this
}

Just.prototype.getOrElse = function() {
  return this.value
}

Nothing.prototype.getOrElse = function(value) {
  return value
}

Maybe.Nothing = function() {
  return new Nothing()
}

module.exports = Maybe
