'use strict'

const mongoose = require('mongoose')

const userNewsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  news: {
    type: Array,
    default: []
  },
  userId: String
})

module.exports = mongoose.model('UserNews', userNewsSchema)
