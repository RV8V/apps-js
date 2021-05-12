const Client = require('./client.js')

const { AMQP_QUEUE_NOTIFY_CUSTOMERS, AMQP_QUEUE_GENERATE_REMINDERS } = require('../../config.js')

const setupMessageQueue = async () => {
  const client = Client.getInstance()

  try {
    await client.connect()
  } catch(err) {
    throw err
  }

  await Promise.all([
    client.assertQueue(AMQP_QUEUE_NOTIFY_CUSTOMERS),
    client.assertQueue(AMQP_QUEUE_GENERATE_REMINDERS),
  ])

  console.log('queue is setup')
}

module.exports = setupMessageQueue
