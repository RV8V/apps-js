'use strict'

require('dotenv').config()
const Connect = require('../../database')

const saving = async data => {
  try {
    Connect.connect(process.env.MONGO_URL, async (err, db) => {
      if (err) throw err
      const collection = db.collection("collection");
      await collection.insertMany(data)
      console.log('Connected successfully to database')
      console.log('Successfully saved to database')
      process.emit('run')
    })
  } catch (err) { console.error(err) }
}

module.exports = { saving }
