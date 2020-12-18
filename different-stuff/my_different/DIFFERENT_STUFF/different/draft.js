'use strict'

const express = require('express')
const app = express()
console.log(__dirname)
app.use('/hello', express.static(__dirname))

app.get('/', (req, res) => {
  console.log({ port: process.env.PORT })
  res.send('ok')
})

console.log({ port: process.env.PORT, value: process.env.VALUE })
console.log({ base: process.env })

app.listen(3000)
