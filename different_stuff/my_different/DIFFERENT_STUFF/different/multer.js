'use strict'

// example without using disk storage -------------medium--------------------------------
/*const express = require('express')
const multer = require('multer') // multer: diskStorage, MemoryStorage, multerError
console.log({ multer })

const app = express()
const upload = multer({ dest: 'uploads/' })

app.post('/single', upload.single('profile'), (req, res) => {
  try {
    res.send(req.file)
  } catch(error) {
    res.send(400)
  }
})

app.listen(3000, () => console.log('Server started'))

// example 2 with
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './upload')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ dest: storage })

app.post('/bulk', upload.array('profiles', 4), (req, res) => {
  try {
    res.send(req.files)
  } catch(error) {
    res.send(400)
  }
})
 ---------------------------------------------------------------*/

/*const express = require('express')
const multer = require('multer')

const app = express()
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, file.originalname)
})

app.use(multer({ storage: storage }).single('filedata'))

app.post('/upload', (req, res) => {
  const filedata = req.file
  if (!filedata) res.send('Error')
  res.send('Success')
})

app.listen(3000, () => console.log('Server started'))*/

// filtering files ++++++
/*const express = require('express')
const multer = require('multer')

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, file.originalname)
})


// defining filter
const fileFilter = (req, file, cb) => {
  const { mimetype } = file
  if (mimetype === 'image/png' || mimetype === 'image/jpg' || mimetype === 'image/jpeg') cb(null, true)
  cb(null, false)
}

app.use(express.static(__dirname))
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('filedata'))

app.post('/upload', (req, res) => {
  const filedata = req.file
  console.log({ storage })
  filedata ? res.send('Ok') : res.send('Not ok')
})

app.listen(3000, () => console.log('Server started'))*/

// another example github
// https://github.com/expressjs/multer/blob/master/doc/README-ru.md
var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 } ])
//console.log({ cpUpload })

app.post('/cool-profile', cpUpload, (req, res, next) => {
  const { body, files } = req
  console.log({ body, files })
  res.send('ok')
})

app.post('/profile', upload.none(), function (req, res, next) {
  // req.body содержит текстовые поля
  const body = req.body
  console.log({ body })
  res.send('done')
})

const upload_0 = multer().single('avatar')

app.post('/plofile_avatar', (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.log('not ok')
    }
    console.log('ok')
    res.send(':)')
  })
})

app.listen(3000)
