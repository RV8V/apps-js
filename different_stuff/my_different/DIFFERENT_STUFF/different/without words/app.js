'use strict'

const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('./config')
app.use(passport.initialize())
app.use(passport.session())

app.use(session({
  secret: 'session name', // secret word
  store: new FileStore(),  // make a server restart and session can be lost  -- in order to prevent lost of session -- we will use FileStore
  cookie: { path: '/', httpOnly: true, maxAge: 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false
}))

app.listen(3000)
