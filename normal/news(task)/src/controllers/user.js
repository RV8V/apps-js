'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')

const { findRefreshTokenByUserId, deleteRefreshToken, findRefreshTokenByPayload } = require('../services/refreshtoken')
const { generateAccessToken, generateRefreshToken } = require('../shared/generateToken')

exports.register = async (req, res) => { // decompose on controllers and services for user
  const userByEmail = await User.find({ email: req.body.email }).exec()
  const userByName = await User.find({ name: req.body.name }).exec()
  if (userByEmail.length >= 1) return res.status(409).json({ message: 'Mail exsists' })
  if (userByName.length >= 1) return res.status(409).json({ message: 'Name exsists' })
  bcrypt.hash(req.body.password, +process.env.IV, async (err, hash) => {
    if (err) return res.status(500).json({ error: err })
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    try {
      await user.save()
      res.render('login.ejs')
    } catch (err) { res.status(500).json({ error: err }) }
  })
}

exports.login = (req, res) => {
  User.find({ name: req.body.name }).exec()
    .then(user => {
      if (user.length < 1) return res.status(401).json({ message: 'Auth failed' })
      const { password, email, _id } = user[0]
      bcrypt.compare(req.body.password, password, async (err, result) => {
        if (err) return res.status(401).json({ message: 'Auth failed' })
        if (result) {
          const userData = { email, userId: _id }
          const accessToken = generateAccessToken(userData)
          const refreshTokenPayload = generateRefreshToken(userData)
          const refreshTokenCached = await findRefreshTokenByUserId(_id)
          if (refreshTokenCached) console.log('RefreshToken still exists')
          else {
            const refreshToken = new RefreshToken({
              _id: new mongoose.Types.ObjectId(),
              refresh: _id,
              payload: refreshTokenPayload
            })
            try {
              await refreshToken.save()
            } catch (err) { res.status(500).json({ error: err }) }
          }
          return res.status(200).json({
            message: 'Auth successfull',
            accessToken,
            refreshTokenPayload,
            userId: _id
          })
        }
        res.status(401).json({ message: 'Auth failed' })
      })
    })
    .catch(err => res.status(500).json({ error: err }))
}

exports.logout = async (req, res) => {
  await deleteRefreshToken(req.body.token)
  return res.sendStatus(204)
}

exports.token = async (req, res) => {
  const refreshTokenPayload = req.body.token
  const refreshToken = await findRefreshTokenByPayload(refreshTokenPayload)
  if (!refreshTokenPayload) return res.sendStatus(401)
  if (!refreshToken) return res.sendStatus(403)
  jwt.verify(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken })
  })
}
