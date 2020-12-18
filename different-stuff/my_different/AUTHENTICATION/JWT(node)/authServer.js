'use strict'

require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('./database')

const Controllers = require('/controllers/cont')
const Connection = require('/config/connection')

const app = express()
app.use(express.json())

app.delete('/logout', Controllers.controllerDelete)
app.post('/token', Controllers.controllerToken)
app.post('/login', Controllers.controllerLogin)

db.connect(Connection.connectAuth)
