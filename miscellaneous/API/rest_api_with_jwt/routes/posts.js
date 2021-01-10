'use strict'

const router = require('express').Router()
const verify = require('./verify')

router.get('/', verify, (req, res) => {
  res.json({ posts: { title: 'First post', description: 'random data' } })
})

module.exports = router
