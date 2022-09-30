const { convert, cast } = require('@fp/common');
const amqp = require('amqplib');
// const { identity } = require('ramda');

const eitherFreeze = require('../../utils/either-freeze');
const logger = require('../../utils/logger');

const { promiseToEither } = convert;
const { either, toEither, left } = cast;

// const onOperationFail = (message) => (either) =>
//   logger.error(
//     `${message}: onFail: ${either.onFail}, message: ${either.err.message}`,
//   );

// const onOperationFail = (pool, socket) => (message) => (either) => {
//   logger.error(
//     `${message}: onFail: ${either.onFail}, message: ${either.err.message}`,
//   );
//   pool[socket] = left(either);
//   return pool[socket];
// };

// // const onConnectorFail = () => logger.error('failed to get connector');

// const logJustLeft = (pool, socket) => (message) => (either) => {
//   logger.error(message);
//   pool[socket] = left({ message, either });
//   return pool[socket];
// };

// const onOperationFail = (pool, socket) => (message) => (either) => {
//   logger.error(
//     `${message}: onFail: ${either.onFail}, message: ${either.err.message}`,
//   );
//   pool[socket] = left(either);
//   return pool[socket];
// };

const leftSocketFactory = (pool, socket) => ({
  onOperationFail: (message) => (either) => {
    logger.error(
      `${message}: onFail: ${either.onFail}, message: ${either.err.message}`,
    );
    pool[socket] = left(either);
    return pool[socket];
  },
  logJustLeft: (message) => (either) => {
    logger.error(message);
    pool[socket] = left({ message, either });
    return pool[socket];
  },
});

// const onConnectorFail = () => logger.error('failed to get connector');

// const logJustLeft = (pool, socket) => (message) => (either) => {
//   logger.error(message);
//   pool[socket] = left({ message, either });
//   return pool[socket];
// };

const base = () => {
  const pool = {};

  const connect = async (url) => {
    const amqpConnector = promiseToEither(
      'error occured while connection to queue',
      amqp.connect,
    );
    const connector = await amqpConnector(url);
    console.log({ connectorHere: connector });

    // const onConnectFail = (either) =>
    //   logger.error(`onFail: ${either.onFail}, message: ${either.err.message}`);

    const onConnectSuccess = (either) => {
      logger.info('connected with success');
      pool.connector = toEither('connector can not be not defined', either);
      return pool.connector;
    };

    const { onOperationFail } = leftSocketFactory(pool, 'connector');

    return either(
      onOperationFail('[failed to connecto to amqp]'),
      // onOperationFail(pool, 'connector')('[failed to connecto to amqp]'),
      onConnectSuccess,
      connector,
    );

    // pool.connector = connector;
    // return connector;
  };

  // const createChannel = async () => {
  //   const connector = pool.connector.chain(identity);

  //   console.log({ connector });

  //   // await connector.chain(always(iFns.connect(AMQP_URL)));

  //   const amqpChannel = promiseToEither(
  //     'error occured while creating channel',
  //     connector.createChannel.bind(connector),
  //   );
  //   const channel = await amqpChannel();
  //   pool.channel = channel;
  //   return channel;
  // };

  const createChannel = async () => {
    // const connector = pool.connector.chain(identity);

    // const onConnectorFail = () => logger.error('failed to get connector');

    const tryToCreateChannel = async (connector) => {
      const amqpChannel = promiseToEither(
        'error occured while creating channel',
        connector.createChannel.bind(connector),
      );
      const channel = await amqpChannel();

      // const onChannelFail = (either) =>
      //   logger.error(
      //     `onFail: ${either.onFail}, message: ${either.err.message}`,
      //   );

      const onChannelSuccess = (either) => {
        logger.info('channel created with success');
        pool.channel = toEither('channel can not be not defined', either);
        return pool.channel;
      };

      const { onOperationFail } = leftSocketFactory(pool, 'channel');

      return either(
        onOperationFail('[failed to create channel]'),
        // onOperationFail(pool, 'channel')('[failed to create channel]'),
        onChannelSuccess,
        channel,
      );
    };

    console.log({ connectorT: pool.connector });

    const { logJustLeft } = leftSocketFactory(pool, 'connector');

    return either(
      logJustLeft('failed to get connector'),
      // logJustLeft(pool, 'connector')('failed to get connector'),
      tryToCreateChannel,
      pool.connector,
    );

    //   const tryToCreateChannel = (connector) => {
    //     const amqpChannel = promiseToEither(
    //       'error occured while creating channel',
    //       connector.createChannel.bind(connector),
    //     );
    //     const channel = await amqpChannel();

    //     return either(onConnectFail, onConnectSuccess, connector);

    //     pool.channel = channel;
    //     return channel;

    //     pool.connector = toEither('connector can not be not defined', connector);
    //     return pool.connector;
    //   };

    //   return either(onConnectFail, onConnectSuccess, connector);

    //   // console.log({ connector });

    //   // await connector.chain(always(iFns.connect(AMQP_URL)));

    //   // const amqpChannel = promiseToEither(
    //   //   'error occured while creating channel',
    //   //   connector.createChannel.bind(connector),
    //   // );
    //   // const channel = await amqpChannel();
    //   // pool.channel = channel;
    //   // return channel;
  };

  const assertQueue = (queue) => {
    // const onChannelFail = () => logger.error('failed to create channel');

    const tryToAssertQueue = async (channel) => {
      const amqpAssertQueue = promiseToEither(
        'error occured while assertion queue',
        channel.assertQueue.bind(channel),
      );
      const amqpQueue = await amqpAssertQueue(queue);

      console.log({ amqpQueue });

      // const onQueueAssertionFail = (either) =>
      //   logger.error(
      //     `onFail: ${either.onFail}, message: ${either.err.message}`,
      //   );

      const onQueueAssertionSuccess = (either) => {
        logger.info('asserted queue with success');
        return toEither('queue can not be undefined', either);
      };

      const { onOperationFail } = leftSocketFactory(pool, 'channel');

      return either(
        onOperationFail('[failed to assert channel queue]'),
        // onOperationFail(pool, 'channel')('[failed to assert channel queue]'),
        onQueueAssertionSuccess,
        amqpQueue,
      );
    };

    const { logJustLeft } = leftSocketFactory(pool, 'channel');

    return either(
      logJustLeft('failed to create channel'),
      // logJustLeft(pool, 'channel')('failed to create channel'),
      tryToAssertQueue,
      pool.channel,
    );

    // const channel = pool.channel.chain(identity);

    // const amqpAssertQueue = promiseToEither(
    //   'error occured while assertion queue',
    //   channel.assertQueue.bind(channel),
    // );
    // return amqpAssertQueue(queue);
  };

  // const assertQueue = (queue) => {
  //   const onChannelFail = () => logger.error('failed to create channel');

  //   const channel = pool.channel.chain(identity);

  //   const amqpAssertQueue = promiseToEither(
  //     'error occured while assertion queue',
  //     channel.assertQueue.bind(channel),
  //   );
  //   return amqpAssertQueue(queue);
  // };

  const closeChannel = () => {
    // const onQueueAssertionFail = () => logger.error('failed to assert queue');

    const tryToCloseChannel = async (channel) => {
      const amqpCloseChannel = promiseToEither(
        'error occured while closing channel',
        channel.close.bind(channel),
      );
      const close = await amqpCloseChannel();

      // const onCloseChannelFail = (either) =>
      //   logger.error(
      //     `onFail: ${either.onFail}, message: ${either.err.message}`,
      //   );

      const onCloseChannelSuccess = (either) => {
        logger.info('channel closed with success');
        return toEither('channel connector can not be undefined', either);
      };

      const { onOperationFail } = leftSocketFactory(pool, 'channel');

      return either(
        onOperationFail('[failed to close channel]'),

        // onOperationFail(pool, 'channel')('[failed to close channel]'),
        onCloseChannelSuccess,
        close,
      );
    };

    const { logJustLeft } = leftSocketFactory(pool, 'channel');

    return either(
      logJustLeft('failed to assert queue'),
      // logJustLeft(pool, 'channel')('failed to assert queue'),
      tryToCloseChannel,
      pool.channel,
    );

    // const channel = pool.channel.chain(identity);

    // const amqpCloseChannel = promiseToEither(
    //   'error occured while closing channel',
    //   channel.close.bind(channel),
    // );
    // return amqpCloseChannel();
  };

  const closeConnector = async () => {
    // const connector = pool.connector.chain(identity);
    // const onChannelCloseFail = () => logger.error('failed to close channel');

    const tryToCloseChannel = async (connector) => {
      const amqpCloseConnector = promiseToEither(
        'error occured while closing queue',
        connector.close.bind(connector),
      );
      const closeSocket = await amqpCloseConnector();

      // const onCloseQueueFail = (either) =>
      //   logger.error(
      //     `onFail: ${either.onFail}, message: ${either.err.message}`,
      //   );

      const onCloseQueueSuccess = (either) => {
        logger.info('queue closed with success');
        return toEither('queue connector can not be undefined', either);
      };

      const { onOperationFail } = leftSocketFactory(pool, 'channel');

      return either(
        onOperationFail('[failed to close queue socket]'),
        // onOperationFail(pool, 'channel')('[failed to close queue socket]'),
        onCloseQueueSuccess,
        closeSocket,
      );
    };

    const { logJustLeft } = leftSocketFactory(pool, 'connector');

    return either(
      logJustLeft('failed to close channel'),
      // logJustLeft(pool, 'connector')('failed to close channel'),
      tryToCloseChannel,
      pool.connector,
    );

    // const amqpCloseConnector = promiseToEither(
    //   'error occured while closing queue',
    //   connector.close.bind(connector),
    // );
    // return amqpCloseConnector();
  };

  const methods = {
    connect,
    createChannel,
    assertQueue,
    closeChannel,
    closeConnector,
    pool,
  };

  // const eitherFreeze = curry(
  //   compose(toEither('methods can not be undefined'), Object.freeze),
  // );

  return eitherFreeze('methods can not be undefined')(methods);

  // return Object.freeze({
  //   connect,
  //   createChannel,
  //   assertQueue,
  //   closeChannel,
  //   closeConnector,
  //   pool,
  // });
};

module.exports = base;

// const amqp = require('amqplib');
// const logger = require('../../../utils/logger');

// const base = () => {
//   const pool = {};

//   const connect = async (url) =>
//     (pool.connector = await amqp
//       .connect(url)
//       .catch((err) =>
//         logger.error(
//           `error occured while connection to queue: ${err.message$}`,
//         ),
//       ));

//   // const createChannel = async () => {
//   //   console.log({ con: pool.connector });

//   //   const channel = await pool.connector
//   //     .createChannel()
//   //     .catch((err) =>
//   //       logger.error(`error occured while creating channel: ${err.message}`),
//   //     );

//   //   return (pool.channel = channel);
//   // };

//   const createChannel = async () =>
//     (pool.channel = await pool.connector
//       .createChannel()
//       .catch((err) =>
//         logger.error(`error occured while creating channel: ${err.message}`),
//       ));

//   const assertQueue = (queue) =>
//     pool.channel
//       .assertQueue(queue)
//       .catch((err) =>
//         logger.error(`error occured while assertion queue: ${err.message}`),
//       );

//   const closeChannel = () =>
//     pool.channel
//       .close()
//       .catch((err) =>
//         logger.error(`error occured while closing channel: ${err.message}`),
//       );

//   const closeConnector = () =>
//     pool.connect
//       .close()
//       .catch((err) =>
//         logger.error(`error occured while closing queue: ${err.message}`),
//       );

//   return Object.freeze({
//     connect,
//     createChannel,
//     assertQueue,
//     closeChannel,
//     closeConnector,
//     pool,
//   });
// };

// module.exports = base;

// (async () => {
//   const connector = await amqp.connect(AMQP_URL);
//   const channel = await connector.createChannel();

//   await channel.assertQueue(QUEUE_NAME);
//   //   channel.sendToQueue(QUEUE_NAME, Buffer.from('first message for queue'));

//   const message = await consume(channel, QUEUE_NAME);

//   channel.ack(message);

//   await channel.close();
//   await connector.close();

//   console.log({ message, content: message.content.toString() });

//   //   channel.consume(QUEUE_NAME, (message) => {
//   //     console.log({ message });
//   //     console.log({ data: message.content.toString() });
//   //     channel.ack(message);

//   //     channel.close();
//   //     connector.close();
//   //   });

//   //   console.log({ message, content: message.content.toString() });

//   //   await channel.close();
//   //   await connector.close();
// })();
