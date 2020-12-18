import IAppRoute from '../config/route.interface'
import AuthController from '../controller/auth.controller'
import UserController from '../controller/user.controller'
import { Request, Response } from 'express'
import App from '../app'

const UserRoute: IAppRoute = {
  createRoute(router: any) {
    const app = App.getInstance()
    const AuthCont = new AuthController(app)
    const UserCont = new UserController(app)

    return router()
      .use(AuthCont.checkSession)
      .get('/', (req: Request, res: Response) => {
        UserCont.findAll((err: any, data: any) => res.send({ user: data }))
      })
      .post('/add', (req: Request, res: Response) => {
        if (!req.body) res.send({ message: 'Empty body request', code: 400 })
        else {
          UserCont.createUser(
            req.body, (newData: any) => res.send({ userCreated: newData }),
            (message, code) => res.send({ message, code }))
          }
      })
      .post('/login', (req: Request, res: Response) => {
        if (!req.body) res.send({ message: 'Empty body request', code: 400 })
        else AuthCont.login(req, res)
      })
      .get('/logout', AuthCont.logout)
  }
}

export default UserRoute
