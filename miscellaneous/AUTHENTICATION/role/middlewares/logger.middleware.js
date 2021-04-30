const LoggerService = require('../shared/logger.service.js')

const logger = new LoggerService()

module.exports = (req, res, next) => {
  logger.log.info('Incoming request', { method: req.method })

  logger.log.debug({
    headers: req.headers,
    query: req.query,
    body: req.body
  })

  next()
}
