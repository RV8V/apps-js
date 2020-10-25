'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.user_signup = (req, res, next) => { // похожее на /register здесь просто созданм пользователя в базе данних
  User.find({ email: req.body.email }).exec()
    .then(user => {
      if (user.length >= 1) return res.status(409/*422*/).json({ message: 'Mail exsists' })
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err })
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash
        })
        user.save()
          .then(result => {
            console.log(result)
            res.status(201).json({ message: 'User created' })
          })
          .catch(err => res.status(500),json({ error: err }))
      })
    })
}

exports.user_login = (req, res, next) => {// проверка. он уже зареестрирован --- вводит данние для входа (повторного)
  User.find({ email: req.body.email }).exec()
  .then(user => {
    if (user.length < 1) return res.status(401).json({ message: 'Auth failed' })
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) return res.status(401).json({ message: 'Auth failed' })
      if (result) {
        const token = jwt.sign({ email: user[0].email, userId: user[0].userId }, process.env.JWT_KEY, { expiresIn: '1h' })
        return res.status(200).json({ message: 'Auth successfull', token: token })
      }
      res.status(401).json({ message: 'Auth failed' })
    })
  })
  .catch(err => res.status(500),json({ error: err }))
}

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId }).exec()
    .then(result => res.status(200).json({ message: 'User deleted' }))
    .catch(err => res.status(500),json({ error: err }))
}
