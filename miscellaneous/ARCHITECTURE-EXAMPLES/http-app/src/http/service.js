const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

class HttpService {
  constructor(config, routes) {
    this.app = express()
    this.routers = routes
    this.port = config.port
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.routers.forEach(route => this.app.use(route))
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
