const express = require('express')
const router = express.Router()

const api = require('./api.js')
const users = require('./user.js')
const channels = require('./channel.js')

router.use('/api', api)
router.use('/users', users)
router.use('/channels', channels)

module.exports = router
