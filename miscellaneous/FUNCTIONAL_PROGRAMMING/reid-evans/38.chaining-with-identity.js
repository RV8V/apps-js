const { compose, curry } = require('ramda');
const { Identity } = require('ramda-fantasy');

const addLeft = curry((symbol, string) => symbol + string);
const addRight = curry((symbol, string) => string + symbol);

const addPointFree = compose(addLeft('+'), addRight('*'));

const chainingWithIdentity = (v) =>
  Identity.of(v).map(addLeft('+')).map(addRight('*')).get();

console.log({
  addPointFree: addPointFree('addPointFree'),
  chainingWithIdentity: chainingWithIdentity('chainingWithIdentity'),
});
