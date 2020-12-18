'use strict'

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const Websocket = require('websocket').server

const Message = require('./models/message')
const User = require('./models/user')
const RenderController = require('./controllers/render')
const Controller = require('./controllers/posts')
const Helpers = require('./helpers/helper')
 
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/post', RenderController.post)
app.post('/post', Controller.createPost)
app.get('/getPosts', Controller.getPosts)
app.get('/', Controller.chat)

const server = http.createServer(app)

const ws = new Websocket({
  httpServer: server,
  autoAcceptConnections: false
})

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true })

const clients = []

ws.on('request', async req => {
  const connection = req.accept('', req.origin)
  clients.push(connection)
  connection.on('message', message => {
    const dataName = message.type + 'Data'
    const data = message[dataName]
    Helpers.sendData(connection, clients, `${data}`)
  })

  process.on('publish message', async data => {
    const msg = new Message({
      _id: new mongoose.Types.ObjectId(),
      username: data.name,
      content: data.content,
    })
      try {
        const record = await Message.findOne({ content: msg.content })
        if (!record) await msg.save()
        else  {
          if (msg.content !== record.content) await msg.save()
        }
      } catch(err) { return console.log({ err }) }
      Helpers.sendData(connection, clients, `${data.name}: ${data.content}`)
  })
  connection.on('close', (reasonCode, description) => {
    console.log(`Disconnected ${connection.remoteAddress}`)
  })
})

server.listen(8000, () => {
  console.log(`server started on port ${server.address().port}`)
})
