'use strict'

const db = require('./db')
const ObjectId = require('mongodb').ObjectId

exports.all = function(callback) {
  db.get().collection('artists').find().toArray(function(err, docs) {
    callback(err, docs)
  })
}

exports.findById = function(id, callback) {
  db.get().collection('artists').findOne({ _id: ObjectId(id) }, (err, document) => {
    callback(err, document)
   })
}

exports.create = function(artist, callback) {
  const collection = db.get().collection('artists')
  collection.insert(artist, (err, result) => {
    /*if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(artist)*/ callback(err, result)
  })
}

exports.update = function(id, newData, callback) {
  db.get().collection('artists').updateOne({ _id: ObjectId(id) }, newData, (err, result) => {
    /*if (err) return console.error(err.name)
    res.sendStatus(200)*/callback(err, result)
  })
}

exports.delete = function(id, callback) {
  db.get().collection('artists').deleteOne({ _id: ObjectId(id) }, (err, result) => {
    callback(err, result)
  })
}
