const UserService = require('../services/user.service.js')
const LoggerService = require('../shared/logger.service.js')

class UserController {
  constructor() {
    this.userService = new UserService()
    this.loggerService = new LoggerService()
    
    this.getAllUsers = this.getAllUsers.bind(this)
  }

  async getAllUsers(req, res) {
    res.send(await this.userService.getAllUsers())
  }
}

module.exports = UserController
