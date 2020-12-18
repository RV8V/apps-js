'use strict'

const MongoClient = require('mongodb').MongoClient
const state = { db: null }

const connect = (url, callback) => {
  if (state.db) return callback()
  MongoClient.connect(url,{ useUnifiedTopology: true }, (err, client) => {
    if (err) return callback(err)
    state.db = client.db("db")
    return callback(null, state.db)
  })
}

module.exports.connect = connect
module.exports.get = () => state.db
