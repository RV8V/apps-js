'use strict'

const fs = require('fs')
const index = fs.readFileSync('./index.html', 'utf8')

const Message = require('../models/message')

exports.createPost = (req, res) => {
  process.emit('publish message', req.body)
}
  
exports.chat = (req, res) => {
  res.send(index)
}

exports.getPosts = async (req, res) => {
  const pageSize = 10
  const currentPage = 1
  try {
    const messages = await Message.find()
     .skip(pageSize * currentPage - pageSize)
     .limit(pageSize)
    const numberOfMessages = await Message.countDocuments()
    res.setHeader('max-records', numberOfMessages)
    res.status(200).json(messages)
  } catch(err) {
    res.status(500).json({ message: err })
  }
}
