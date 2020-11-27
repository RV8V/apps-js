'use strict';

const o = new Map ([
  [ ((field) => field)('field'), 'hello' ],
  [ 'field2', new Object({ field1: 10, field2: '20' }) ],
  [ (fn => fn)('fn'), new Function('a, b', 'return a + b') ],
  [ (function arr(name){return name})('arr'), new Array(1,2,3) ],
  [ ['boolean'], new Boolean(new Set() instanceof Object).valueOf() ],
  //[ (async (n) => {return n})('async').then(console.log), new Promise(resolve => resolve()) ]
])

// Print from the global context of application module
const fn = new Function('a,s', 'return a + s');

// require module fs and util
api.console.log(api.util.inspect(o));

api.console.log('From global context');
require('fs');
require('util');

// exported function
module.exports = () => {
  api.timers.setTimeout(() => api.console.log('From exported timeout'), 1000)
  api.timers.setInterval(() => api.console.log('From exported timeout'), 2000)
}

// usage of timers
api.timers.setTimeout(() => {
  api.console.log('From timer');
}, 1000)

/*
api.times.setTimeout(() => console.log('hello'), 500)
console.log('hello from sandbox context')
modue.exports = {}
const d = () => api.console.log('hello')

*/
