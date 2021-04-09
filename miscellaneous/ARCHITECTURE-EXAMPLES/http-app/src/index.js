const HttpService = require('./http/service.js')
const config = require('../config/http')
const publicRoutes = require('./routes/index.js')

const httpService = new HttpService(config.development, publicRoutes)
httpService.start()
