'use strict';

// example 1
/*
const ee = require('./module-exports')
ee.on('ready', data => console.log({ data }))
*/
/*
const func = require('./module-exports')
func()

// example 2
/*
var exports = module.exports = {}
exports.method1 = function() {}

console.log(exports, module.exports) //  { method1: function() {} }, { method1: function() {} }
exports = function() {}

console.log(exports, module.exports) //  function() {}, { method1: function() {} }
*/

/*
//example 3
const fn = require('./module-exports')
console.log(fn.boo.getSerial())
*/

console.log(require('./module-exports'))
