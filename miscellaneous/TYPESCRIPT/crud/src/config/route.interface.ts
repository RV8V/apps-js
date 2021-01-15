import { Router } from 'express'

export default interface IAppRoute {
  createRoute(router: any): Router
}
