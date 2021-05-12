const amqp = require('amqplib')
const express = require('express')

const app = express()

const AMQP_HOSTNAME = "localhost"
const AMQP_USERNAME = "guest"
const AMQP_PASSWORD = "guest"
const AMQP_PORT = "5672"

const AMQP_URL = `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOSTNAME}:${AMQP_PORT}`;

const connect = async () => {
  try {
    const connection = await amqp.connect(AMQP_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue('rabbit')
    return { connection, channel }
  } catch(err) {
    console.log(err)
  }
}

(async () => {
  const { connection, channel } = await connect()

  app.get('/send', async (req, res) => {
    const fakedData = {
      name: 'name',
      company: 'company'
    }

    await channel.sendToQueue('rabbit', Buffer.from(JSON.stringify(fakedData)))
    // await channel.close()
    // await connection.close()

    res.send('sent to queue')
  })

  app.listen(5001, () => {
    console.log(`server at 5001 - producer`)
  })
})()
