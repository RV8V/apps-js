const { IO, Either, Maybe } = require('ramda-fantasy')
const R = require('ramda')
const atob = require('atob')

const nth = R.curry((n, xs) => xs[n])
const trace = R.curry((tag, v) => (console.log({ tag, v }), v))

const parse = v => JSON.parse(v)

const safe = R.curry((f, v) => {
  try {
    return Either.of(f(v))
  } catch(err) {
    return Either.Left(err)
  }
})

const toEither = R.curry((left, v) => R.isNil(v) && Either.Left(left) || Either.of(v))

const base64ToJson = R.compose(safe(parse), atob)
const safeNth = R.curry(R.compose(toEither('value with index nth is undefined or null'), nth))

const parsePayload = R.compose(
  R.chain(base64ToJson),
  R.chain(safeNth(1)),
  R.map(R.split('.')),
  toEither('passed value is null or undefined')
)

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJpY2giLCJyb2xlcyI6WyJFbGVjdHJvbmljVGF4ZXMiLCJUb2JhY2NvVGF4UmF0ZXMiLCJDaWdhcmV0dGVUYXhUYWJsZSJdLCJpYXQiOjE0OTk4MDg2NzJ9.jDADYPbXSr3Y98L_At1NVuBjtogLWEmBCptcwp0JNfI'

const jwtIO = IO(() => Either.of(jwt))

const getJwtPayload = R.map(R.chain(parsePayload), jwtIO)

const result = getJwtPayload.runIO()

console.dir({ result }, { depth: 5 })
