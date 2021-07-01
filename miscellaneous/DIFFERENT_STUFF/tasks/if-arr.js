'use strict'

const ifArray = arr => {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return true
  } else return false
}

const ifArrayArrow = arr => Object.prototype.toString.call(arr) === '[object Array]'

console.log({
  arr: ifArray([1, 2]),
  obj: ifArray({ a: 'b' })
})
