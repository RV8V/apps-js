'use strict'

const cluster = require('cluster')

if (cluster.isMaster) require('../main.js')
require('./worker.js')
