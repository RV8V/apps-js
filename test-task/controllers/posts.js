'use strict'

const Message = require('../models/message')

exports.createPost = (req, res) => {
  process.emit('publish message', req.body)
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

exports.getPostById = (req, res, next) => {
  const id = req.params.productId
  Message.findById(id).exec()
     .then(doc => {
       console.log('From database', doc)
       if (doc) {
         res.status(200).json({ product: doc, request: {type: 'GET', description: 'Get post by id'} })
       } else {
         res.status(404).json({ message: 'No valid entry found for provided ID' })
       }
     })
     .catch(err => {
       console.log(err)
       res.status(500).json({ error: err })
     })
}
