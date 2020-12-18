'use strict'

const Joi = require('@hapi/joi')
//console.log({ types: Joi._types })

// defining schema --- first method
const schema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().required()
})
module.exports = schema

// second method of defining schema -- they are equal
const schema0 = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required()
})

// .messages({ }) -- simple
const schema1 = Joi.object({
  username: Joi.string().required().messages({
    'string.base': 'Invalid type, username must be a string',
    'string.empty': 'Please enter your username'
  }),
  email: Joi.string().required()
})

// examples
