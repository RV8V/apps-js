'use strict'

fs.readdir(__dirname, (err, files) => {
  if (err) return console.log(err.name)
  for (const file of files) {
    fs.stat(`${__dirname}/${file}`, (err, stats) => {
      if (err) return console.log(err.name)
      if (stats.isDirectory()) {
        const regExp = /uploads/
        const matched = regExp.test(file)
        //console.log({ matched })
        if (matched) {
          const folder = file
          //console.log({ folder })

          fs.readdir(folder, async (err, avatars) => {
            //console.log({ folders1111: folder })
            for (const avatar of avatars) {
              //console.log({ avatar })

              const imagePath = path.resolve(__dirname, 'images', avatar)

              const files_ = compress(folder, avatar)
              addWaterMark(imagePath)

              //console.log({ imagePath })

            }
          })

        }
      }
    })
  }
})


const compress = async (folder, avatar) => {
  const files_ = await imagemin([`${folder}/${avatar}`], {
    destination: 'images',
    plugins: [
      imageminJpegtran(),
      imageminPngquant({ quality: [0.6, 0.8] })
    ]
  })
  return files
}






const checkIfExists = () => {
  return promisify(fs.exists, [imagePath])
}

const addWaterMark = imagePath => {
  const options = {
    'text' : 'sample watermark',
    'color' : 'rgb(154, 50, 46)',
    'dstPath' : `${imagePath}`
  }

  const exists = await CheckIfExists()
  if (!exists) console.log(err.name)
  watermark.embedWatermark(imagePath, options)
  return
}




















const Utils = require('./utils/testing')
const { promisify, getItems, checkItems, readFiles, main } = Utils



fs.readdir(__dirname, (err, files) => {
  if (err) return console.log(err.name)
  for (const file of files) {
    fs.stat(`${__dirname}/${file}`, (err, stats) => {
      if (err) return console.log(err.name)
      if (stats.isDirectory()) {
        const regExp = /uploads/
        const matched = regExp.test(file)
        if (matched) {
          const folder = file

          fs.readdir(folder, async (err, avatars) => {
            for (const avatar of avatars) {

              const imagePath = path.resolve(__dirname, 'images', avatar)
              const files_ = compress(folder, avatar)
              addWaterMark(imagePath)
            }
          })
        }
      }
    })
  }
})


async function main() {
  const arrOfFiles = await checkErrs(__dirname)
  const res = await checkStat(arrOfFiles)
}


const arrOfFiles = await getItems(__dirname)

/*
fs.readdir(__dirname, (err, files) => {
  if (err) return console.log(err.name)

  for (const file of files) {
    const res = await checkStat(files)
  }
})
*/
