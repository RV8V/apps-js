const R = require('ramda')

/**
 * @Identity Functor
 * @R.either with Functor
 * @R.both   with Functor
 */

const l = R.bind(console.log, console)

const Identity = function(x) {
  this.x = x
}

Identity.prototype.map = function(f) {
  return new Identity(f(this.x))
}

Identity.prototype.ap = function(b) {
  return b.map(f => f(this.x))
}

Identity.prototype.apply = function(b) {
  return new Identity(b.x(this.x))
}

Identity.of = function(x) {
  return new Identity(x)
}

Identity.prototype['fantasy-land/map']   = Identity.prototype.map
Identity.prototype['fantasy-land/ap']    = Identity.prototype.ap
Identity.prototype['fantasy-land/apply'] = Identity.prototype.apply
Identity['fantasy-land/of']              = Identity.of

l({
  box:   new Identity(1),
  map:   new Identity(1)['fantasy-land/map']  (x => x + 2),
  apply: new Identity(1)['fantasy-land/apply'](new Identity(x => x + 2)),
  ap:    new Identity(1)['fantasy-land/ap']   (new Identity(x => x + 2))
})

l({
  eitherTrueFalse:  R.either(Identity.of(true), Identity.of(false)),
  eitherFalseFalse: R.either(Identity.of(false), Identity.of(false)),
  eitherTrueTrue:   R.either(Identity.of(true), Identity.of(true))
})

l({
  bothTrueFalse:  R.both(Identity.of(true), Identity.of(false)),
  bothFalseFalse: R.both(Identity.of(false), Identity.of(false)),
  bothTrueTrue:   R.both(Identity.of(true), Identity.of(true))
})

l({
  either1False:  R.either(Identity.of(1), Identity.of(false)),
  either12:      R.either(Identity.of(1), Identity.of(2)),
  either1True:   R.either(Identity.of(1), Identity.of(true))
})

l({
  both1False:  R.both(Identity.of(1), Identity.of(false)),
  both12:      R.both(Identity.of(1), Identity.of(2)),
  both1True:   R.both(Identity.of(1), Identity.of(true))
})

l({
  'either(x => x + 1)(x => x - 1)': R.either(Identity.of(x => x + 1), Identity.of(x => x - 1)),
  'both(x => x + 1)(x => x - 1)':   R.both(Identity.of((x => x + 1)), Identity.of((x => x - 1))),
})

const eitherX_X_1_X_X_1 = R.either(Identity.of(x => x + 1), Identity.of(x => x - 1))

l({
  eitherX_X_1_X_X_1:   eitherX_X_1_X_X_1.map(f => f(10)),
  eitherX_X_1_X_X_1_1: R.either(Identity.of(x => x + 1), Identity.of(x => x - 1)).map(f => f(10)),
})
