'use strict';

const WebSocketServer = require('ws').Server;
const MongoClient = require('mongodb').MongoClient;
const format = require('util').format;

const wss = new WebSocketServer({ port: 9000 });
const url = 'mongodb://localhost:27017/mydb';

let userListDB, chatDB;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if (err) throw err

  const db = client.db('mydb');
  userListDB = db.collection('users');
  chatDB = db.collection('chat');
})

function existUser(user, callback) {
  userListDB.find({ login: user }).toArray(function(err, list) {
    if (err) throw new Error('sth went wrong')
    callback(list.length !== 0)
  })
}

function checkUser(user, password, callback) {
  existUser(user, function(exist) {
    if (exist) {
      userListDB.find({ login: user }).toArray(function(err, list) {
        callback(list.pop().password === password)
      })
    } else {
      userListDB.insert({ login: user, password: password }, {w: 1}, function(err) {
        if (err) throw err
        callback(true)
      })
    }
  })
}

function broadcast(by, message) {
  const time = new Date().getTime();
  peers.forEach(function(ws) {
    ws.send(JSON.stringify({
      type: 'message',
      message: message,
      from: by,
      time: time
    }))
  })
  chatDB.insert({ message: message, from: by, time: time }, {w: 1}, function(err) {
    if (err) throw err
  })
}

wss.on('connection', function(ws) {
  let login = ''
  let registrated = false
  ws.on('message', function(message) {
    const event = JSON.parse(message)
    if (event.type === 'authorize') {
      checkUser(event.user, event.password, function(success) {
        registrated = success;
        const returning = { type: 'authorize', success: success }
        if (success) {
          returning.online = lpeers
          lpeers.push(event.user)
          peers.push(ws)
          login = event.user

          ws.on('close', function() {
            peers.exterminate(ws)
            lpeers.exterminate(login)
          })
        }
        ws.send(JSON.stringify(returning))
        if (success) sendNewMessage(ws)
        else {
          if (registrated) {
            switch(event.type) {
              case 'message': broadcast(login, event.message); break
              case 'type': break
            }
          }
        }
      })
    }
  })
})

const lppers = []

function sendNewMessage(ws) {
  chatDB.find().toArray(function(error, entries) {
    if (error) throw error
    entries.forEach(function(entry) {
      entry.type = 'message'
      ws.send(JSON.stringify(entry))
    })
  })
}

Array.prototype.exterminate = function(value) {
  this.splice(this.indexOf(value), 1)
}
