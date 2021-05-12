const Sender = require('./amqp/sender.js')

const { AMQP_QUEUE_NOTIFY_CUSTOMERS, AMQP_QUEUE_GENERATE_REMINDERS } = require('../config.js')

const sender = Sender.getInstance()

const sendToMessageQueue = async (queueName, data) => {
  try {
    await sender.sendTo(queueName, data)
  } catch(err) {
    console.log(err)
  }
}

const jobHandler = ({ callback, data, jobName }) => {
  return function () {
    console.log(`Job ${jobName} has been executed at ${new Date().toISOString()}`);

    callback(data).catch((err) => {
      console.log(`Failed execution of job ${jobName}`);
      console.log(err);
    });
  };
}

const notifyCustomers = data => sendToMessageQueue(AMQP_QUEUE_NOTIFY_CUSTOMERS, data)
const generateReminders = data => sendToMessageQueue(AMQP_QUEUE_GENERATE_REMINDERS, data)

const setupCronJobs = async () => {
  console.log('Jobs: Scheduled jobs setting up')

  try {
    jobHandler({
      callback: notifyCustomers,
      data: {
          targetTime: 'AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME',
          maxAllowedGapInMins: 'maxAllowedGapInMins',
      },
      jobName: 'notifyCustomers',
    })()

    jobHandler({
      callback: generateReminders,
      data: {
          targetTime: 'AMQP_QUEUE_GENERATE_REMINDERS',
          maxAllowedGapInMins: 'maxAllowedGapInMins',
      },
      jobName: 'generateReminders'
    })()
  } catch(err) {
    console.log(`Failed jobs' setup`);
    console.log(err);
    throw err;
  }

  console.log('Jobs: Scheduled jobs are up');
}

module.exports = setupCronJobs
