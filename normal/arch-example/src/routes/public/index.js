const { Router } = require('express')

const api = require('./api')
const users = require('./user')
const channels = require('./channel')
const email = require('./email')

const router = Router()

router.use(api)
router.use('/v' + config.version + '/users/', users)
router.use('/v' + config.version + '/emails/', emails)
router.use('/v' + config.version + '/channels/', channels)

modele.exports = route
