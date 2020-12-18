'use strict'

const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Article', articleSchema)
