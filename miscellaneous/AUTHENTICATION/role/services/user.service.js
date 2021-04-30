const UserModel = require('../models/user.model.js')

class UserService {
  constructor() {
    this.userRepository = UserModel
  }

  async getAllUsers() {
    return await this.userRepository.find()
  }

  async findOneByUserName(username) {
    return await this.userRepository.findOne({ username })
  }

  async create(username, password, roles) {
    return new this.userRepository({ username, password, roles })
  }

  async save(userEntity) {
    await userEntity.save()
  }
}

module.exports = UserService
