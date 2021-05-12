const express = require('express')

const setupMessageQueue = require('./services/amqp/index.js')
const setupCronJobs = require('./services/jobs.js')

const app = express()

Promise.resolve()
  .then(setupMessageQueue)
  .then(setupCronJobs)
  .then(() => {
    app.listen(5000, () => {
      console.log(`scheduler at 5000`)
    })
  })
