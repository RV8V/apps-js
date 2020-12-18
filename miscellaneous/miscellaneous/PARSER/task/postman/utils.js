'use strict'

const multer = require('multer')
const path = require('path')

const checkFileType = (file, cb) => {
  const { originalname, mimetype } = file
  const filetypes = /png|jpeg/
  const ext = path.extname(originalname)
  const extname = filetypes.test(ext)
  const mimetypeChecked = filetypes.test(mimetype)
  if (mimetypeChecked && extname) return cb(null, true)
  return cb(new Error('Images Only!'))
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './src/uploads/')
  },
  filename: function(req, file, cb) {
    const { fieldname, originalname } = file
    const ext = path.extname(originalname)
    cb(null, `${fieldname}-${Date.now()}${ext}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

module.exports = { upload }
