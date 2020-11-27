import UserDataProvider from '../providers/user.provider'
import SecurityService from '../services/security.service'
import App from '../app'
import { Request, Response, NextFunction } from 'express'

export default class AuthController {
  private userDataProvider: UserDataProvider

  constructor(private app: App) {
    this.userDataProvider = this.app.providers.user
  }

  public login(req: Request, res: Response) {
    const { password, email } = req.body
    this.userDataProvider.findOne(email, (err, user) => {
      if (err) return res.sendStatus(500)
      const flag = SecurityService.validatePassword(password, user.password)
      if (!user || !flag) return res.send({ message: 'Incorrect password', code: 400 })
      else {
        user.lastVisit = Date.now().toString()
        this.userDataProvider.update({ _id: user._id }, user, () => {
          console.log('user was updated')
        })
        req.session.userId = user._id
        res.send({ message: 'Hello, welcome back' })
      }
    })
  }

  public logout(req: Request, res: Response) {
    const session = req.session
    if (!session) return res.sendStatus(400)
    else session.destroy(() => res.send({ message: 'Goodbye, see you soon' }))
  }

  public checkSession(req: Request, res: Response, next: NextFunction) {
    const session = req.session
    if(~['/login', '/login'].indexOf(req.path)) {
      if (!session.userId) next()
      else res.sendStatus(406)
    } else {
      if (session.userId) next()
      else res.sendStatus(401)
    }
  }
}
