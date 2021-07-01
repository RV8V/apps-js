'use strict'

const ifInt = number => number % 1 === 0

console.log({ number: ifInt(3), decimal: ifInt(2.3) })
