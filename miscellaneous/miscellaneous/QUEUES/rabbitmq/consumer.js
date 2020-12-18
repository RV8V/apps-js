'use strict'

const amqp = require('amqplib')

async function connect() {
  const connection = await amqp.connect('amqp://localhost:5672')
  const channel = await connection.createChannel()
  channel.consume('jobs', message => {
    const input = JSON.parse(message.content.toString())
    if (input.number == 7) channel.ack(message)
  })
}
connect()
