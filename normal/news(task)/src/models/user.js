'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
  password: { type: String, required: true },
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserNews'
  },
  favorites: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserFavorites'
  }
})

module.exports = mongoose.model('User', userSchema)
