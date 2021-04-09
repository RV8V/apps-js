const process = require('process')

const development = {
  port: process.env.PORT || 3000,
  timeout: 100000
}

const production = {
  port: process.env.PORT || 4000,
  timeout: 100000
}

module.exports = { development, production }
