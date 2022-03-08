const {
  compose,
  concat,
  identity,
  map,
  curry,
  add,
  construct,
  head,
  append,
  prop,
} = require('ramda');
const Either = require('ramda-fantasy/src/Either');
const Future = require('ramda-fantasy/src/Future');
const IO = require('ramda-fantasy/src/IO');
const fs = require('fs');
const Maybe = require('ramda-fantasy/src/Maybe');

const link = 'https://cdnjs.cloudflare.com/ajax/libs/';

const CDN = (s) => `${link}${s}`;
const cdn = compose(concat(link), identity);

console.log({ CDN: CDN('@ramda-fantasy'), cdn: cdn('@ramda-fantasy') });

/*************************************************** */

const parse = JSON.parse;

// getUrl :: Config -> Either Error Url
const getUrl = (config) => {
  if (config.host) {
    return Either.of(`postgres:///${config.host}`);
  }
  return Either.Left(new Error(`config host can not be null`));
};

// readFile :: String -> String -> Future Error Buffer
const readFile = (name, encoding) =>
  new Future((reject, resolve) => {
    return fs.readFile(name, encoding, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });

// connnect :: ConfString -> IO ConnectionResult
const connect = (connectionString) =>
  IO(() => `connected with success: ${connectionString}`);

// connectToPostgres :: Config -> Either Error IO Url
const connectToPostgres = compose(map(connect), getUrl);

// getConfig :: Json -> Either Error IO Url
const getConfig = compose(connectToPostgres, parse);

// tryToConnect :: Filename -> Encoding -> Future Error Either Error IO ConnectionResult
const tryToConnect = compose(map(getConfig), readFile);

const logErr = curry((message, err) => console.log(`${message} - ${err}`));
const exposeIO = (value) => value.runIO();

const either = Either.either;

// tryToConnect('./confi1g.json', 'utf-8').fork(
//   (err) => console.log({ err }),
//   Either.either(
//     (eitherError) => console.log({ eitherError }),
//     (value) => console.log({ db: value.runIO() })
//   )
// );

tryToConnect('./config.json', 'utf-8').fork(
  logErr('could not open file '),
  either(logErr('error from either: '), compose(console.log, exposeIO))
);

//********************exercise-a****************************** */

const tag = (x) => (console.log({ x }), x);

// incrF :: Functor f => f Int -> f Int
const incrF = undefined;

const maybe = compose(construct(Maybe), identity);

console.log({
  either: maybe(incrF).map(add(1)),
});

console.log({ n: new Maybe(undefined).map(parse) });

//********************exercise-a****************************** */

const safeProp = curry((field, o) => maybe(o[field]));

const user = { id: 2, name: 'Albert', active: true };

// initial :: User -> Maybe String
const initial = undefined;

const init = compose(map(head), safeProp('name'));

console.log({ init: init(user) });

//********************exercise-a****************************** */

// showWelcome :: User -> String
const showWelcome = compose(concat('Welcome '), prop('name'));

// checkActive :: User -> Either String User
const checkActive = (user) => {
  return user.active
    ? Either.of(user)
    : Either.Left('Your account is not active');
};

// eitherWelcome :: User -> Either String String
const eitherWelcome = undefined;

const eiWelcome = compose(map(showWelcome), checkActive);

console.log({ ei: eiWelcome(user) });
