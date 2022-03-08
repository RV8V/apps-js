const { Future, Either, Maybe, IO } = require('ramda-fantasy');
const {
  compose,
  map,
  curry,
  identity,
  chain,
  pipe,
  construct,
  prop,
} = require('ramda');

const trace = (x) => (console.log({ x }), x);

const storage = {
  '#comment': 'comment from storage',
};

// getValue :: Selector -> Task Error (Maybe String)
const getValue = curry(
  (selector, storage) =>
    new Future((reject, resolve) => {
      if (selector) return resolve(new Maybe(storage[selector]));
      return reject(new Error(`selector not passed`));
    })
);

// postComment :: String -> Task Error Comment
const postComment = (string) =>
  new Future((reject, resolve) => {
    if (string) return resolve((storage[string] = string));
    return reject(new Error(`string not passed`));
  });

// validate :: String -> Either ValidationError String
const validate = (string) => {
  if (string) return Either.of(string);
  return Either.Left(new Error(`validation failed`));
};

const either = Either.either;

// saveComment :: () -> Task Error (Maybe (Either ValidationError (Task Error Comment)))
const saveComment = compose(
  map(map(map(postComment))),
  map(map(validate)),
  getValue('#comment')
);

const logFuture = curry((message, response) =>
  console.log({ [message]: `${response}` })
);

saveComment(storage).fork(
  (err) => console.log({ err }),
  (ok) => {
    // const extructFutureFromEither = ok.chain(identity).chain(identity);
    const extructFutureFromEither = chain(chain(identity), ok);

    if (extructFutureFromEither._fork) {
      return extructFutureFromEither.fork(
        logFuture(`[error inside future]`),
        logFuture(`[success]`)
      );
    }

    const isNothing = extructFutureFromEither.getOrElse(true);
  }
);

// console.log({ storage });

/************************************************************ */

// idToMaybe :: Identity a -> Maybe a
const idToMaybe = compose(Maybe.toMaybe, identity);

// idToMaybe :: Identity a -> IO a
const idToIO = IO.of;

// idToMaybe :: Either a -> Future a
const eitherToFuture = either(Future.reject, Future.of);

// ioToTask :: IO a -> Task () a
const ioToFuture = (io) => new Future((reject, resolve) => resolve(io.runIO()));

// maybeToTask :: Maybe a -> Task () a
const maybeToFuture = (maybe) =>
  new Future((reject, resolve) =>
    maybe.isNothing ? reject() : resolve(maybe.chain(identity))
  );

// arrayToMaybe :: [a] -> Maybe a
const arrayToMaybe = pipe(identity, Maybe.toMaybe);

// promiseToTask :: Promise a b -> Task a b
const promiseToFuture = (promise) =>
  new Future((reject, resolve) => promise.then(resolve).catch(reject));

// taskToPromise :: Task a b -> Promise a b
const futureToPromise = (future) =>
  new Promise((resolve, reject) => future.fork(reject, resolve));

console.log({
  idToMaybe: idToMaybe(null),
  idToIO: idToIO(1),
  eitherToFuture: eitherToFuture(Either.Left(1)),
  ioToFuture: ioToFuture(IO.of(1)),
  maybeToFuture: maybeToFuture(new Maybe(null)),
  arrayToMaybe: arrayToMaybe([1, 2]),
});

const x = Promise.resolve('ring');
const xIs = futureToPromise(promiseToFuture(x)) === x;

const y = Future.of('rabbit');
const yIs = promiseToFuture(futureToPromise(y)) === y;

console.log({ x, y, xIs, yIs });

console.log({ maybe: new Maybe(1).chain(identity) });

// const saveComment = compose(
//   map(map(map(postComment))),
//   map(map(validate)),
//   getValue('#comment')
// );

const saveCommentTransformed = compose(
  chain(postComment),
  chain(eitherToFuture),
  map(validate),
  chain(maybeToFuture),
  getValue('#comment')
);

saveCommentTransformed(storage).fork(
  (err) => console.log({ err }),
  (ok) => console.log({ ok })
);

console.log({ storage });

/***********************exercise-a************************ */

// eitherToMaybe :: Either b a -> Maybe a
const eitherToMaybe = either(Maybe.Nothing, Maybe.of);

const noting = construct(Maybe.Nothing);
const just = construct(Maybe.Just);

const eiToMb = either(noting, just);

const err = new Error(`message`);
const value = 1;

console.log({
  eitherToMaybeLeft: eitherToMaybe(Either.Left(err)),
  eiToMbLeft: eiToMb(Either.Left(err)),
  eitherToMaybeRight: eitherToMaybe(Either.Right(value)),
  eiToMbRight: eiToMb(Either.Right(value)),
});

/***********************exercise-b************************ */

const albert = { name: 'albert' };
const gary = { name: 'gary' };
const theresa = { name: 'theresa' };

const findUserById = function findUserById(id) {
  switch (id) {
    case 1:
      return Future.of(Either.of(albert));

    case 2:
      return Future.of(Either.of(gary));

    case 3:
      return Future.of(Either.of(theresa));

    default:
      return Future.of(Either.Left('not found'));
  }
};

// findNameById :: Number -> Task Error (Either Error User)
const findNameById = compose(map(map(prop('name'))), findUserById);
const same = compose(map(prop('name')), chain(eitherToFuture), findUserById);

const log = (message) => console.log({ message });

console.log({ findNameById: findNameById(1).fork(log, log) });
console.log({ same: same(1).fork(log, log) });
