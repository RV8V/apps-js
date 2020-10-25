'use strict';

const http = require('http')
const app = require('./app')

console.log('Server...')

const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port)
