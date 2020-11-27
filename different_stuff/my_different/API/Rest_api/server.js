'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const db = require('./db')

const artistsController = require('./controllers')
console.log({ db })

const app = express()
const url = 'mongodb://localhost/27017/myapi'
//let db

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*let artists = [
  {
    id: 1,
    name: 'Metallica'
  },
  {
    id: 2,
    name: 'Iron Mauden'
  },
  {
    id: 3,
    name: 'Deep Pur'
  }
]
*/
app.get('/', (req, res) => {
  res.send('Hello Api')
})

app.get('/artists', artistsController.all)
app.get('/artists/:id', artistsController.findById)
app.post('/artists', artistsController.create)
app.put('/artists/:id', artistsController.update)
app.put('/artists/:id', artistsController.update)
app.delete('/artists/:id', artistsController.delete)


app.get('/artists', (req, res) => { // all
   db.get().collection('artists').find().toArray((err, documets) => {
    if (err) return console.error(err.name)
    res.send(documets)
  })
   //res.send(artists)
})

app.get('/artists/:id', (req, res) => {
  console.log(req.params)
  const artist = artists.find(function (artist) {
    return artist.id === Number(req.params.id)
  })
  //1. res.send(artist)
//  2. db.get().collection('artists').findOne({ id: ObjectId(req.params.id) }, (err, document) => {
//    if (err) return console.error(err.name)
//    res.sendStatus(res.statusCode)
//   })
})

app.post('/artists', (req, res) => {
  const artist = {
    //id: Date.now(),
    name: req.body.name
  }
  //2. const collection = db.get().collection('artists')
  collection.insert(artist, (err, artist) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(artist)
  }

  // 1. artists.push(artist)
  //res.send(artist)
)

app.put('/artists/:id', artistsController.update. (req,res) => {
   /*const artist = artists.find(function (artist) {
    return artist.id === Number(req.params.id)
  })
  1/ artist.name = req.body.name
  res.sendStatus(res.statusCode)*/
  /*db.get().collection('artists').updateOne({ _id: ObjectId(req.params.id) }, { name: req.body.name }, (err, document) => {
    if (err) return console.error(err.name)
    res.sendStatus(200)
  })
}*/)

/*app.delete('/artists/:id', artistsController.delete)*/
app.delete('/artists/:id', (req, res) => {
  db.get().collection('artists').deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) return console.log(err.name)
    res.sendStatus(200)
  })
})

/*app.listen(3012, () => {
  console.log('Api app started')
})*/


/*MongoClient....db.connect(url, (err, client) => {
  if (err) return console.error(err)

  //db = client.db('myapi')
  app.listen(3012, () => {
    console.log('Api app started')
  })  // in order to prevent our project to start before connection to database
})
*/

db.connect(url, err => {
  if (err) return console.error(err)

  app.listen(3012, () => {
    console.log('Api app started')
  })  // in order to prevent our project to start before connection to database
})
