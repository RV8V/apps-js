const jwt = require('jsonwebtoken')

class TokenService {
  constructor() {}

  generateAccessToken(id, roles) {
    const payload = { id, roles }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRED_TIME
    })
  }
}

module.exports = TokenService
