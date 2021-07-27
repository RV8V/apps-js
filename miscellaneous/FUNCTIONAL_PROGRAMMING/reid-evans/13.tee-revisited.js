/** @: Tee revisited */
/** @: Tee function is Tap */

const Future = require('ramda-fantasy').Future
const R = require('ramda')

/** @: connection :: Connection */
const connection = {
  execute: x => x
}

/** @: connect :: Credentials -> Future Error Connection */
const connect = credentials => Future.of(connection)

/** @: execute :: Query -> Connection -> Future Error Result */
const execute = R.curry((query, connection) => Future.of(connection.execute(query)))

/** @: close :: connection -> Future Error () */
const close = connection => Future.of({})

const executeOne = R.curry((credentials, query) => {
  return connect(credentials)
    .chain(connection => execute(query, connection))
    .chain(result => close(connection).map(() => result))
})

let result;

executeOne('first', 'second')
  .fork(
    err => result = err,
    data => result = data
  );

console.log({ result })
