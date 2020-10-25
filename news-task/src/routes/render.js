'use strict'

const RenderController = require('../controllers/render')

const express = require('express')
const router = express.Router()

router.get('/register', RenderController.register)
router.get('/login', RenderController.login)

module.exports = router
