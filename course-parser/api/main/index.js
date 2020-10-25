'use strict'

const fetch = require('node-fetch')
const jszip = require('jszip')
const fs = require('fs')

const newZip = new jszip()

const Master = require('../cluster/master.js')
const Helpers = require('../helpers/saving.js')

const show = async () => {
  const data = await fetch('http://api.bestchange.ru/info.zip')
  const buffer = await data.arrayBuffer()
  const { files } = await newZip.loadAsync(buffer)
  const matched = files['bm_rates.dat']
  const string = await matched.async('string')
  Master.start(string)
  process.on('sorted', Helpers.saving)
  process.on('run', () => require('../../server.js'))
}

show()
