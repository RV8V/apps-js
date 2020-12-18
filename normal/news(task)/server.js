'use strict'

require('dotenv').config()
require('./src/cron/cronjob')
const http = require('http')
const app = require('./src/app')

const mongodb = require('./src/connection/mongo')
const redisdb = require('./src/connection/redis')

const PORT = process.env.SERVER_PORT
const server = http.createServer(app)

mongodb.mongoConnect().then(
  () => redisdb.redisConnect().then(
    () => server.listen(PORT,
      () => console.log(`Server listening on port ${PORT}`))
  )
)
