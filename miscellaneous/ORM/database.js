const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[environment]
const { Model } = require('objection')
const knex = require('knex')

function setup() {
  const db = knex(config)
  Model.knex(db)
}

module.exports = setup
