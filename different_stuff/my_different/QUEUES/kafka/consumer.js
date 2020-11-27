'use strict'

const { Kafka } = require('kafkajs')

const msg = process.argv[2]

async function run() {
  try {
    const kafka = new Kafka({
      'clientId': 'myapp',
      'brokers': ['rvv:9092']
    })
    const consumer = await kafka.consumer({ 'groupId': 'test' })
    console.log('Connection...')
    const connection = await producer.connect()
    console.log('Connected')
    const subscription = consumer.subscribe({ 'topic': 'Users', 'fromBeginning': true })
    const started = await consumer.run({
      'eachMessage': async result => console.log({ result })
    })
  } catch(err) { console.log(err.name) }
}
