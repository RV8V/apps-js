const server = require('./lib/server')
const workers = require('./lib/workers')
const cli = require('./lib/cli')

const app = {}

app.init = function() {
  server.init()
  workers.init()
}

app.init()

module.exports = app
