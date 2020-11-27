'use strict'

const express = require('express')
const signUpValidator = require('./validators')
const app = express()

app.use(express.json())

app.post('/signup', signUpValidator, (req, res) => res.send('A @hapi/joi validations tutorial'))

app.listen(5000, () => console.log('Server is started'))

module.exports = app
