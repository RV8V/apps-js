'use strict'

require('dotenv').config()
const express = require('express')

const renderRoutes = require('./routes/render')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')

app.use('/render', renderRoutes)
app.use('/user', userRoutes)
app.use('/article', articleRoutes)

module.exports = app
