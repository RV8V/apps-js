const util = require('util')
const debug = util.debuglog('handlers')

const handlers = {}

handlers.sample = function(data, callback) {
  callback(406, {'name': 'sample handler'})
}

handlers.not_found = function(data, callback) {
  callback(404)
}

module.exports = handlers
