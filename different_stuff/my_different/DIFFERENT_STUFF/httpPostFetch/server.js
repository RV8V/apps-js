'use strict'

const express = require('express')
const app = express()

app.use(express.json({ limit: '1mb' }))
app.use(express.static('public'))

app.post('/api', (req, res) => {
  const { lat, lon } = req.body
  res.json({
    status: 'sucess',
    latitude: lat,
    longitude: lon
  })
})

app.listen(3000)
