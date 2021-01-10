'use strict'

require('dotenv').config()
const util = require('util')
//const debug = util.debug('cli')
const readline = require('readline');
const events = require('events')
class _events extends events{}
const e = new _events()
const os = require('os')

//const s = require('./multicore').start
//console.log(start())

//const config = require('./config/config-file')

// Initialize the CLI module object
const cli = {}

// Handles
e.on('start', str => cli.responders.start())
e.on('stop', str => cli.responders.stop())
e.on('init', str => cli.responders.init())

e.on('help', str => cli.responders.help())
//e.on('stats', str => cli.responders.stats())
e.on('exit', str => cli.responders.exit())

e.on('hello', str => cli.responders.hello())


cli.responders = {}
/*
cli.responders.start = function() {}
cli.responders.stop = function() {}
cli.responders.init = function() {}
*/
cli.responders.start = () => require('./src/cluster/multicore')
cli.responders.stop = () => {}
cli.responders.init = () => {}

cli.responders.hello = () => console.log('hello')


cli.responders.help = function() {
  const com = {
    'start': 'to start files processing',
    'stop': 'use to stop process',
    'init': 'add folder with images to process',
    'help': 'see the list of commands',
    'exit': 'leave the cli alone :)',
    'hello': 'say hello'
  }

  for (const key in com) {
    if (com.hasOwnProperty(key)) {
      const value = com[key]
      let line = '\x1b[33m'+key+'\x1b[0m'
      const padding = 60 - line.length
      for (let i = 0; i < padding; i++) {
        line+=' '
      }
      line += value
      console.log(line)
    }
  }
}

/*
cli.responders.exit = function() {
  console.log('bye')
  process.exit(0)
}
*/
cli.responders.exit = () => {
  console.log('bye')
  process.exit(0)
}

cli.processInput = function(str) {
  str = typeof(str) === 'string' && str.trim().length > 0 ? str.trim() : false
  if (str) {
    const uniqueInputs = ['start', 'stop', 'init', 'help', 'exit', 'stats', 'hello']
    //const { uniqueInputs } = config
    //const uniqueInputs = process.env.COMMANDS
    //console.log(uniqueInputs)
    let matchFound = false
    let counter = 0
    uniqueInputs.some(input => {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true
        e.emit(input, str)
        return true
      }
    })
    if (!matchFound) {
      console.log('Try maybe one more time :)')
    }
  }
}

// Init script
cli.init = function() {
  // Start the interface
  console.log('Enter /help to see the list of commands')
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  _interface.prompt()
  _interface.on('line', str => {
    cli.processInput(str)

   //setTimeout(() => _interface.prompt() ,1000)
   _interface.prompt()
  })

  _interface.on('close',() => {
    console.log('bye')
    process.exit(0)
  })
}

cli.init()

module.exports = cli
