'use strict'

const mongoose = require('mongoose')

const userFavoritesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  favorites: {
    type: Array,
    default: []
  },
  userId: String
})

module.exports = mongoose.model('UserFavorites', userFavoritesSchema)
