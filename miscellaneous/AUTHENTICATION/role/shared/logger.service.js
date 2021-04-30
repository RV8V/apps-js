const path = require('path')
const bunyan = require('bunyan')

class Logger {
  static LEVEL = process.env.NODE_LOGGING_LEVEL || 'info'

  constructor() {
    this.log = bunyan.createLogger({
      name: 'app',
      streams: [
        { level: Logger.LEVEL, stream: process.stdout },
        { level: Logger.LEVEL, path: path.resolve(__dirname, '..', 'logs.json') },
      ]
    })
  }
}

module.exports = Logger
