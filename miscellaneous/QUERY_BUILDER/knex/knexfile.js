module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      port: 5432
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      port: 5432
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
}
