'use strict'

const { Kafka } = require('kafkajs')

const msg = process.argv[2]

async function run() {
  try {
    const kafka = new Kafka({
      'clientId': 'myapp',
      'brokers': ['rvv:9092']
    })
    const producer = await kafka.producer();             console.log('Connection...')
    const connection = await producer.connect();         console.log('Connected')
    // A-M 0, N-Z 1 - two partitions
    const partition = msg[0] < 'N' ? 0 : 1
    const result = await producer.send({
      'topic': 'Users',
      'messages': [{ 'value': msg, 'partition': partition }]
    })
    await producer.disconnect()
  } catch(err) { console.log(err.name) }
}
