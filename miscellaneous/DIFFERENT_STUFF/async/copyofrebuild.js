'use strict'

const fs = require('fs')
const path = require('path')

const os = require('os')
const cluster = require('cluster')

const Tools = require('./fal')
const { compress, addWaterMark } = Tools

const promisify = (func, args) => new Promise((resolve, reject) =>
  func.apply(null, [...args, (err, result) =>
    err ? reject(err) : resolve(result)
  ])
)

function getItems(folder = __dirname) {
  return promisify(fs.readdir, [folder])
}

function check(imagePath) {
  return promisify(fs.exists, [imagePath])
}

async function checkItems(folder, avatars) {
  const result = await Promise.all(avatars.map(async avatar => {
    const imagePath = path.resolve(__dirname, 'images', avatar)
    await compress(folder, avatar)
    addWaterMark(imagePath)
    return
  }))
  return result
}

function readFiles(files) {
  return Promise.all(files.map(file => {
    return promisify(fs.readFile, [file])
  }))
}

async function checkStat(files) {
  const res = await Promise.all(files.map(async file => {
    try {
      console.log('entered checkStat')
      console.log({ file })
      const p = path.join(__dirname, file)
      console.log({ p })
      const stat = await promisify(fs.stat, [path.join(__dirname, file)])
      if (stat.isDirectory()) {
        const regExp = /uploads/
        console.log({ file })
        const matched = regExp.test(file)
        console.log({ matched })
        if (matched) {
          const matchedFolder = file
          const avatars = await getItems(matchedFolder)
          const checkedItems = await checkItems(matchedFolder, avatars)
        }
      }
    } catch(err) { console.log(err) }
  }))
}

async function checkErrs(folder) {
  try {
    console.log('entered checkErrs')
    const arrOfFiles = await getItems(folder)
    await checkStat(arrOfFiles)
  } catch(err) { console.log(err) }
}

async function main() {
  try {
    await checkErrs(__dirname)
  } catch(err) { console.log(err.name) }
}
main()





// ============================

/*
if (cluster.isMaster) {
  const count = os.cpus().length
  for (let i = 0; i < count; i++) cluster.fork()
} else { main() }
*/



module.exports = { checkErrs, check }
