const {} = require('ramda-fantasy');

/**
 * @from(to(x)) === x
 * @to(from(y)) === y
 */

const iso = (to, from) => ({
  to,
  from,
});

const chars = iso(
  (s) => s.split(''),
  (a) => a.join('')
);

const result = chars.from(chars.to('hello world'));
const same = chars.to(chars.from(['a', 'b']));

console.log({ result, same });
