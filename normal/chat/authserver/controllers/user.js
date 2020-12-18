'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')
const GenerateToken = require('../shared/generateToken')
const Methods = require('../shared/database')

exports.register = async (req, res, next) => {
  const userByEmail = await User.find({ email: req.body.email }).exec()
  const userByName = await User.find({ name: req.body.name }).exec()
  if (userByEmail.length >= 1) return res.status(409/*422*/).json({ message: 'Mail exsists' })
  if (userByName.length >= 1) return res.status(409/*422*/).json({ message: 'Name exsists' })
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) return res.status(500).json({ error: err })
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    try {
      const result = await user.save()
      res.render('login.ejs')
    } catch(err) { res.status(500).json({ error: err }) }
  })
}

exports.login = (req, res, next) => {
  User.find({ name: req.body.name }).exec()
  .then(user => {
    if (user.length < 1) return res.status(401).json({ message: 'Auth failed' })
    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
      if (err) return res.status(401).json({ message: 'Auth failed' })
      if (result) {
        const userData = { email: user[0].email, userId: user[0]._id }
        const accessToken = GenerateToken.generateAccessToken(userData)
        const refreshTokenPayload = GenerateToken.generateRefreshToken(userData)
        const refreshToken = new RefreshToken({
          _id: new mongoose.Types.ObjectId(),
          refresh: user[0]._id,
          payload: refreshTokenPayload
        })
        try { 
          const result = await refreshToken.save()
        } catch(err) { res.status(500).json({ error: err }) }

        return res.status(200).json({ message: 'Auth successfull', accessToken, refreshTokenPayload })
      }
      res.status(401).json({ message: 'Auth failed' })
    })
  })
  .catch(err => res.status(500).json({ error: err }))
}

exports.logout = async (req, res) => {
  const refreshToken = await Methods.deleteRefreshToken(req.body.token)
  return res.sendStatus(204)
}

exports.token = async (req, res) => {
  const refreshTokenPayload = req.body.token
  const refreshToken = await Methods.findRefreshTokenByPayload(refreshTokenPayload)
  if (!refreshTokenPayload) return res.sendStatus(401)
  if (!refreshToken) return res.sendStatus(403)
  jwt.verify(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = GenerateToken.generateAccessToken({ name: user.name })
    res.json({ accessToken })
  })
}
