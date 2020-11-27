'use strict'

const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/user')
const { loginValidation, registerValidation } = require('../validation')

const ACCESS_TOKEN_SECRET = 'qwertyhgfdsazxcvbn'


router.post('/register', async (req, res) => {  // first step create a user in db
  console.log({ req: req.headers, res: res.headers })
  // VALIDATE THE DATE before we make a user

  /*const validation = schema.validate(req.body)
  console.dir({ body: req.body, validation }, { depth: 10 })
  res.send(validation)*/

  //const { error } = schema.validate(req.body) --- we chamge it by require(./)
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // checking if the user is already in database
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('Email already exists')

  // HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: /*req.body.password*/hashedPassword
  })
  try {
    const saveUser = await user.save()
    res.send(/*saveUser*/{ user: user._id })
  } catch(err) { res.status(400).send(err) }
})

// LOGIN --- second step
router.post('/login', async (req, res) => { // check login and password --- the user has already created!
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  // check email in db
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not found')
  // password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid password')
  //res.send('Logged in')

  // create new access token
  const token = jwt.sign({ _id: user._id }, ACCESS_TOKEN_SECRET)
  res.header('auth-token', token).send(token)

})

module.exports = router

// ++++++++++++++++++++++++++++++++++++++++

// it will be authentication routes
/*
const router = require('express').Router()
const User = require('../model/user')

// Validation
const Joi = require('@hapi/joi')

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {
  // validate the data before we make a user

  /*const validation = schema.validate(req.body)
  console.dir({ body: req.body, validation }, { depth: 10 })
  res.send(validation)*/
/*
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  try {
    const saveUser = await user.save()
    res.send(saveUser)
  } catch(err) { res.status(400).send(err) }
})

module.exports = router
*/
