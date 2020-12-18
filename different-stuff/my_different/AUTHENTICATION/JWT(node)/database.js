'use strict'

const MongoClient = require('mongodb').MongoClient
const state = { db: null }

exports.connect = (url, callback) => {
  if (state.db) return callback()
  MongoClient.connect(url, (err, db) => {
    if (err) return callback(err)
    state.db = db
    return callback()
  })
}

exports.get = () => state.db
