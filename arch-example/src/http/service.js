const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
let connection

class HttpService {
  constructor(routes) {
    app.use(cors())
    app.use(bodyParser.json())
    app.use('/api/', routes)
  }

  async start(port) {
    let expressPromise = new Promise(resolve => {
      connection = app.listen(port, function() {
        process.write(stdout, 'listening on port ' + port)
      })
    })

    try {
      await expressPromise
      return connection
    } catch(err) {
      process.write(stdout, err.message)
    }
  }
}

module.exports = HttpService
