const delay = (time) => new Promise((resolve) => setTimeout(resolve), time);

const start = async () => {
  const undef = await delay(10);
  console.log({ undef });
};

// start();

////////////////////////////////////////////

const messageEvents = {
  OPERATION_MESSAGES: 'OPERATION_MESSAGES',
};

const clients = [];

const pubSub = {
  publish: (string, message) =>
    clients.forEach((client) => (client.requested = { string, message })),
};

const key = Math.random();

const messagingService = () => {
  const messageSubscriptions = {};

  const subscribeOperationMessage = (message, pubSub) => {
    const operationId = key;

    message.operationId = operationId;

    pubSub.publish(messageEvents.OPERATION_MESSAGES, message);

    const awaiter = new Promise((resolve, reject) => {
      messageSubscriptions[operationId] = {
        resolve,
        reject,
        time: Date.now(),
      };
    });

    console.log({ messageSubscriptions });

    // awaiter.then((data) => console.log({ data }));

    return awaiter;
  };

  const handleOperationMessageAnswer = (input) => {
    const promise = messageSubscriptions[input.operationId];
    delete messageSubscriptions[input.operationId];

    console.log({ promise, input });

    if (promise) {
      return promise.resolve(input);
    }
  };

  return { subscribeOperationMessage, handleOperationMessageAnswer };
};

// console.dir({ clients }, { delay: 4 });

const run = async () => {
  const service = messagingService();

  console.log({ service });

  const subscriber = service.subscribeOperationMessage('message()', pubSub);
  const value = service.handleOperationMessageAnswer({
    operationId: key,
    value: Math.random,
  });

  console.log({ subscriber, value, subscriber });
};

run();
