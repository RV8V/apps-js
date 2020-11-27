'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const refreshTokenSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  refresh: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  payload: String
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)
 
