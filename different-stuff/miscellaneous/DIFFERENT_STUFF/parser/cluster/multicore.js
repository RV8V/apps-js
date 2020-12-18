'use strict'

const cluster = require('cluster')

if (cluster.isMaster) require('../draft')          //require('./master.js')
require('./worker.js')
