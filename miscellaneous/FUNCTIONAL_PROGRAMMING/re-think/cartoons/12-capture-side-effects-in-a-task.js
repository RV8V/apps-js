const { Future } = require('ramda-fantasy');

const f = Future.of(1)
  .map((x) => x + 1)
  .chain((x) => Future.of(x + 2));

// f.fork(
//   (err) => console.log({ err }),
//   (ok) => console.log({ ok })
// );

/**
 * @example
 */

const launch = () =>
  new Future((reject, resolve) => {
    console.log(`launch app`);
    return resolve('start');
  });

const app = launch().map((message) => '>' + message + '<');

/**
 * @also before run we can extend our computation in(.map, .chain methods)
 * @it useful because if we have some lib code, keep extending things(app)
 * @and composing along and our whole app remains pure(because launch starts it)
 */

app
  .map((str) => str + ' : extend our computation before run')
  .fork(
    (err) => console.log({ err }),
    (ok) => console.log({ ok })
  );
