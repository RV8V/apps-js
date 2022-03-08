const atob = require('atob');
const { curry, compose, call, always } = require('ramda');

const parse = JSON.parse;
const split = curry((splitter, xs) => xs.split(splitter));
const nth = curry((n, xs) => xs[n]);

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIn0.eH9qoMvdv12LsZ3Og_K20no8uiBQFuJg6k6A7O8l06U';
const base64 = 'eyJoZWxsbyI6IndvcmxkIn0';

const takeJwtPayload = compose(parse, atob);
const getJwtToken = compose(nth(1), split('.'));
const getJwtClaims2 = compose(takeJwtPayload, getJwtToken);

/*************************************************** */

const arr = ['on', 'next', 'value'];

const getConstant = compose(call, always);

{
  const take = nth(1);
  //   console.log({ take: take(arr) });
}

{
  const take = nth(getConstant(1));
  //   console.log({ take: take(arr) });
}

{
  const take = compose(getConstant, nth);
  const separate = compose(getConstant, split);

  const takeJwtPayload = compose(parse, atob);
  const getJwtToken = compose(take(1), separate('.'));
  const getJwtClaims2 = compose(takeJwtPayload, getJwtToken);

  console.log({ claims: getJwtClaims2(jwt) });
  //   console.log({ take: take(1)(arr), split: separate('.')(jwt) });
}

// console.log({ getJwtToken: getJwtToken.length });
// console.log({ next: getJwtClaims2(jwt) });
