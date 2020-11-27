'use strict'

const schema = require('./schema')
//Synchronous validations
const signUpValidator = (req, res, next) => {
  console.log({ body: req.body }) // object that we pass --- payload -- полезная нагрузка
  const { error } = schema.validate(req.body)
  console.dir({ error }, { showHidden: true, depth: 20 })
  if (error) return res.status(400).json({ error: error.details[0].message })
  next()
}

module.exports = signUpValidator

// next --- Async validations
const signUpValidator0 = async (req, res, next) => {
  try{
    await schema.validateAsync(req.body)
  } catch(error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

// next -- callback -- doest not work
const signUpValidator1 = (req, res,next) => {
  schema.validateAsync(req.body, err => {
    if (err) return res.status(400).json({ error })
    next()
  })
}

// Validating schema by using Joi.assert()
const signUpValidator2 = (req, res,next) => {
  try {
    Joi.assert(req.body, schema)
  } catch(error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

// abortEarly
const signUpValidator3 = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false })
  if (error) return res.status(400).json({ error })
  next()
}
