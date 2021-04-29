const { Schema, model } = require('mongoose')

const RoleSchema = new Schema({
  value: {
    type: String,
    unique: true,
    default: 'user'
  }
})

module.exports = model('Role', RoleSchema)
