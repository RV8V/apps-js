'use strict'

require('dotenv').config()
const http = require('http')
const app = require('./server')

const db = require('./index')

const PORT = process.env.SERVER_PORT
const server = http.createServer(app)

db.connect()
  .then(() => {
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  }) 
