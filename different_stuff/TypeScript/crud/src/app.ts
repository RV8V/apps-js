import ApplicationDataProvider from './providers/appData.provider'
import { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import IAppConfig from './config/app.interface'
import session from 'express-session'
import bodyParser from 'body-parser'
import AppRoutes from './routes/app.route'

export default class App {
  private static app: App
  private expApp: Express

  private config: IAppConfig

  private dataProviders: ApplicationDataProvider

  public static getInstance(): App {
    return App.app
  }

  public get providers(): ApplicationDataProvider {
    return this.dataProviders
  }

  constructor(config: IAppConfig) {
    this.config = config
    this.expApp = express()
    App.app = this
  }

  run(): void {
    this.expApp.use(session({
      resave: false,
      saveUninitialized: false,
      secret: 'secret',
      cookie: { maxAge: 3600000 }
    }))

    this.expApp.use(bodyParser.urlencoded({ extended: false }))
    this.expApp.use((req: Request, res: Response, next: NextFunction) => {
      res.contentType('application/json')
      next()
    })

    this.dataProviders = new ApplicationDataProvider()

    const appRoute = new AppRoutes()
    appRoute.mount(this.expApp)

    this.expApp.listen(this.config.port, (err: any) => {
      if (err) console.log(err)
      else console.log('Server started on port' + this.config.port)
    })
  }
}

























//
