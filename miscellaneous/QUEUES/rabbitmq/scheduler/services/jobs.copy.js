const { CronJob } = require('cron');

const { always, identity, call, compose, curry } = require('ramda');
const { cast } = require('@fp/common');

const { either } = cast;

const sender = require('./amqp/sender');
const base = require('./amqp/base');
const logger = require('../utils/logger');
const config = require('../config/config.service');
const wrap = require('../utils/wrap');

const AMQP_USERNAME = config.get('AMQP_USERNAME');
const AMQP_PASSWORD = config.get('AMQP_PASSWORD');
const AMQP_HOSTNAME = config.get('AMQP_HOSTNAME');
const AMQP_PORT = config.get('AMQP_PORT');

const AMQP_URL = `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOSTNAME}:${AMQP_PORT}`;
// const QUEUE_NAME = 'sender-queue-name';

const AMQP_QUEUE_NOTIFY_CUSTOMERS = config.get('AMQP_QUEUE_NOTIFY_CUSTOMERS');
const AMQP_QUEUE_GENERATE_REMINDERS = config.get(
  'AMQP_QUEUE_GENERATE_REMINDERS'
);
const AMQP_QUEUE_REQUEST_SETTLEMENTS = config.get(
  'AMQP_QUEUE_REQUEST_SETTLEMENTS'
);
const AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS = config.get(
  'AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS'
);
const AMQP_QUEUE_END_SUBSCRIPTIONS = config.get('AMQP_QUEUE_END_SUBSCRIPTIONS');
const AMQP_QUEUE_UPDATE_PRICE_GROUPS = config.get(
  'AMQP_QUEUE_UPDATE_PRICE_GROUPS'
);
const AMQP_QUEUE_DYNAMIC_EVENT_PATTERN = config.get(
  'AMQP_QUEUE_DYNAMIC_EVENT_PATTERN'
);
const AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME'
);
const AMQP_QUEUE_GENERATE_REMINDERS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_GENERATE_REMINDERS_SCHEDULED_TIME'
);
const AMQP_QUEUE_REQUEST_SETTLEMENTS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_REQUEST_SETTLEMENTS_SCHEDULED_TIME'
);
const AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS_SCHEDULED_TIME'
);
const AMQP_QUEUE_RECURRENT_ORDERS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_RECURRENT_ORDERS_SCHEDULED_TIME'
);
const AMQP_QUEUE_FREQUENCY_PRORATION = config.get(
  'AMQP_QUEUE_FREQUENCY_PRORATION'
);
const AMQP_QUEUE_FREQUENCY_PRORATION_PATTERN = config.get(
  'AMQP_QUEUE_FREQUENCY_PRORATION_PATTERN'
);
const AMQP_QUEUE_LOCK_BANK_DEPOSITS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_LOCK_BANK_DEPOSITS_SCHEDULED_TIME'
);
const AMQP_QUEUE_END_SUBSCRIPTIONS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_END_SUBSCRIPTIONS_SCHEDULED_TIME'
);
const AMQP_QUEUE_UPDATE_PRICE_GROUPS_SCHEDULED_TIME = config.get(
  'AMQP_QUEUE_UPDATE_PRICE_GROUPS_SCHEDULED_TIME'
);
const AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE = config.get(
  'AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE'
);
const AMQP_QUEUE_DAILY_ROUTES_GENERATION = config.get(
  'AMQP_QUEUE_DAILY_ROUTES_GENERATION'
);
const AMQP_QUEUE_DAILY_ROUTES_GENERATION_PATTERN = config.get(
  'AMQP_QUEUE_DAILY_ROUTES_GENERATION_PATTERN'
);
const AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION = config.get(
  'AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION'
);
const AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION_SCHEDULED_TIME =
  config.get(
    'AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION_SCHEDULED_TIME'
  );

// const receiver = client();
// const producer = sender(receiver);

console.log({ sender });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retryOperation =
  ({ delay, retries }) =>
  async (operation, jobName, data) => {
    logger.info(
      `Job ${jobName} has been executed at ${new Date().toISOString()}`
    );

    return operation(data).catch(async (reason) => {
      logger.error(
        `Job ${jobName} has been failed with reason: ${reason.message}`
      );

      if (retries > 0) {
        await wait(delay);
        return retryOperation(operation, { delay, retries: retries - 1 });
      }
      logger.warn(
        `Job ${jobName} is stopped since exceeded maxFailuresCount ${retries}`
      );
      throw reason;
    });
  };

// const retryOperation = async (operation, { delay, retries }) => {
//   return operation().catch(async (reason) => {
//     if (retries > 0) {
//       await wait(delay);
//       return retryOperation(operation, { delay, retries: retries - 1 });
//     }
//     throw reason;
//   });
// };

const job =
  (failsCounter, maxFailuresCount) => (callback, jobName, data) => () => {
    logger.info(
      `Job ${jobName} has been executed at ${new Date().toISOString()}`
    );
  };

const jobHandler = function ({
  callback,
  data,
  jobName,
  failsCounter,
  maxFailuresCount,
}) {
  return function () {
    logger.info(
      `Job ${jobName} has been executed at ${new Date().toISOString()}`
    );

    failsCounter[jobName] ?? (failsCounter[jobName] = 0);
    if (failsCounter[jobName] < maxFailuresCount) {
      callback(data).catch((err) => {
        logger.error(`Failed execution of job ${jobName}`);
        logger.error(err);
        failsCounter[jobName]++;
      });
    } else {
      logger.warn(
        `ATTENTION: Job ${jobName} is stopped since exceeded maxFailuresCount ${maxFailuresCount}`
      );
      this.stop();
    }
  };
};

const DEFAULT_TIME_ZONE = 'UTC';
const EMPTY_MESSAGE = {};

// const sendToMq =
//   (sender) =>
//   async (queueName, data = EMPTY_MESSAGE) => {
//     try {
//       await sender.sendTo(queueName, data);
//     } catch (error) {
//       logger.error(error);
//     }
//   };

// const sendToMq =
//   (sender) =>
//   async (queue, data = EMPTY_MESSAGE) => {
//     try {
//       await publisher.chain(always(pFns.sendToQueue(queue, data)));
//     } catch (error) {
//       logger.error(error);
//     }
//   };

const log = (message, key) => async (either) =>
  logger[key](`${message} - ${(await either).chain(identity)}`);

// const sendToMq = (sender, pFns) =>
//   curry(async (queue, data = EMPTY_MESSAGE) => {
//     console.log({ queue, data });

//     const publisherEither = await sender.map(
//       always(pFns.sendToQueue(queue, data)),
//     );
//     return either(
//       log(`either left, could not send message ${queue}`, 'error'),
//       log(`either right, managed to send to queue: ${queue}`, 'info'),
//       publisherEither,
//     );
//   });

const sendToMq =
  (sender, pFns) =>
  (queue) =>
  async (data = EMPTY_MESSAGE) => {
    const publisherEither = await sender.map(
      always(pFns.sendToQueue(queue, data))
    );
    return either(
      log(`either left, could not send message ${queue}`, 'error'),
      log(`either right, managed to send to queue: ${queue}`, 'info'),
      publisherEither
    );
  };

// const sendToMq =
//   (sender, pFns) =>
//   async (queue, data = EMPTY_MESSAGE) => {
//     const publisherEither = await sender.map(
//       always(pFns.sendToQueue(queue, data)),
//     );
//     return either(
//       log(`either left, could not send message ${queue}`, 'error'),
//       log(`either right, managed to send to queue: ${queue}`, 'info'),
//       publisherEither,
//     );
//   };

// const mqSender = MqSender.getInstance();

// const setupQueues = async () => {
//   const inst = base();
//   const iFns = inst.chain(identity);

//   await inst.chain(always(iFns.connect(AMQP_URL)));
//   await inst.chain(always(iFns.createChannel()));
//   // await inst.chain(
//   //   always(
//   //     iFns.assertQueue(AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION),
//   //   ),
//   // );

//   const publisher = sender(inst);
//   const pFns = publisher.chain(identity);

//   const send = sendToMq(publisher, pFns);

//   const notifyCustomers = (data) => send(AMQP_QUEUE_NOTIFY_CUSTOMERS, data);
// };

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const retryOperation = async (operation, { delay, retries }) => {
//   return operation().catch(async (reason) => {
//     if (retries > 0) {
//       await wait(delay);
//       return retryOperation(operation, { delay, retries: retries - 1 });
//     }
//     throw reason;
//   });
// };

const resolvePuslisher = async () => {
  const inst = base();
  const iFns = inst.chain(identity);

  await inst.chain(always(iFns.connect(AMQP_URL)));
  await inst.chain(always(iFns.createChannel()));

  const publisher = sender(inst);
  const pFns = publisher.chain(identity);

  return sendToMq(publisher, pFns);
  // const notifyCustomers = (data) => send(AMQP_QUEUE_NOTIFY_CUSTOMERS, data);
  // const generateReminders = (data) => send(AMQP_QUEUE_GENERATE_REMINDERS, data);
};

const setupJobs = async () => {
  // await sender.send('AMQP_QUEUE_NOTIFY_CUSTOMERS', 'hello world');
  // const message = await sender.consume('AMQP_QUEUE_NOTIFY_CUSTOMERS');
  //   await sender.disconnect();

  // const inst = base();
  // const iFns = inst.chain(identity);

  // await inst.chain(always(iFns.connect(AMQP_URL)));
  // await inst.chain(always(iFns.createChannel()));
  // await inst.chain(
  //   always(
  //     iFns.assertQueue(AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION),
  //   ),
  // );

  // const send = await resolvePuslisher();

  const send = await resolvePuslisher();

  // const publisher = sender(inst);
  // const pFns = publisher.chain(identity);

  // const send = sendToMq(publisher, pFns);

  const toBuffer = compose(Buffer.from, JSON.stringify);
  const apQueue = (queue) => send(queue);

  // const saveQueueName = (queue) => ({ [queue]: apQueue(queue) });
  // const composeBuffer = (record) => ({
  //   ...record,
  //   [record.queue]: compose(record.queue, toBuffer),
  // });
  // const composeBuffer = (record) => ({
  //   // ...record,
  //   [Object.keys(record).pop()]: compose(record.queue, toBuffer),
  // });

  const saveQueueName = ({ queue, params }) => ({
    [queue]: apQueue(queue),
    params,
  });

  // const composeBuffer = (record) => ({
  //   ...record,
  //   [Object.keys(record).shift()]: compose(record.queue, toBuffer),
  // });

  const composeBuffer = (record) => {
    const queue = Object.keys(record).shift();
    console.log({ queue, record });
    return {
      ...record,
      [queue]: compose(record[queue], toBuffer),
    };
  };

  const retryDelay = 1000;
  const maxFailuresCount = 2;
  const maxAllowedGapInMins = 10; // must be lesser than AMQP_QUEUE_DYNAMIC_EVENT_PATTERN

  // const queues = [AMQP_QUEUE_NOTIFY_CUSTOMERS, AMQP_QUEUE_GENERATE_REMINDERS];

  const queues = [
    {
      queue: AMQP_QUEUE_NOTIFY_CUSTOMERS,
      params: {
        targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
    {
      queue: AMQP_QUEUE_GENERATE_REMINDERS,
      params: {
        targetTime: AMQP_QUEUE_GENERATE_REMINDERS_SCHEDULED_TIME,
        maxAllowedGapInMins,
      },
    },
  ];

  const appedQueues = queues.map(saveQueueName);

  console.log({ appedQueues });

  const result = appedQueues.map(composeBuffer);
  console.log({ result });

  const notifyQueue = apQueue(AMQP_QUEUE_NOTIFY_CUSTOMERS);
  const generateQueue = apQueue(AMQP_QUEUE_GENERATE_REMINDERS);

  const notifyCustomers = compose(notifyQueue, toBuffer);
  const generateReminders = compose(generateQueue, toBuffer);

  // const notifyCustomers = (data) =>
  //   send(AMQP_QUEUE_NOTIFY_CUSTOMERS, Buffer.from(JSON.stringify(data)));

  // const generateReminders = (data) =>
  //   send(AMQP_QUEUE_GENERATE_REMINDERS, Buffer.from(JSON.stringify(data)));

  // const retryDelay = 1000;
  // const maxFailuresCount = 2;
  // const maxAllowedGapInMins = 10; // must be lesser than AMQP_QUEUE_DYNAMIC_EVENT_PATTERN
  // const failsCounter = {};

  const captureRetryOps = retryOperation({
    delay: retryDelay,
    retries: maxFailuresCount,
  });

  // captureRetryOps(notifyCustomers, notifyCustomers.name, {
  //   targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
  //   maxAllowedGapInMins,
  // });

  // const wrap =
  //   (f, ...args) =>
  //   () =>
  //     f(...args);

  console.log({ result, length: result.length });

  const crons = result.map((record) => {
    const queue = Object.keys(record).shift();
    console.log({ queue, record, f: record[queue] });

    return new CronJob(
      '*/01 * * * *', // record.params.targetTime,
      wrap(captureRetryOps, record[queue], queue, record.params),
      DEFAULT_TIME_ZONE
    ).start();

    // setInterval(
    //   wrap(captureRetryOps, notifyCustomers, notifyCustomers.name, {
    //     targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
    //     maxAllowedGapInMins,
    //   }),
    //   1000,
    // );

    // console.log({ [key]: record[key](record.params) });

    console.log({ q: record.params.targetTime });

    // setInterval(
    //   wrap(captureRetryOps, record[queue], queue, record.params),
    //   1000,
    // );

    // return new CronJob(
    //   '*/01 * * * *', // record.params.targetTime,
    //   wrap(captureRetryOps, record[queue], queue, record.params),
    //   DEFAULT_TIME_ZONE,
    // );
  });

  console.log({ crons });

  // setInterval(
  //   wrap(captureRetryOps, notifyCustomers, notifyCustomers.name, {
  //     targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
  //     maxAllowedGapInMins,
  //   }),
  //   1000,
  // );

  // setInterval(
  //   wrap(captureRetryOps, generateReminders, generateReminders.name, {
  //     targetTime: AMQP_QUEUE_GENERATE_REMINDERS_SCHEDULED_TIME,
  //     maxAllowedGapInMins,
  //   }),
  //   1000,
  // );

  // setInterval(() => {
  //   captureRetryOps(notifyCustomers, notifyCustomers.name, {
  //     targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
  //     maxAllowedGapInMins,
  //   });
  // }, 1000);

  // new CronJob(
  //   '*/01 * * * *',
  //   wrap(captureRetryOps, notifyCustomers, notifyCustomers.name, {
  //     targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
  //     maxAllowedGapInMins,
  //   }),
  //   DEFAULT_TIME_ZONE,
  // ).start();

  // new CronJob(
  //   // every day at 8am
  //   AMQP_QUEUE_DYNAMIC_EVENT_PATTERN,
  //   jobHandler({
  //     callback: notifyCustomers,
  //     data: {
  //       targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
  //       maxAllowedGapInMins,
  //     },
  //     jobName: 'notifyCustomers',
  //     failsCounter,
  //     maxFailuresCount,
  //   }),
  //   DEFAULT_TIME_ZONE,
  // ).start();

  // setInterval(() => {
  //   captureRetryOps(notifyCustomers, notifyCustomers.name, {
  //     targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
  //     maxAllowedGapInMins,
  //   });

  //   captureRetryOps(generateReminders, generateReminders.name, {
  //     targetTime: AMQP_QUEUE_GENERATE_REMINDERS_SCHEDULED_TIME,
  //     maxAllowedGapInMins,
  //   });
  // }, 1000);

  // setInterval(() => {
  //   const handler = jobHandler({
  //     callback: notifyCustomers,
  //     data: {
  //       targetTime: AMQP_QUEUE_NOTIFY_CUSTOMERS_SCHEDULED_TIME,
  //       maxAllowedGapInMins,
  //     },
  //     jobName: 'notifyCustomers',
  //     failsCounter,
  //     maxFailuresCount,
  //   })();

  //   console.log({ handler });
  // }, 1000);

  // for (let i = 0; i < 5; i++) {
  //   await send(AMQP_QUEUE_NOTIFY_CUSTOMERS, 'new' + i);
  // }

  // setInterval(async () => {
  //   await notifyCustomers('notify' + Math.random());
  // }, 1000);

  // setInterval(async () => {
  //   await generateReminders('generate' + Math.random());
  // }, 2000);

  // setInterval(async () => {
  //   await notifyCustomers('notify' + Math.random());
  //   await generateReminders('generate' + Math.random());
  // }, 1000);

  // setInterval(async () => {
  //   await send(AMQP_QUEUE_NOTIFY_CUSTOMERS, 'new' + Math.random());
  // }, 1000);

  // await send(
  //   AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION,
  //   'hello-world-from-sender-1',
  // );
  // await send(AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION, 'new-1');

  // await publisher.chain(
  //   always(
  //     pFns.sendToQueue(
  //       AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION_SCHEDULED_TIME,
  //       'hello-world-from-sender',
  //     ),
  //   ),
  // );

  // console.log({ message });
};

setupJobs();

module.exports = setupJobs;
