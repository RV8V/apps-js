'use strict'

const Helpers = require('./helpers/helper')
const Master = require('./cluster/master')

const fs = require('fs')
const path = require('path')

async function checkStat(files) {
  await Promise.all(files).then(data => data.forEach(async file => {
    try {
      const stat = await Helpers.promisify(fs.stat, [path.join(__dirname, file)])
      if (stat.isDirectory()) {
        const regExp = /uploads/
        const matched = regExp.test(file)
        if (matched) {
          const matchedFolder = file
          const avatars = await Helpers.getItems(matchedFolder)
          const checkedItems = await Helpers.checkItems(matchedFolder, avatars)
          Master.divide(checkedItems)
        }
      }
    } catch(err) { console.log(err) }
  }))
}

function start(folder) {
  try {
    const arrOfFiles = Helpers.getI(folder)
    checkStat(arrOfFiles)
  } catch(err) { console.log(err) }
}

module.exports = { start, checkStat }
