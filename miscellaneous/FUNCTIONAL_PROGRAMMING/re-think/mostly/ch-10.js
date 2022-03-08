const {
  compose,
  construct,
  identity,
  curry,
  chain,
  split,
  last,
  map,
} = require('ramda');
const { Future } = require('ramda-fantasy');

const renderPage = curry(
  (destination, user) => `new page(${destination} - ${user})`
);

const get = (endpoint) => Future.of(`data from endpoint: ${endpoint}`);
const of = Future.of;
const liftA2 = curry((f, v1, v2) => v1.map(f).ap(v2));

const logFuture = curry((message, response) =>
  console.log({ [message]: `${response}` })
);

const page = of(renderPage).ap(get('/destination')).ap(get('/user'));
const same = liftA2(renderPage, get('/destination'), get('/user'));

page.fork(logFuture('[error from future]'), logFuture('[ok from future]'));
same.fork(logFuture('[error from future]'), logFuture('[ok from future]'));
