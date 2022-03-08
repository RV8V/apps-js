const R = require('ramda');

const compose = R.compose;
const reduce = R.curry((f, acc, xs) => xs.reduce(f, acc));

const head = (x) => x[0];
const reverse = reduce((acc, x) => [x].concat(acc), []);
const last = compose(head, reverse);

console.log({ last: last(['jumpkick', 'roundhouse', 'uppercut']) });

{
  const concat = R.curry((a, b) => a.concat(b));
  const append = R.curry((s1, s2) => s2.concat(s1));

  const concatForReverse = R.curry((xs, x) => [x].concat(xs));

  const reverse = reduce(concatForReverse)([]);
  const last = compose(head, reverse);

  console.log({ last: last(['jumpkick', 'roundhouse', 'uppercut']) });
}

const dataset = [
  { username: 'u-1', type: 'user' },
  { username: 'u-2', type: 'admin' },
];

const result = dataset.reduce((acc, value) => {
  return { ...acc, [value.type + value.username]: value.type + value.username };
}, {});

const fn = (x, y) => ({ ...x, [y.type + y.username]: y.type + y.username });

const same = reduce(fn)({})(dataset);

console.log({ result, same });
