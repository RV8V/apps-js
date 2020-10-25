'use strict'

exports.sendData = (connection, clients, data) => {
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i]
    if (connection !== client) client.send(data)
  }
} 
