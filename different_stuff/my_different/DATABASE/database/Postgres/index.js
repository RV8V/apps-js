'use strict'

const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'mydb',
  user: 'postgres',
  password: 'gelik2002',
});

const sql = 'SELECT * FROM products WHERE name = $1' // like WHERE name = 'child soap'
pool.query(sql, ['child shampoo'], (err, res) => {
  const { rows } = res
  console.table(rows)
  pool.end()
})
