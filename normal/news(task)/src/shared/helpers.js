'use strict'

const stringify = obj => JSON.stringify(obj)
const toStr = val => val.toString()
const parse = input => JSON.parse(input)

module.exports = { stringify, toStr, parse }
