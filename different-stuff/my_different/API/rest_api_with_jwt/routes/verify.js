'use strict'

const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = 'qwertyhgfdsazxcvbn'

module.exports = (req, res, next) => {
  const token = req.header['auth-token']
  if (!token) return res.status(401).send('Access denied')
  try {
    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET)
    req.user = verified
    next()
  } catch(err) { res.status(400).send('Invalid token') }
}
