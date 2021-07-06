const R = require('ramda')

/**
 * @R.clone deep clone objects, without functions
 */

const l = R.bind(console.log, console)

const os = [{}, {}, {}]
const cp = os

l({
  clone: R.clone(os) === os,
  notClonned: os === cp
})
