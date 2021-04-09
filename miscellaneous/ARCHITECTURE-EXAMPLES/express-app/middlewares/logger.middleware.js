const colors = require('colors')

const logger = (req, res, next) => {
  console.log(colors.bgGreen.black(`request time: ${req.requestTime}`))
  next()
}

module.exports = logger
