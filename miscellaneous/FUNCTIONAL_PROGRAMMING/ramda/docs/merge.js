const R = require('ramda')

/**
 * Deprecated since v0.26.0
 * @Merge ~ ... ~ Object.assign(target, ...sources) === @MergeRight
 * @MergeLeft reverse to @MergeRight(merge)
 */

const l  = R.bind(ctonsole.log, console)

const o1 = { name: '1n', age: 0n }
const o2 = { city: '1c', age: 1n }

l({
  '-1':  R.merge(o2)(o1),
  0:     R.merge(o1, o2),
  1:     R.merge(o2, o1),
  2:     { o1, o2 },
  3:     { ...o1, ...o2 },
  4:     { ...o2, ...o1 },
  5:     Object.assign({}, o1, o2),
  5:     Object.assign({}, o2, o1),
})
