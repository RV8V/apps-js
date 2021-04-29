const bcrypt = require('bcryptjs')

class BcryptService {
  static DEGREE = 7

  constructor() {}

  compareSync(password, userPassword) {
    return bcrypt.compareSync(password, userPassword)
  }

  hashSync(password) {
    return bcrypt.hashSync(password, BcryptService.DEGREE)
  }
}

module.exports = BcryptService
