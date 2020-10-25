'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  name: String,
  type: { type: String, default: 'book' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Book', bookSchema)
