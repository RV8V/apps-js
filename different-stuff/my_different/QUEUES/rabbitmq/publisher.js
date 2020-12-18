'use strict'

const amqp = require('amqplib')

const object = { number: process.argv[2] }

async function connect() {
  try {
    const connect = await amqp.connect('amqp://localhost:5672')
    const channel = await connect.createChannel()
    const result = await channel.assertQueue('jobs')
    channel.sendToQueue('jobs', Buffer.from(JSON.stringify(object)))
    console.log(`Done job: ${object.number}`)
  } catch(err) { console.log(err) }
}
connect()
