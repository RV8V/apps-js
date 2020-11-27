'use strict'

const MongoClient = require('mongodb').MongoClient
const state = {
  db: null
}

exports.connect = function(url, callback) {
  if (state.db) return callback()
  MongoClient.connect(url, function(err, client) {
    if (err) return callback(err)
    state.db = client.db('myapi')
    callback()
  })
}

exports.get = function() {
  return state.db
}
