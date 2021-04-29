const express = require('express')
const session = require('express-session')
const MongodbSession = require('connect-mongo-session')(session)
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4000
const URL = proccess.env.URL || `mongodb://localhost:27017/sessions`

const OPTIONS = process.env.OPTIONS || {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

const app = express()

mongoose.connect(URL, OPTIONS).then(() => {
  console.log('mongodb connected')
})

const store = new MongodbSession({
  uri: URL,
  collection: 'mySessions'
})

app.use(session({
  secret: 'key that will sign cookie',
  resave: false,
  saveUnitialized: false,
  store: store
}))

app.get('/', (req, res) => {
  console.log({ session: req.session })
  res.send('sessions tutorial')
})

app.listen(PORT, () => console.log('server handles request on ' + PORT))
