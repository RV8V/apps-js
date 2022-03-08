const { invoker, add, construct, compose, map } = require('ramda');

const impRange = (n) => Array.from(new Array(n).keys()).map(add(1));

const array = construct(Array);
const keys = invoker(0, 'keys');
const from = Array.from;

const fpRange = compose(map(add(1)), from, keys, array);

module.exports = { impRange, fpRange };
