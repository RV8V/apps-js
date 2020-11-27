'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('model', schema)
