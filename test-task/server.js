'use strict'

require('dotenv').config()
const express = require('express')
const ServerController = require('./controllers/user')
const PostController = require('./controllers/posts')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/register', ServerController.register)
app.post('/login', ServerController.login)
app.delete('/logout', ServerController.logout)
app.post('/token', ServerController.token)

app.get('/getAllPosts', PostController.getPosts)
app.post('/createPost', PostController.createPost)
app.get('/:postId', PostController.getPostById)

module.exports = app
