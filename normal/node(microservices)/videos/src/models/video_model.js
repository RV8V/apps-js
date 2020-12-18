'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema({
  name: String,
  type: { type: String, default: 'video' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema)
