/** @: Converting node callbacks to Futures, instead of Promises, Futures are lazy */

const Future = require('ramda-fantasy').Future
const R = require('ramda')

const oracledb = {
  getConnection: (credentials, callback) => {
    if (credentials.client !== 'oracledb') return callback('connection failed', null);

    const connection = {
      execute: (sql, params, callback) => {
        if (sql && params) return callback(null, `${sql}-${params}`)
        return callback('oracledb is not a function', null)
      }
    }

    return callback(null, connection)
  }
}

/** @: connect :: Credentials -> Future Error Connection */
const connect = credentials => {
  return Future((reject, resolve) => {
    oracledb.getConnection(
      credentials,
      (err, connection) => err ? reject(err) : resolve(connection)
    )
  })
}

/** @: execute :: Query -> Connection -> Future Error Result */
const execute = R.curry(({ sql, params }, connection) => {
  return Future((reject, resolve) => {
    return connection.execute(
      sql,
      params,
      (err, result) => err ? reject(err) : resolve(result)
    )
  })
})

const query = { sql: `SELECT * FROM TABLE`, params: [] }

const getQueryResultFuture = connect({ client: 'oracledb' })
  .chain(execute(query))

let result;

getQueryResultFuture.fork(
  err => result = err,
  data => result = data
)

console.log({ result })

/****************************************/

oracledb.getConnection({ client: 'oracledb' }, (err, connection) => {
  console.log({ err, connection })
});

oracledb.getConnection({ client: 'postgres' }, (err, connection) => {
  console.log({ err, connection })
});
