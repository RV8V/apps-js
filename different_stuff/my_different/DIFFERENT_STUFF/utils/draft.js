'use strict'

const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const watermark = require('image-watermark')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    const { fieldname, originalname } = file
    const ext = path.extname(originalname)
    cb(null, `${fieldname}-${Date.now()}${ext}`)
  }
})

const checkFileType = (file, cb) => {
  const { originalname, mimetype } = file
  const filetypes = /png|jpeg/ // Allowed extensions
  console.log({ filetypes })
  const ext = path.extname(originalname)   // Check ext
  const extname = filetypes.test(ext)// Check mimetype

  const mimetypeChecked = filetypes.test(mimetype)
  console.log({ extname, ext, mimetypeChecked })
  if (mimetypeChecked && extname) return cb(null, true)
  return cb(new Error('Images Only!'))
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
  const file = req.file
  console.log({ file })
  if (file) return res.send('File uploaded')
  const error = new Error('Please upload a file')
  console.log({ status: error.httpStatusCode })
  error.httpStatusCode = 404
  return next(error)
})

app.get('/compress', (req, res) => {
  const { filename, mimetype } = req.file
  const ext = filename.split('.')[1]
  console.log({ name: filename, ext: ext })
})

app.listen(3000)





fs.readdir(__dirname, (err, files) => {
  if (err) return console.log(err.name)
  for (const file of files) {
    fs.stat(`${__dirname}/${file}`, (err, stats) => {
      if (err) return console.log(err.name)
      if (stats.isDirectory()) {
        const regExp = /uploads/
        const matched = regExp.test(file)
        console.log({ matched })
        if (matched) {
          const folder = file
          console.log({ folder })

          fs.readdir(folder, async (err, avatars) => {
            console.log({ folders1111: folder })
            for (const avatar of avatars) {
              console.log({ avatar })

              const imagePath = path.resolve(__dirname, 'images', avatar)

              const options = {
                'text' : 'sample watermark',
                'color' : 'rgb(154, 50, 46)',
                'dstPath' : `${imagePath}`
              }

              const files_ = await imagemin([`${folder}/${avatar}`], {
                destination: 'images',
                plugins: [
                  imageminJpegtran(),
                  imageminPngquant({ quality: [0.6, 0.8] })
                ]
              })


              console.log({ imagePath })
              fs.exists(imagePath, (err, res) => {
                watermark.embedWatermark(imagePath, options);

              })

              /*const files_ = await imagemin([`${folder}/${avatar}`], {
                destination: 'images',
                plugins: [
                  imageminJpegtran(),
                  imageminPngquant({ quality: [0.6, 0.8] })
                ]
              })*/
            //  setTimeout(() => console.log({ files_ }), 2000)
            }
          })


        }
      }
    })
  }
})
