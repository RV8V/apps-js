// const TokenService = require('../services/token.service.js')
// const BcryptService = require('../services/bcrypt.service.js')
// const UserService = require('../services/user.service.js')
// const RoleService = require('../services/role.service.js')
const AuthService = require('../services/auth.service.js')
const LoggerService = require('../shared/logger.service.js')

const validationResult = require('express-validator').validationResult
const jwt = require('jsonwebtoken')

class AuthController {
  constructor() {
    //this.tokenService = new TokenService()
    this.authService = new AuthService()
    // this.bcryptService = new BcryptService()
    // this.userService = new UserService()
    // this.roleService = new RoleService()
    this.loggerService = new LoggerService()

    this.authService = new AuthService()

    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  async register(req, res) {
    this.loggerService.log.info('/register', { body: req.body })
    
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'validation errors', errors
        })
      }

      const response = await this.authService.register(req.body)

      res.json(response)

    } catch(err) {
      console.log(err)

      res.status(400).json({
        message: 'registration error'
      })
    }
  }

  async login(req, res) {
    this.loggerService.log.info('/login', { body: req.body })

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

  async logout() {
    this.loggerService.log.info('/logout', { body: req.body })
  }
}

module.exports = AuthController
