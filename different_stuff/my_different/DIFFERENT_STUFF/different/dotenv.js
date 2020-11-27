'use strict'
/*
const dotenv = require('dotenv')
const result = dotenv.config()

console.log({ error: result.error })
console.dir({ dotenv }, { showHidden: true, depth: 20 })
console.log({ parsed: result.parsed })
*/
/*
const host = process.env.DB_HOST // node -r dotenv/config dotenv
const user = process.env.DB_USER
const pass = process.env.DB_PASS
*/

const { DB_HOST, DB_USER, DB_PASS } = process.env // too

// default
const path = require('path')
const route = path.resolve(process.cwd(), '.env')
console.log({ route })

const res = require('dotenv').config({ encoding: 'base64' })
const resToo = require('dotenv').config({ path: process.cwd() + '/.env' }) // we can pass there a path to get data from othe directory
console.log({ res, resToo })

// next
const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)
