/** @: Keep the chain going, when a function does not return anythigs in composition */

const { IO, Future, Maybe } = require('ramda-fantasy');
const R = require('ramda');

const trace = R.curry((tag, v) => (console.log({ tag, v }), v));

/** @: httpPostFuture :: String -> a -> Future Error a */
const httpPostFuture = R.curry((endpoint, body) => {
  return Future.of(body);
});

const localStorage = {};

/** @: setIO :: String -> IO() */
const setIO = (token) => IO(() => (localStorage.key = token));

/** @: tee :: Functor f => (a -> f _) -> a -> f a */
/** @: We want to execute passed function and return result wrapped in functor */
const tee = R.curry((f, a) => f(a).map(() => a));

/** @: getTokenAndSaveIO :: a -> IO String */
const getTokenAndSaveIO = R.compose(tee(setIO), R.prop('token'));

/** @: authenticateFutureIO :: login -> Future Error (IO String) */
const authenticateFutureIO = R.compose(
  R.map(getTokenAndSaveIO),
  httpPostFuture('/authenticate')
);

/** @: Impure code */

let result;

authenticateFutureIO({ token: 'jwt token' }).fork(
  (err) => (result = err),
  (io) => (result = io.runIO())
);

console.log({ result, localStorage });

/*************************************/

console.log({
  teeArray: tee(Array, 'arr'),
  teeMaybe: tee(Maybe, 'test'),
});
