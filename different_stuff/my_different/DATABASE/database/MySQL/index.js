'use strict'

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'mysql',
  password: 'mysql',
  database: 'database'
})

connection.connect(err => {
  if (err) throw new Error(err)
  console.log('Successfully connected')
})






























//
