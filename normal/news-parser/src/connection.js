'use strict'

const { Page, Category } = require('./sequelize')

const saveToDatabase = async dataset => {
  let counter = 0
  for (let i = 0, { length } = dataset; i < length; i++) {
    counter++
    const { category, page, title } = dataset[i]
    const record = await Category.findOne({ where: { categotyName: category } })
    if (!record) {
      await Category.create({ categotyName: category }).then(res => {
        const categoryId = res.dataValues.id
        Page.create({ title: title, page: page, categoryId: categoryId })
      }).catch(err => console.log(err))
    }
    else {
      await Page.create({ title: title, page: page, item: record.dataValues.id })
    }
    if (counter === dataset.length) process.exit()
  }
}

module.exports = { saveToDatabase }
