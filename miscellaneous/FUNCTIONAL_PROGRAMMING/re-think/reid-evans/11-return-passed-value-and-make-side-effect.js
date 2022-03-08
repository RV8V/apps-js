const { IO, Future, Either } = require('ramda-fantasy');
const { curry, compose, prop, map } = require('ramda');

const returnPassedParamAndMakeSideEffect = curry((f, v) => f(v).map(() => v));

const trace = curry((v) => (console.log({ v }), v));

const httpPostFuture = curry((endpoint, body) => {
  return Future.of(body);
});

const cache = {};

const setTokenIO = (token) => IO(() => (cache.token = token));

const getTokenAndSaveIO = compose(
  returnPassedParamAndMakeSideEffect(setTokenIO),
  prop('token')
);
const authFutureIO = compose(map(getTokenAndSaveIO), httpPostFuture('/auth'));

let result;

authFutureIO({ token: 'jwt token' }).fork(
  (err) => console.log({ err }),
  (io) => (result = io.runIO())
);

console.log({ result });
