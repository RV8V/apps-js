const TokenService = require('../services/token.service.js')
const BcryptService = require('../services/bcrypt.service.js')
const UserService = require('../services/user.service.js')
const RoleService = require('../services/role.service.js')
const AuthService = require('../services/auth.service.js')

const validationResult = require('express-validator').validationResult
const jwt = require('jsonwebtoken')

class AuthController {
  constructor() {
    this.tokenService = new TokenService()
    this.authService = new AuthService()
    this.bcryptService = new BcryptService()
    this.userService = new UserService()
    this.roleService = new RoleService()
  }

  async register(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'validation errors', errors
        })
      }

      const { username, password } = req.body

      if (await this.userService.findOneByUserName(username)) {
        return res.status(400).json({
          message: 'username already taken'
        })
      }

      const hashedPassword = this.bcryptService.hashSync(password)
      const userRole = await this.roleService.findOneByRole('user')
      const user = this.userService.create(username, hashedPassword, [userRole.value])
      await user.save()

      res.json({
        message: 'user registrated with success'
      })
    } catch(err) {
      res.status(400).json({
        message: 'registration error'
      })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await this.userService.findOneByUserName(username)

      if (!user) {
        return res.status(400).json({
          message: 'username is not found'
        })
      }

      const validPassword = this.bcryptService.compareSync(password, user.password)

      if (!validPassword) {
        return res.status(400).json({
          message: 'password is not correct'
        })
      }

      const token = this.tokenService.generateAccessToken(user._id, user.roles)
      return res.json({ token })

    } catch(err) {
      res.status(400).json({
        message: 'login error'
      })
    }
  }

  async logout() {}
}

module.exports = AuthController
