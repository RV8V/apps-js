'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true }
})

module.exports = mongoose.model('Product', productSchema)
