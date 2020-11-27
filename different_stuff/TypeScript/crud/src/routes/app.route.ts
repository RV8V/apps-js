import UserRoute from './user.route'
import { Express, Router } from 'express'
import IRoutePath from '../config/routePath.interface'

export default class AppRoutes {
  private routeList: IRoutePath[] = [
    { path: '/user', router: UserRoute }
  ]

  public mount(expApp: Express) {
    this.routeList.forEach(item => {
      expApp.use(
        item.path,
        item.router.createRoute(Router)
      )
    })
  }
}
