const amqp = require('amqplib')

const { AMQP_USERNAME, AMQP_PASSWORD, AMQP_HOSTNAME, AMQP_PORT } = require('../../config.js')

const AMQP_URL = `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOSTNAME}:${AMQP_PORT}`

class Client {
  static getInstance() {
    return new this()
  }

  constructor() {
    this.connection = null
    this.channel = null
    this.url = AMQP_URL
  }

  async connect() {
    if (!this.connection) {
      try {
        this.connection = await amqp.connect(this.url)
      } catch(err) {
        console.log(`Failed to connect via amqp for URL, host: ${AMQP_HOSTNAME}`)
        throw err
      }
    }

    if (!this.channel) {
      try {
        this.channel = await this.connection.createChannel()
      } catch(err) {
        console.log(`Failed to create a channel for the established connection`)
        throw err
      }
    }
  }

  async assertQueue(queue) {
    try {
      await this.channel.assertQueue(queue)
    } catch(err) {
      console.log(`Failed to assert a queue: ${queue}`)
      throw err
    }
  }

  toBuffer(data) {
    return Buffer.from(JSON.stringify(data), 'utf-8');
  }
}

module.exports = Client
