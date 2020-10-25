'use strict'

const Sequelize = require('sequelize')

const connection = new Sequelize('database', 'postgres', 'postgres', {
  dialect: 'postgres'
})

const Page = connection.define('page', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: Sequelize.STRING,
  page: Sequelize.STRING,
}, {
  timestamps: false,
  freezeTableName: true
})

const Category = connection.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  categotyName: Sequelize.STRING,
}, {
  timestamps: false,
  freezeTableName: true
})

Category.hasMany(Page, { onDelete: 'cascade' })

connection.sync({ force: true }).then(function() {
  console.log(`Tables have been created`)
}).catch(function(err) { console.log(err) })

module.exports = { Page, Category }
