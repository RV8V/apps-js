'use strict'

process.env.NODE_ENV === 'test'
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const MONGO_URI = process.env.MONGO_URI

const mongoConnect = () => new Promise((resolve, reject) => {
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
        console.log('connected to mongo')
        if (err) return reject(err)
        resolve()
      })
  }
})

const close = () => mongoose.disconnect()

module.exports = { mongoConnect, close }
