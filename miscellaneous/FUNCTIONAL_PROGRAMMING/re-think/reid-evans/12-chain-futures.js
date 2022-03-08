const { Future } = require('ramda-fantasy');
const { curry } = require('ramda');

const connect = (params) =>
  new Future((reject, resolve) => {
    if (params.close) return reject(new Error(`connection is closed`));
    return resolve({ ...params, connected: true });
  });

const execute = curry(
  (statement, connection) =>
    new Future((reject, resolve) => {
      if (!statement) return reject(new Error(`statement can not be null`));
      return resolve({ connection, execute: true, statement });
    })
);

const end = (result) =>
  Future.of({
    message: 'make http result but data is not returned, so that we use tee fn',
  });

const options = {
  close: false,
};

const statement = `select distinct from uses;`;

const getExecutedStatement = connect(options)
  .chain(execute(statement))
  .chain(end);
//.chain((res) => end(res).map(() => res));

getExecutedStatement.fork(
  (err) => console.log({ err }),
  (ok) => console.log({ ok })
);
