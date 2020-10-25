'use strict'

require('dotenv').config()
const Courses = require('../services/courses')
const md5 = require('blueimp-md5')

module.exports.getAllCourses = (req, res) => {
  Courses.findAll((err, docs) => {
    if (err) return res.status(500).json({ error: err })
    return res.status(200).json(docs)
  })
}

module.exports.getUniquePair = (req, res) => {
  let { send_currency, receive_currency } = req.params
  const { base64 } = req.headers
  console.log({ send_currency, receive_currency, base64 })
  const concatenated = [send_currency, receive_currency, process.env.IV].join(':')
  const hash = md5(concatenated)
  const base64_server = Buffer.from(hash).toString('base64')
  if (base64_server !== base64) return res.status(200).json({ message: "Access denided: Checksum does not match " })
  const receivedId = Number(send_currency)
  const gottenId = Number(receive_currency)
  Courses.findUniquePair({ receivedId, gottenId }, (err, doc) => {
    console.log(doc)
    if (err) return res.status(500).json({ error: err })
    if (doc.length === 0) return res.status(404).json({ message: "Pair not found try another one" })
    return res.status(200).json(doc)
  })
}
