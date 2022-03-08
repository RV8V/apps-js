const mEither = require('./03-my-implementation-of-either');
const nEither = require('./03-another-either-implementation');
const rEither = require('./03-ramda-fantasy');
const { toEither, toEitherSafe } = require('./to-either');

const { Either, Future } = require('ramda-fantasy');
const { compose, map, prop, chain } = require('ramda');

const fs = require('fs');

const parse = JSON.parse;

const getPort = () => {
  try {
    const str = fs.readFileSync('config.json');
    const config = parse(str);
    return config.port;
  } catch (err) {
    return 3000;
  }
};

const result = getPort();
console.log({ result });

/********************************** */

const tag = (x) => (console.log({ x }), x);

const readFile = (name, encoding) =>
  new Future((reject, resolve) => {
    return fs.readFile(name, encoding, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });

{
  const safe = toEitherSafe(Either.Left, Either.Right);
  const safeParse = safe(parse);

  /**
   * @can not convert future to either
   * @because future.fork returns undefined
   *
   * const futureToEither = (future) => {
   *   const t = future.fork(
   *     (err) => Either.Left(err),
   *     (ok) => Either.Right(ok)
   *   );
   *   return t;
   * };
   */

  const getPort = compose(map(map(prop('port'))), map(safeParse), readFile);

  const log = (v) => console.log({ v });

  const either = Either.either;

  const defaultPort = () => 3000;

  const future = getPort('config.json', 'utf-8');
  future.fork(log, either(defaultPort, log));
}

{
  /**
   * @test example
   * const result = safeParse('{"user": "test"}');
   * console.log({ result });
   */
}
