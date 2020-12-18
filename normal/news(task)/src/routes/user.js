'use strict'

const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.delete('/logout', UserController.logout)
router.post('/token', UserController.token)

module.exports = router
