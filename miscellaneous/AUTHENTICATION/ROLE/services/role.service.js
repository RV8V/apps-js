const RoleModel = require('../models/role.model.js')

class RoleService {
  constructor() {
    this.roleRepository = RoleModel
  }

  async getAllRoles() {
    return await this.roleRepository.find()
  }

  async findOneByRole(role) {
    return await this.roleRepository.findOne({ value: role })
  }
}

module.exports = RoleService
