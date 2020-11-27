import UserDataProvider from '../providers/user.provider'
import User from '../entity/user.entity'
import SecurityService from '../services/security.service'
import App from '../app'

export default class UserController {
  private userDataProvider: UserDataProvider

  constructor(private app: App) {
    this.userDataProvider = this.app.providers.user
  }

  public findAll(onLoad: (err: string, data: User[]) => void) {
    this.userDataProvider.select({}, onLoad)
  }

  public findByEmail(email: string, onLoad: (data: User | null) => void, onError: (msg: string, code: number) => void) {
    this.userDataProvider.findOne(email, (err, data) => {
      if (err) onError(err.message, 500)
      else {
        const result = data !== undefined ? data : null
        onLoad(result)
      }
    })
  }

  public createUser(data: any, onCreate: any, onError: (msg: string, code: number) => void) {
    const emailPattern = /^[a-z0-9_-]{4,}\@[-a-a0-9]{3,}\.[a-z]{2,3}$/
    if (!emailPattern.test(data.email) || !data.password.length) onError('Incorrect password or email', 400)
    else {
      this.findByEmail(data.email, result => {
        if (!result) {
          const user = new User()
          user.name = data.name
          user.email = data.email
          user.password = SecurityService.generatePasswordHash(data.password)
          this.userDataProvider.create(user, (err, newData) => {
            if (err) onError(err.message, 500)
            else onCreate(newData)
          })
        }
        else onError('User already exists', 400)
      }, onError)
    }
  }

  public removeById(id: string, onRemove: any) {
    this.userDataProvider.delete({ _id: id }, onRemove)
  }

  public updateById(id: string, newData: User, onUpdata: any) {
    this.userDataProvider.update(id, newData, onUpdata)
  }
}
