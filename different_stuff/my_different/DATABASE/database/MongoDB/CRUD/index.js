'use strict';

const http = require('http')
const url = require('url')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const handlers = {}
const database = {}
let db

database.create = (newbie, callback) => {
  db.collection('newbies').insertOne(newbie, (err, result) => {
    if (!err && result) callback(null, result) // it`s a callback from 44-50 -- database.create
    callback(err)
  })
  /*setTimeout(() => {
    callback(null, 'success')
  }, 3000) */
}
database.read = (newbieId, callback) => {
  const id = new ObjectId(newbieId) // and we will have id object -- id
  db.collection('newbies').findOne({ _id: id }, (err, result) => {
    if (!err && result) callback(null, result)
    callback(err)
  })
}

database.update = (newbieId, newbie, callback) => {
  const id = new ObjectId(newbieId) // and we will have id object -- id
  db.collection('newbies').findOneAndUpdate({ _id: id }, newbie, { returnOriginal: false }, (err, result) => {
    if (!err && result) callback(null, result)
    callback(err)
  })
}

database.delete = (newbieId, callback) => {
  const id = new ObjectId(newbieId) // and we will have id object -- id
  db.collection('newbies').findOneAndDelete({ _id: id }, (err, result) => {
    if (!err && result) callback(null, result)
    callback(err)
  })
}

handlers.newbies = (parsedReq, res) => {
  const acceptMethods = ['get', 'post', 'put', 'delete']
  if (acceptMethods.includes(parsedReq.method)) {
    handlers._newbies[parsedReq.method](parsedReq, res)
  } else {
    res.writeHead(400)
    res.end('Not an accepted method...')
  }
}

handlers._newbies = {}

handlers._newbies.get = (parsedReq, res) => {
  //res.end('GET')
  const newbieId = parsedReq.queryStringObject.id // id is actually is _id! -- underscore
  database.read(newbieId, (err, result) => {
    if (!err && result) {
      res.end(JSON.stringify(result))
    } else {
      res.end(err)
    }
  })
}

handlers._newbies.post = (parsedReq, res) => {
  //res.end('POST')
  const newbie = JSON.parse(parsedReq.body)// {} empty object was before (time 58:33)

  database.create(newbie, (err, result) => { // time --- 59:02
    if (!err && result) {
      res.end(JSON.stringify(result.ops[0]))
    } else {
      res.end(err)
    }
  })
}

handlers._newbies.put = (parsedReq, res) => {
  //res.end('PUT')
  const newbie = JSON.parse(parsedReq.body) // {} empty object was before (time 58:33)
  const newbieId = parsedReq.queryStringObject.id

  database.update(newbieId, newbie, (err, result) => { // time --- 59:02
    if (!err && result) {
      res.end(JSON.stringify(result.value))
    } else {
      res.end(err)
    }
  })
}

handlers._newbies.delete = (parsedReq, res) => {
  //res.end('DELETE')
  const newbieId = parsedReq.queryStringObject.id // id is actually is _id! -- underscore
  database.delete(newbieId, (err, result) => {
    if (!err && result) {
      res.end(JSON.stringify(result.value))
    } else {
      res.end(err)
    }
  })
}

handlers.notFound = (parsedReq, res) => {
  res.writeHead(404)
  res.end('Route does not exist...')
}

const router = {
  'newbies': handlers.newbies
}

const server = http.createServer((req, res) => {

  const parsedReq = {}

  parsedReq.parsedUrl = url.parse(req.url)
  parsedReq.path = parsedReq.parsedUrl.pathname
  parsedReq.trimmedPath = parsedReq.path.replace(/^\/+|\+$/g, '')
  parsedReq.method = req.method.toLowerCase()
  parsedReq.headers = req.headers
  parsedReq.queryStringObject = parsedReq.parsedUrl.query

  let body = []

  req.on('data', chunk => body.push(chunk))

  req.on('end', () => {
    body = Buffer.concat(body).toString()
    parsedReq.body = body

    const routeHandler = typeof(router[parsedReq.trimmedPath]) !== undefined ? router[parsedReq.trimmedPath] : handlers.notFound
    routeHandler(parsedReq, res)
    //res.end(parsedReq.body)
  })
})

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) return console.log('Could not connect to MongoDB server\n', err.message)
  console.log.bind(console, 'connected to database...')()
  db = client.db('node_newbies')
})

server.listen(3000, () => console.log('Listening on port 3000'))

/*`
  path: ${parsedReq.path},
  trimmed path: ${parsedReq.trimmedPath},
  method: ${parsedReq.method}
  headers: \n${JSON.stringify(parsedReq.headers, null, 2)}
  query Object: \n${JSON.stringify(parsedReq.queryStringObject, null, 2)}
  `*/
