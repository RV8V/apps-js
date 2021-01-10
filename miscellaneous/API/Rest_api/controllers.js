'use strict'

const Artists = require('./artists')

exports.all = function(req, res) {
  Artists.all(function(err, docs) {
    if (err) return console.log(err.name)
    res.send(docs)
  })
}

exports.findById = function(req, res) {
  Artists.findById(req.params.id, function(err, document) {
    if (err) return console.log(err.name)
    res.send(document)
  })
}

exports.create = function(req, res) {
  const artist = {
    name: req.body.name
  }
  Artists.create(artist, function(err, result) {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(artist)
  })
}

exports.update = function(req, res) {
  Artists.update(req.params.id, { name: req.body.name }, function(err, result) {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(artist)
  })
}

exports.delete = function(req, res) {
  Artists.delete(req.params.id, function(err, result) {
    if (err) return console.log(err.name)
    res.sendStatus(200)
  })
}
