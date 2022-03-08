const { flip, curry, compose, uniq, append, pipe } = require('ramda');

const constains = curry((value, list) => list.includes(value));

const users = {
  reid: [],
  jane: [],
  fred: [],
};

const exists = flip(constains)(Object.keys(users));

console.log({ lenght: exists.length, exists: exists('reid1') });
