'use strict'

process.env.NODE_ENV === 'test'

const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose
      const mockgoose = new Mockgoose(mongoose)
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
            .then((res, err) => {
              if (err) return reject(err)
              resolve()
            })
        })
    } else {
      mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
        .then((res, err) => {
          if (err) return reject(err)
          resolve()
        })
      }
    })
}

const close = () => {
  return mongoose.disconnect()
}

module.exports = { connect, close }
