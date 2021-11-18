const Interface = require('../start-patterns/interface-implementation.js')

const DatabaseLayer = Interface('DatabaseLayer', {
  describleState: function() {}
})

class Postgres {
  constructor(config) {
    this.config = config
    this.state = null
  }

  representState() {
    return this.state
  }
}

class MySql {
  constructor(config) {
    this.config = config
    this.state = null
  }

  showState() {
    return this.state
  }
}

class MySqlAdapter {
  constructor(database) {
    this.database = database
  }

  describleState() {
    return this.database.showState()
  }
}

class PostgresAdapter {
  constructor(database) {
    this.database = database
  }

  describleState() {
    return this.database.representState()
  }
}

class Server {
  constructor(database) {
    this.database = database
  }

  getDatabaseState() {
    return this.database.describleState()
  }

  replaceDatabase(database) {
    this.database = database
  }
}

const postgres = new Postgres('config')
const mysql = new MySql('config')

const postgresAdapter = new PostgresAdapter(postgres)
const mySqlAdapter = new MySqlAdapter(mysql)

Interface.implement(postgresAdapter, DatabaseLayer)
Interface.implement(mySqlAdapter, DatabaseLayer)

const server = new Server(postgresAdapter)

server.getDatabaseState()
server.replaceDatabase(mySqlAdapter)
server.getDatabaseState()
