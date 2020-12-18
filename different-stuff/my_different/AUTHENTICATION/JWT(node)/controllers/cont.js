'use strict'

const DatabaseService = require('../services/ser')

const generateAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

const generateRefreshToken = user => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

module.exports.controllerLogin = (req, res) => {
  const userName = req.body.userName
  const user = { name: userName }
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  DatabaseService.databaseServiceAdd((err, refreshToken) => err ? res.sendStatus(500) :
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
)
}

module.exports.controllerToken = (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken === null) return res.sendStatus(401)
  DatabaseService.databaseServiceOne(refreshToken, (err, token) => {
    if (err) return res.sendStatus(500)
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })

  })
}

module.exports.controllerDelete = (req, res) => {
  DatabaseService.databaseServiceDelete(req.body.token, (err, token) => {
    if (err) return res.sendStatus(500)
    res.sendStatus(204)
  })
}

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  console.log({ authHeader })
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    console.log('gotten result too, it works')
    next()
  })
}

module.exports.controllerAddUser = (req, res) => {
  const post = req.body
  DatabaseService.databaseServiceAddUser((err, post) => err ? res.sendStatus(500) :
  res.json({ post })
)
}

module.exports.controllerDeletePost = (req, res) => {
  DatabaseService.databaseServiceDeletePost(req.body, (err, userName) => {
    if (err) return res.sendStatus(500)
    res.sendStatus(204)
  })
}
