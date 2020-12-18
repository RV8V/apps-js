'use strict'

const Helpers = require('../helpers/tool.js')

process.on('message', Helpers.workerTask)
