const s1 = require('./singleton.js');
const s2 = require('./singleton.js');

const q1 = require('./common.js');
const q2 = require('./common.js');

q1.set('user-q', 1);
q2.set('user-p', 2);

console.log({ q1: q1.all(), q2: q2.all() })

s1.setValue('user-1', '1');
s2.setValue('user-2', '2');

console.log({ s1, s2 })
