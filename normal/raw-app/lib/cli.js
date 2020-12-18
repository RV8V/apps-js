const readline = require('readline')
const util = require('util')
const events = require('events')
const process = require('process')
const debug = util.debuglog('cli')

class _events extends events {}
const e = new _events()

const cli = {}

cli.init = function() {
  console.log('\x1b[34m%s\x1b[0m', 'the cli is running')

  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  })
}

module.exports = cli
