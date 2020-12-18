'use strict'

const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller')

router.get('/', Controller.getAllCourses)
router.get('/:send_currency/:receive_currency', Controller.getUniquePair)

module.exports = router
