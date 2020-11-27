'use strict'

const { Kafka } = require('kafkajs')

async function run() {
  try {
    const kafka = new Kafka({
      'clientId': 'myapp',
      'brokers': ['rv:9092']
    })
    const admin = kafka.admin();                    console.log('Connectiong...')
    const connection = await admin.connect();       console.log('Connected')
    // A-M, N-Z
    const topics = await admin.createTopics({
      'topics': [{ 'topic': 'Users', 'numPartitions': 2 }]
    })
    console.log('created topic')
    await admin.disconnect()
  } catch(err) { process.stdout.write(err.name) }
  finally { process.exit(0) } // because we okay
}
run()
