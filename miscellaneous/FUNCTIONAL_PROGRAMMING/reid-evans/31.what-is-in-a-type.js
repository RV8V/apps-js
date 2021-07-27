const { Future, IO } = require('ramda-fantasy')
const { map, prop, pipe, curry } = require('ramda')

const localStorage = {
  setItem: (key, value) => localStorage[key] = value,
  getItem: key => localStorage[key]
}

const setValueToLocalStorageIO = curry((key, value) => IO(() => {
  localStorage[key] = value
  return value
}))

const httpPostFuture = url => Future.of({ token: 'jwt-token' })

const authenticate = pipe(
  httpPostFuture,
  map(prop('token')),
  map(setValueToLocalStorageIO('token-key'))
)

let result;

authenticate('/register').fork(
  err => result = err,
  success => result = success.runIO()
)

console.log({ result, localStorage })
