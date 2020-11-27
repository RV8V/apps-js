'use strict';
// server
/*const WebSocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => {
  //res.write(200); res.end('hello from server')
})
server.listen(2000, () => { console.log('listening_____') })

const webServer = new WebSocketServer({ httpServer: server })

webServer.on('request', request => {
  console.log({ request })
  const connection = request.accept(null, request.origin)

  connection.on('connection', message => { console.log('<>') })
  connection.on('close', () => {})
})

// client
var socket = new WebSocket('ws://127.0.0.1:2000');
socket.onopen = function(event) {
  socket.send('Some message'); // Отправка данных на сервер.
};

// Обработка сообщений, отправленных сервером.
socket.onmessage = function(event) {
  var message = event.data;
  console.log(message);
};

//======================
*/


const WebSocketServer = require('websocket').server
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
})
server.listen(2000)
server.on('error', () => {})

const data = fs.readFileSync('./index.html', 'utf8')
const webServer = new WebSocketServer({ httpServer: server })

const clients = [];

webServer.on('request', request => {
  const connection = request.accept(null, request.origin)
  clients.push(connection);

  connection.on('connection', message => {
    if (message === 'exit') connection.close()
    else clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(message)
  })

  connection.send('Begin')
//  connection.on('close', () => {})
  })
})
