const express = require('express')
const amqp = require('amqplib')

const app = express()

const AMQP_HOSTNAME = 'localhost'
const AMQP_USERNAME = 'guest'
const AMQP_PASSWORD = 'guest'
const AMQP_PORT = '5672'

const AMQP_URL = `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOSTNAME}:${AMQP_PORT}`;

const connect = async () => {
  try {
    const connection = await amqp.connect(AMQP_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue('rabbit')

    channel.consume('rabbit', data => {
      const receive = JSON.parse(Buffer.from(data.content))
      channel.ack(data)
      console.log({ receive })
    })

    return { connection, channel }
  } catch(err) {
    console.log(err)
  }
}

(async () => {
  await connect()
})()

app.listen(5002, () => {
  console.log(`server at 5002 - consumer`)
})
