const Client = require('./client.js')

class Sender extends Client {
  async sendTo(queueName, data) {
    await this.connect()

    try {
      await this.channel.sendToQueue(queueName, this.toBuffer(data))
    } catch(err) {
      console.log(`Failed to send a message to queue: ${queueName}`)
      throw err
    }
  }
}

module.exports = Sender
