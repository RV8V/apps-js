'use strict'

const fs = require('fs')
const path = require('path')
const sequelize = require('sequelize')
const basename = path.basename(__filename)
const db = {}

fs.readdir(__dirname).filter(file => {})
Object.keys(db).forEach(model => {})

db.sequelize = sequelize
module.exports = db
