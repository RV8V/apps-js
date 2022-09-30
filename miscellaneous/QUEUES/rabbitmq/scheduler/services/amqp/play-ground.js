const sender = require('./sender');
const receiver = require('./receiver');
const base = require('./base');

const config = require('../../config/config.service');
const { identity, always } = require('ramda');

const AMQP_USERNAME = config.get('AMQP_USERNAME');
const AMQP_PASSWORD = config.get('AMQP_PASSWORD');
const AMQP_HOSTNAME = config.get('AMQP_HOSTNAME');
const AMQP_PORT = config.get('AMQP_PORT');

const AMQP_URL = `amqp://${AMQP_USERNAME}:${AMQP_PASSWORD}@${AMQP_HOSTNAME}:${AMQP_PORT}`;

const QUEUE_NAME = 'sender-queue-name';

const AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION = config.get(
  'AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION',
);

const start = async () => {
  const inst = base();
  const iFns = inst.chain(identity);

  await inst.chain(always(iFns.connect(AMQP_URL)));
  await inst.chain(always(iFns.createChannel()));
  await inst.chain(always(iFns.assertQueue(QUEUE_NAME)));

  const publisher = sender(inst);
  const pFns = publisher.chain(identity);

  await publisher.chain(
    always(pFns.sendToQueue(QUEUE_NAME, 'hello-world-from-sender')),
  );

  const consumer = receiver(inst);
  const cFns = consumer.chain(identity);

  const message = await consumer.chain(
    always(cFns.consume(AMQP_QUEUE_RESUME_SUBSCRIPTIONS_EMAIL_NOTIFICATION)),
  );
  console.log({ message: message.content.toString() });
};

start();
