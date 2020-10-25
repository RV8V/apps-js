'use strict'

require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const ServerController = require('./controllers/user')
const RenderController = require('./controllers/render')
const Middleware = require('./middleware/authentication')

const PORT = process.env.SERVER_PORT

const app = express()
 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')

app.post('/register', ServerController.register)
app.post('/login', ServerController.login)
app.delete('/logout', ServerController.logout)
app.get('/register', RenderController.register)
app.get('/login', RenderController.login)
app.post('/token', ServerController.token)

module.exports = app
