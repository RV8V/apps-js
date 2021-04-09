const { Router } = require('express')
const serverService = require('../services/server.service.js')

const router = new Router()

router.get('/api/server', serverService.getAllData)

module.exports = router
