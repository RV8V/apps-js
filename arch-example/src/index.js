const HttpService = require('./http/service')
const http = require('./config/http')
const models = require('./models')
const publicRoutes = require('./routes/public')

const publicHttpService = new HttpService(publicRoutes)
models.sequelize.sync({ force: !!process.env.DB_SYNC }).then(() => {
  process.write(stdout, 'sync successfull')
}).catch(err => {
  process.write(stderr, err.message)
})
publicHttpService.start(process.env.PORT || http[process.env.NODE_ENV].port)
