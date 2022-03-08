const { IO, Either, Future } = require('ramda-fantasy');
const { isNil, compose, chain, curry, map, prop } = require('ramda');
const atob = require('atob');

const parse = JSON.parse;

const nth = curry((n, xs) => xs[n]);
const split = curry((splitter, xs) => xs.split(splitter));
const trace = curry((v) => (console.log({ v }), v));

const toEither = curry((left, initial) =>
  isNil(initial) ? Either.Left(left) : Either.of(initial)
);

const returnPassedParamAndMakeSideEffect = curry((f, v) => f(v).map(() => v));

const httpPostFuture = curry((payload) => {
  const validEndpoint = compose(isNil, prop('endpoint'));
  if (validEndpoint(payload)) {
    return Future.reject(new Error(`endpoint is null`));
  }
  return Future.of(payload);
});

const cache = {};

/**
 *
 * @use it instead to save in db
 * @const setTokenIO = (token) => IO(() => token);
 */
const setTokenIO = (token) => IO(() => (cache.token = token));

const toValidEndpoint = curry(
  compose(toEither('endpoint should be not nullable'), prop)
);

const safe = curry((f, value) => {
  try {
    return Either.of(f(value));
  } catch (err) {
    return Either.Left(err);
  }
});

const base64ToJson = compose(safe(parse), atob);
const safeNth = curry(
  compose(toEither('nth element is null or undefined'), nth)
);

const separateJwtToken = compose(safeNth(1), split('.'));

const parseClaims = compose(
  chain(base64ToJson),
  chain(separateJwtToken),
  toEither('value passed to parseClaims was nil')
);

const getTokenAndSaveIO = compose(
  returnPassedParamAndMakeSideEffect(setTokenIO),
  parseClaims,
  prop('token')
);

const authFutureIO = compose(map(getTokenAndSaveIO), httpPostFuture);

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJpY2giLCJyb2xlcyI6WyJFbGVjdHJvbmljVGF4ZXMiLCJUb2JhY2NvVGF4UmF0ZXMiLCJDaWdhcmV0dGVUYXhUYWJsZSJdLCJpYXQiOjE0OTk4MDg2NzJ9.jDADYPbXSr3Y98L_At1NVuBjtogLWEmBCptcwp0JNfI';

const payload = {
  endpoint: '/auth',
  token: jwt,
};

const getToken = (parsedJwt) => parsedJwt;
const logError = (message) => console.log({ err: message });

const eitherLogOrShow = Either.either(logError, getToken);

let token;

authFutureIO(payload).fork(
  (err) => console.log({ err }),
  (io) => {
    const out = io.runIO();
    const ei = eitherLogOrShow(out);
    if (ei) token = ei;
  }
);

console.log({ token });
