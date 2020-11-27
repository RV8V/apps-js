'use strict'

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth') // import Routes
const postRouter = require('./routes/posts')

const url = 'mongodb://localhost:27017/restapi' // connect to db

mongoose.connect(url, (err, db) => {
  err ? console.log(err.name) : console.log('connected')
})

// Middleware
app.use(express.json()) // and now we can send post requests

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRouter)

app.listen(3000, () => console.log.bind(console, 'Server up and running')())
