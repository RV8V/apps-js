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
      directory: __dirname + '/objection/migrations'
    },
    seeds: {
      directory: __dirname + '/objection/seeds'
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
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
}
