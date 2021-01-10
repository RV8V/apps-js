'use strict'

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 6, max: 255 },
  password: { type: String, required: true, min: 6, max: 1024 },
  email: { type: String, required: true, min: 6, max: 255 },
  data: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
