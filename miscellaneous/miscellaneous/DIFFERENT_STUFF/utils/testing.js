'use strict'

const fs = require('fs')
const path = require('path')

const promisify = (func, args) => new Promise((resolve, reject) =>
  func.apply(null, [...args, (err, result) =>
    err ? reject(err) : resolve(result)
  ])
)

function getItems(folder = __dirname) {
  return promisify(fs.readdir, [folder])
}

async function checkItems(items = [ 'draft.js', 'fal.js', 'next.js', 'testing.js' ]) {
  const files = await Promise.all(items.map(async file => {
    try {
      const stat = await promisify(fs.stat, [path.join(__dirname, file)])
      if (stat.isFile()) return file
      throw new Error('Not a file!')
    } catch(err) { console.log(err) }
  }))
  return files.filter(elem => elem)
}

function readFiles(files) {
  return Promise.all(files.map(file => {
    return promisify(fs.readFile, [file])
  }))
}

async function main() {
  const items = await getItems()
  const checkedItems = await checkItems(items)
  console.log({ checkedItems })
  return await readFiles(checkedItems)
}

main()
.then(console.log)
.catch(console.error);

module.exports = {
  promisify,
  getItems,
  checkItems,
  readFiles,
  main
}


/*function checkItems(items) {
  return Promise.all(items.map(file => promisify(fs.stat, [path.join(__dirname, file)])
  .then(stat => {
    console.log({ statIno: stat.ino })
    if (stat.isFile()) {
      console.log({ file })
      return file
    }
    throw new Error("Not a file!")
  })
  .catch(console.error)))
  .then(files => {
    console.log({ files })
    return files.filter(file => file)
  })
}*/
