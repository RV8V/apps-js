const UserService = require('../services/user.service.js')

class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async getAllUsers(req, res) {
    res.send(await this.userService.getAllUsers())
  }
}

module.exports = UserController
