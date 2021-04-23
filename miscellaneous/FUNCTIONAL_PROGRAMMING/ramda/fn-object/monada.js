'use strict'

const fp = {}

fp.maybe = x => {
  const map = fn => fp.maybe(x && fn ? fn(x) : null)
  map.ap = functor => functor(fn => x && fn ? fn(x) : null)
  map.chain = fnM => fnM(x)
  return map
}

fp.maybe(5)(x => x + 4)(x => x + 1)(console.log)
fp.maybe(5)(x => x + 2).ap(fp.maybe(x => x + 4))(console.log)
fp.maybe(5).chain(x => fp.maybe(x * 2))(console.log)
