'use strict'

require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('database')

const Controllers = require('/controllers/cont')
const Connection = require('/config/connection')

const app = express()
app.use(express.json())

app.post('/addPost', Controllers.controllerAddUser)
app.get('/posts',  Controllers.authenticateToken, Controllers.controllerDeletePost)

db.connect(Connection.connectServer)
