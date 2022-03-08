const R = require('ramda');

const match = R.curry((what, s) => s.match(what));
const replace = R.curry((what, replacement, s) => s.replace(what, replacement));
const map = R.curry((f, xs) => xs.map(f));
const filter = R.curry((f, xs) => xs.filter(f));

const matchSymbol = (symbol) => match(symbol);

const filteredBySpecificSymbol = filter(matchSymbol('@'), ['email', '@1']);

console.log({
  matchSymbol: matchSymbol('@')('email@gmail.com'),
  filteredBySpecificSymbol,
});

console.log({ replace: 'what'.replace('w', 'W') });
console.log({ match: 'what'.match('w') });

// Упражнение A
// Проведите рефакторинг и избавьтесь от аргументов, используя частичное применение функции.

const words = (str) => split(' ', str);

const split = R.curry((symbol, str) => str.split(symbol));

const words1 = split(' ');
console.log({ words: words1('hello world') });

// Упражнение B
// Проведите рефакторинг и избавьтесь от всех аргументов путём частичного применения функций.

const filterQs = (xs) => filter((x) => match(/q/i, x), xs);

const filterQaFp = filter(match(/q/i));
console.log({ filterQaFp: filterQaFp(split('', 'qwe')) });

const reduce = R.curry((f, acc, xs) => xs.reduce(f, acc));

const keepHighest = (x, y) => (x >= y ? x : y);

const max = (xs) => reduce((acc, x) => (x >= acc ? x : acc), -Infinity, xs);

console.log({
  max: max([1, 2, 3, 4]),
  m: reduce(keepHighest)(-Infinity)([1, 2, 3, 4]),
});

// console.log({ reduce: reduce((x) => x + 1, 0, [1, 2, 3]) });

// console.log({ test: [1, 2, 3].reduce((acc, value) => acc + value, 0) });
