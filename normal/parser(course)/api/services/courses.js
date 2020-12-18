'use strict'

const db = require('../../database')

module.exports.findUniquePair = (query, callback) =>
  db.get().collection("collection").find(query).toArray((err, result) =>
    callback(err, result)
  )

module.exports.findAll = callback =>
  db.get().collection("collection").find({ }).project({ "_id": 0, "receivedId": 1, "gottenId": 1 }).toArray((err, result) =>
    callback(err, result)
  )
