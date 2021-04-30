const TokenService = require('./token.service.js')
const BcryptService = require('./bcrypt.service.js')
const UserService = require('./user.service.js')
const RoleService = require('./role.service.js')

class AuthService {
  constructor() {
    this.tokenService = new TokenService()
    this.bcryptService = new BcryptService()
    this.userService = new UserService()
    this.roleService = new RoleService()
  }

  async register(payload) {

    console.log('here enter')

    return { message: 'herererer', u: await this.userService.findOneByUserName(payload.username) }

    if (await this.userService.findOneByUserName(payload.username)) {
      return {
        message: 'username already taken'
      }
    }

    const hashedPassword = this.bcryptService.hashSync(payload.password)
    const userRole = await this.roleService.findOneByRole('user')
    const user = await this.userService.create(payload.username, hashedPassword, [userRole.value])
    await this.userService.save(user)

    return {
      message: 'success registration'
    }
  }
}

module.exports = AuthService
