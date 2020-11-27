'use strict'

const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    validate: [content => content.length < 200, 'Max post length is 200']
  },
  username: { type: String, required: true, match: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/ }
})
 
module.exports = mongoose.model('Message', messageSchema)
