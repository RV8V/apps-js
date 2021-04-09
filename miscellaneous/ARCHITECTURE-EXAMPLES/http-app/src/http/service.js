const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

class HttpService {
  constructor(config, routes) {
    this.app = express()
    this.routes = routes
    this.port = config.port
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(this.routes)
  }

  start() {
    try {
      this.app.listen(this.port, () => console.log(`server started on port ${this.port}`))
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = HttpService
