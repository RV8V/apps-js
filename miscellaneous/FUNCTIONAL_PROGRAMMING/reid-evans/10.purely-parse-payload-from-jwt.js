/** @: Pure code that retrieves a jwt inside of IO */
/** @: and parses out the claims portion of the jwt */

const { IO, Either } = require('ramda-fantasy')
const atob = require('atob')
const R = require('ramda')

const nth = R.curry((n, xs) => xs[n])

const trace = R.curry((tag, v) => (console.log({ tag, v }), v))

/** @: safe :: (a -> b) -> a -> Either Error b */
const safe = R.curry((f, x) => {
  try {
    return Either.of(f(x))
  } catch(e) {
    return Either.Left(e)
  }
})

/** @: toEither :: b -> a? -> Either b a */
const toEither = R.curry((left, x) => R.isNil(x) ? Either.Left(left) : Either.of(x))

/** @: base64ToJson :: string -> Either Error a */
const base64ToJson = R.compose(safe(JSON.parse), atob)

/** @: safeNth :: int -> [a] -> Either string a */
const safeNth = R.curry(R.compose(toEither('nth element does not exist'), nth))

/** @: string -> Either Error Claims */
const parseClaims = R.compose(
  R.chain(base64ToJson),
  R.chain(safeNth(1)),
  R.map(R.split('.')),
  toEither('value passed to parseClaims was nil')
);

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJpY2giLCJyb2xlcyI6WyJFbGVjdHJvbmljVGF4ZXMiLCJUb2JhY2NvVGF4UmF0ZXMiLCJDaWdhcmV0dGVUYXhUYWJsZSJdLCJpYXQiOjE0OTk4MDg2NzJ9.jDADYPbXSr3Y98L_At1NVuBjtogLWEmBCptcwp0JNfI'

/** @: jwtIO :: IO (Either Error string) */
const jwtIO = IO(() => Either.of(jwt))

/** @: Some other inputs to try */
// const jwtIO = IO(() => Either.of(''))
// const jwtIO = IO(() => Either.of('asdf.asdf.asdf'))

/** @: getClaims :: IO (Either Error Claims) */
const getClaims = R.map(R.chain(parseClaims), jwtIO)


/** @: Impure code below */

/** @: result :: Maybe Claims */
const result = getClaims.runIO()

console.dir({ result }, { depth: 5 })
