const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  },
  roles: [
    {
      type: String, ref: 'Role'
    }
  ]
})

module.exports = model('User', UserSchema)
