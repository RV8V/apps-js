'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const Controller = require('./controller/controller')
const Postman = require('./postman/utils.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/upload', Postman.upload.any(), Controller.processPost)
app.listen(3000)
