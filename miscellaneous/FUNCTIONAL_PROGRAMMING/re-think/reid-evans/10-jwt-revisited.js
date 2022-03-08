const { IO, Either } = require('ramda-fantasy');
const { isNil, compose, chain, curry, map } = require('ramda');
const atob = require('atob');

{
  //*********************111111111111111111************************* */

  const parse = JSON.parse;

  const nth = curry((n, xs) => xs[n]);
  const split = curry((splitter, xs) => xs.split(splitter));
  const trace = curry((v) => (console.log({ v }), v));

  const safe = curry((f, value) => {
    try {
      return Either.of(f(value));
    } catch (err) {
      return Either.Left(err);
    }
  });

  const toEither = curry((left, initial) =>
    isNil(initial) ? Either.Left(left) : Either.of(initial)
  );

  const base64ToJson = compose(safe(parse), atob);
  const safeNth = curry(
    compose(toEither('nth element is null or undefined'), nth)
  );

  const parseClaims = compose(
    chain(base64ToJson),
    chain(safeNth(1)),
    map(split('.')),
    toEither('value passed to parseClaims was nil')
  );

  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJpY2giLCJyb2xlcyI6WyJFbGVjdHJvbmljVGF4ZXMiLCJUb2JhY2NvVGF4UmF0ZXMiLCJDaWdhcmV0dGVUYXhUYWJsZSJdLCJpYXQiOjE0OTk4MDg2NzJ9.jDADYPbXSr3Y98L_At1NVuBjtogLWEmBCptcwp0JNfI';

  const jwtIO = IO(() => Either.of(jwt));
  const getClaims = map(chain(parseClaims), jwtIO);

  const result = getClaims.runIO();

  //   console.dir({ result }, { depth: 5 });
}

{
  //********************222222222222222************************** */

  const parse = JSON.parse;

  const nth = curry((n, xs) => xs[n]);
  const split = curry((splitter, xs) => xs.split(splitter));
  const trace = curry((v) => (console.log({ v }), v));

  const safe = curry((f, value) => {
    try {
      return Either.of(f(value));
    } catch (err) {
      return Either.Left(err);
    }
  });

  const toEither = curry((left, initial) =>
    isNil(initial) ? Either.Left(left) : Either.of(initial)
  );

  const base64ToJson = compose(safe(parse), atob);
  const safeNth = curry(
    compose(toEither('nth element is null or undefined'), nth)
  );

  const separateJwtToken = compose(safeNth(1), split('.'));

  const parseClaims = compose(
    map(chain(base64ToJson)),
    map(separateJwtToken),
    // map(safeNth(1)),
    // map(split('.')),
    toEither('value passed to parseClaims was nil')
  );

  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJpY2giLCJyb2xlcyI6WyJFbGVjdHJvbmljVGF4ZXMiLCJUb2JhY2NvVGF4UmF0ZXMiLCJDaWdhcmV0dGVUYXhUYWJsZSJdLCJpYXQiOjE0OTk4MDg2NzJ9.jDADYPbXSr3Y98L_At1NVuBjtogLWEmBCptcwp0JNfI';

  const jwtIO = IO(() => Either.of(jwt));
  const getClaims = map(chain(parseClaims), jwtIO);

  const result = getClaims.runIO();

  //   console.dir({ result }, { depth: 5 });
}

{
  //********************33333333333333************************** */

  const parse = JSON.parse;

  const nth = curry((n, xs) => xs[n]);
  const split = curry((splitter, xs) => xs.split(splitter));
  const trace = curry((v) => (console.log({ v }), v));

  const safe = curry((f, value) => {
    try {
      return Either.of(f(value));
    } catch (err) {
      return Either.Left(err);
    }
  });

  const toEither = curry((left, initial) =>
    isNil(initial) ? Either.Left(left) : Either.of(initial)
  );

  const base64ToJson = compose(safe(parse), atob);
  const safeNth = curry(
    compose(toEither('nth element is null or undefined'), nth)
  );

  const parseClaims = compose(
    map(chain(base64ToJson)),
    map(safeNth(1)),
    map(split('.')),
    toEither('value passed to parseClaims was nil')
  );

  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJpY2giLCJyb2xlcyI6WyJFbGVjdHJvbmljVGF4ZXMiLCJUb2JhY2NvVGF4UmF0ZXMiLCJDaWdhcmV0dGVUYXhUYWJsZSJdLCJpYXQiOjE0OTk4MDg2NzJ9.jDADYPbXSr3Y98L_At1NVuBjtogLWEmBCptcwp0JNfI';

  const jwtIO = IO(() => Either.of(jwt));
  const getClaims = map(chain(parseClaims), jwtIO);

  const result = getClaims.runIO();

  //   console.dir({ result }, { depth: 5 });
}

{
  //********************4444444444444************************** */

  const parse = JSON.parse;

  const nth = curry((n, xs) => xs[n]);
  const split = curry((splitter, xs) => xs.split(splitter));
  const trace = curry((v) => (console.log({ v }), v));

  const safe = curry((f, value) => {
    try {
      return Either.of(f(value));
    } catch (err) {
      return Either.Left(err);
    }
  });

  const toEither = curry((left, initial) =>
    isNil(initial) ? Either.Left(left) : Either.of(initial)
  );

  const base64ToJson = compose(safe(parse), atob);
  const safeNth = curry(
    compose(toEither('nth element is null or undefined'), nth)
  );

  const separateJwtToken = compose(safeNth(1), split('.'));

  const parseClaims = compose(
    chain(base64ToJson),
    chain(separateJwtToken),
    // map(safeNth(1)),
    // map(split('.')),
    toEither('value passed to parseClaims was nil')
  );

  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJpY2giLCJyb2xlcyI6WyJFbGVjdHJvbmljVGF4ZXMiLCJUb2JhY2NvVGF4UmF0ZXMiLCJDaWdhcmV0dGVUYXhUYWJsZSJdLCJpYXQiOjE0OTk4MDg2NzJ9.jDADYPbXSr3Y98L_At1NVuBjtogLWEmBCptcwp0JNfI';

  const jwtIO = IO(() => Either.of(jwt));
  const getClaims = map(chain(parseClaims), jwtIO);

  const result = getClaims.runIO();

  console.dir({ result }, { depth: 5 });
}
