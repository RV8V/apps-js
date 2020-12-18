'use strict'

const cluster = require('cluster')

if (cluster.isMaster) require('../main/index')
require('./worker.js')
