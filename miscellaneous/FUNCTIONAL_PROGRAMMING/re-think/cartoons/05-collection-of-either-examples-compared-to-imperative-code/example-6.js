const { Either, toEither } = require('../03-ramda-fantasy');
const { toEitherSafe } = require('../to-either');
const {
  prop,
  compose,
  curry,
  chain,
  call,
  always,
  match,
  map,
} = require('ramda');

const fs = require('fs');

/********************example-6************************* */

const parse = JSON.parse;
const stringify = JSON.stringify;

const postgresRegExp = /postgres/;

const config = {
  url: 'postgres',
};

const conf = stringify(config);
const noConf = stringify(null);

{
  const parseDatabaseUrl = (config) => {
    try {
      const conf = parse(config);

      if (conf.url) {
        return conf.url.match(postgresRegExp);
      }
    } catch (err) {
      return null;
    }
  };

  console.log({ parseDatabaseUrl: parseDatabaseUrl(noConf) });
  console.log({ parseDatabaseUrl: parseDatabaseUrl(conf) });
}

{
  const safe = toEitherSafe(Either.Left, Either.Right);
  const safeParse = safe(parse);
  const eiUrl = curry(compose(toEither(`url is null`), prop));

  const parseDatabaseUrl = compose(
    map(match(postgresRegExp)),
    chain(eiUrl('url')),
    safeParse
  );

  const getConstant = compose(call, always);

  const flow = Either.either(always(null), getConstant);
  const run = compose(flow, parseDatabaseUrl);

  console.log({ fail: run(noConf) });
  console.log({ success: run(conf) });
}
