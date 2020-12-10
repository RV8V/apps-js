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

/*function check(imagePath) {
  return promisify(fs.exists, [imagePath])
}*/
/*
async function checkItems(folder, avatars) {
  const result = await Promise.all(avatars.map(async avatar => {
    console.log({ folder, avatar })
    const imagePath = path.resolve(__dirname, 'images', avatar)
    await compress(folder, avatar)
    addWaterMark(imagePath)
    return
  }))
  return result
}


/*
async function checkItems(folder, avatars) {
  const result = await Promise.all(avatars.map(async avatar => {
    const imagePath = path.resolve(__dirname, 'images', avatar)
    await compress(folder, avatar)
    console.log({ avatars })
    console.log({ imagePath })

    //const fol = path.resolve(__dirname, 'images')

    //const files = await getItems(fol)
    //console.log({ files })
    addWaterMark(imagePath)
    return
  }))
  return result
}
*/





async function checkItems(folder, avatars) {
  const result = await Promise.all(avatars.map(async avatar => {
    const imagePath = path.resolve(__dirname, 'images', avatar)
    return imagePath
  }))
  //console.log({ result })
  return result
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
/*
async function main() {
  try {
    await checkErrs(__dirname)
  } catch(err) { console.log(err.name) }
}
main()
*/













module.exports = { checkErrs, check /*checkItems*/ }
