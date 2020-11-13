const http = require('http')
const https = require('https')
const process = require('process')
const path = require('path')
const url = require('url')
const string_decoder = require('string_decoder')
const fs = require('fs')
const config = require('./config')
const handlers = require('./handlers')
const util = require('util')
const debug = util.debuglog('server')

const server = {}

server.http_server = http.createServer(function(req, res) {
  server.unified_server(req, res)
})

server.https_server_options = {
  'key': fs.readFileSync(path.join(__dirname, '../https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname, '../https/cert.pem'))
}

server.https_server = https.createServer(server.https_server_options, function(req, res) {
  server.unified_server(req, res)
})

server.unified_server = function(req, res) {
  const parsed_url = url.parse(req.url, true)
  const path = parsed_url.pathname
  const trimmed_url = path.replace(/^\/+|\/+$/g, '')
  const query_string = parsed_url.query
  const method = req.method.toLowerCase()
  const headers = req.headers
  const decoder = new string_decoder.StringDecoder('utf8')
  let buffer = ''

  req.on('data', function(data) {
    buffer += decoder.write(data)
  })

  req.on('end', function() {
    buffer += decoder.end()
    const chosen_route = typeof(router[trimmed_url]) !== 'undefined' ? router[trimmed_url] : handlers.not_found

    const data = {
      'trimmed_url': trimmed_url,
      'query_string': query_string,
      'method': method,
      'headers': headers,
      'payload': buffer
    }

    chosen_route(data, function(status_code, payload) {
      status_code = typeof(status_code) === 'number' ? status_code : 200
      payload = typeof(payload) === 'object' ? payload : null
      const payload_string = JSON.stringify(payload)
      res.writeHead(status_code)
      res.end(payload_string + '\n')
      process.stdout.write('returning response: ' + status_code + ' ' + payload_string + '\n')
    })
  })
}

server.router = {
  '': handlers.index,
  'sample': handlers.sample,
  'not_found': handlers.not_found,
  'account/create': handlers.account_create,
  'account/edit': handlers.account_edit,
  'account/delete': handlers.account_delete,
  'account/all': handlers.all,
  'session/delete': handlers.session_delete,
  'ping': handlers.ping,
  'api/token': handlers.api_token,
  'api/users': handlers.api_users,
  'api/checks': handlers.api_checks,
  'favicon': handlers.favicon,
  'public': handlers.public
}

server.init = function() {
  server.http_server.listen(config.http_port, function() {
    console.log('\x1b[36m%s\x1b[0m', '(http): the server is listen on port now')
  })
  server.https_server.listen(config.https_port, function() {
    console.log('\x1b[35m%s\x1b[0m', '(https): the server is listen on port now')
  })
}

module.exports = server
