const { identity, always } = require('ramda');

// const sender = require('./sender');
const base = require('./base');
const logger = require('../../utils/logger');
const config = require('../../config/config.service');

const AMQP_USERNAME = config.get('AMQP_USERNAME');
const AMQP_PASSWORD = config.get('AMQP_PASSWORD');
const AMQP_HOSTNAME = config.get('AMQP_HOSTNAME');
const AMQP_PORT = config.get('AMQP_PORT');

const AMQP_URL = `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOSTNAME}:${AMQP_PORT}`;

// const QUEUE_NAME = 'sender-queue-name';

const AMQP_QUEUE_GENERATE_REMINDERS = config.get(
  'AMQP_QUEUE_GENERATE_REMINDERS',
);
const AMQP_QUEUE_REQUEST_SETTLEMENTS = config.get(
  'AMQP_QUEUE_REQUEST_SETTLEMENTS',
);
const AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS = config.get(
  'AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS',
);
const AMQP_QUEUE_LOCK_BANK_DEPOSITS = config.get(
  'AMQP_QUEUE_LOCK_BANK_DEPOSITS',
);
const AMQP_QUEUE_UPDATE_PRICE_GROUPS = config.get(
  'AMQP_QUEUE_UPDATE_PRICE_GROUPS',
);
const AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE = config.get(
  'AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE',
);
const AMQP_QUEUE_NOTIFY_CUSTOMERS = config.get('AMQP_QUEUE_NOTIFY_CUSTOMERS');
const AMQP_QUEUE_END_SUBSCRIPTIONS = config.get('AMQP_QUEUE_END_SUBSCRIPTIONS');

// AMQP_QUEUE_NOTIFY_CUSTOMERS,
// AMQP_QUEUE_GENERATE_REMINDERS,
// AMQP_QUEUE_REQUEST_SETTLEMENTS,
// AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS,
// AMQP_QUEUE_LOCK_BANK_DEPOSITS,
// AMQP_QUEUE_END_SUBSCRIPTIONS,
// AMQP_QUEUE_UPDATE_PRICE_GROUPS,
// AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE,

const queuesMap = {
  AMQP_QUEUE_NOTIFY_CUSTOMERS,
  AMQP_QUEUE_GENERATE_REMINDERS,
  AMQP_QUEUE_REQUEST_SETTLEMENTS,
  AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS,
  AMQP_QUEUE_LOCK_BANK_DEPOSITS,
  AMQP_QUEUE_END_SUBSCRIPTIONS,
  AMQP_QUEUE_UPDATE_PRICE_GROUPS,
  AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE,
};

const logError = (err) => logger.error(err);

const setupMq = async () => {
  // if (SKIP_MQ_SETUP) {
  //   return logger.info('MQ: setup is skipped');
  // }

  const missedQueue = Object.entries(queuesMap).find(
    ([, value]) => value == null,
  );
  if (missedQueue) {
    logger.error(`Queue ${missedQueue[0]} is missed in env vars`);
    // eslint-disable-next-line no-process-exit
    return process.exit(1);
  }

  const inst = base();
  const iFns = inst.chain(identity);

  await inst.chain(always(iFns.connect(AMQP_URL)));
  await inst.chain(always(iFns.createChannel()));
  // await inst.chain(always(iFns.assertQueue(QUEUE_NAME)));

  // const client = Client.getInstance();
  // try {
  //   await client.connect();
  // } catch (err) {
  //   throw err;
  // }

  await Promise.all([
    inst.chain(always(iFns.assertQueue(AMQP_QUEUE_NOTIFY_CUSTOMERS))),
    inst.chain(always(iFns.assertQueue(AMQP_QUEUE_GENERATE_REMINDERS))),
    inst.chain(always(iFns.assertQueue(AMQP_QUEUE_REQUEST_SETTLEMENTS))),
    inst.chain(always(iFns.assertQueue(AMQP_QUEUE_CHARGE_DEFERRED_PAYMENTS))),
    inst.chain(always(iFns.assertQueue(AMQP_QUEUE_LOCK_BANK_DEPOSITS))),
    inst.chain(always(iFns.assertQueue(AMQP_QUEUE_END_SUBSCRIPTIONS))),
    inst.chain(always(iFns.assertQueue(AMQP_QUEUE_UPDATE_PRICE_GROUPS))),
    inst.chain(always(iFns.assertQueue(AMQP_QUEUE_RECURRENT_ORDERS_TO_CORE))),
  ]);

  // binding happens automatically since the default exchange

  console.log({ iFns });

  /**
   * @to remove
   */

  const receiver = require('./receiver');

  const consumer = receiver(inst);
  const cFns = consumer.chain(identity);

  // const message1 = await consumer.chain(
  //   always(cFns.consume(AMQP_QUEUE_NOTIFY_CUSTOMERS, { noAck: true })),
  // );

  console.log({
    log: await consumer.chain(
      always(cFns.consume(AMQP_QUEUE_NOTIFY_CUSTOMERS, { noAck: true })),
    ),
  });

  console.log({
    log: await consumer.chain(
      always(cFns.consume(AMQP_QUEUE_GENERATE_REMINDERS, { noAck: true })),
    ),
  });

  // console.log({
  //   messages: messages.map((message) => message.content.toString()),
  // });

  // console.log({ message1 });
  // console.log({ message1: message1.content.toString() });

  // await inst.chain(always(iFns.closeChannel())).catch(logError);
  // await inst.chain(always(iFns.closeConnector())).catch(logError);
  // await client.disconnect().catch(logError);

  return logger.info('MQ: Setup is done');
};

// setupMq();

module.exports = setupMq;

// const config = require('../../config/config.service');

// const start = async () => {
//   const inst = base();
//   const iFns = inst.chain(identity);

//   await inst.chain(always(iFns.connect(AMQP_URL)));
//   await inst.chain(always(iFns.createChannel()));
//   await inst.chain(always(iFns.assertQueue(QUEUE_NAME)));

//   const publisher = sender(inst);
//   const pFns = publisher.chain(identity);

//   await publisher.chain(
//     always(pFns.sendToQueue(QUEUE_NAME, 'hello-world-from-sender')),
//   );
// };

// start();
