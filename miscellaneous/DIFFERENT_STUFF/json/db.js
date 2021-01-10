'use strict'

const mongose = require('mongoose')
module.exports = mongoose.connect(url, (err, db) => {
  err ? console.log(err.name) : console.log('connected')
})
