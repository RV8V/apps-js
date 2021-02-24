'use strict'

const Client = class {
  constructor(abstractFactory_MessageQueue) {
    this.abstractFactory_MessageQueue = abstractFactory_MessageQueue
  }

  sendMessage() {
    const out = abstractFactory_MessageQueue.createProductA();
    out.sendMessage('hello, abstract factory')
  }

  getMessage() {
    const in = abstractFactory_MessageQueue.createProductB();
    return in.receiveMessage();
  }
}

const AbstractFactory_MessageQueue = class {
  createProductA: function() {};
  createProductB: function() {};
}

const AzureMessageQueue = class {
  constructor() {}
}

const AzureResponseMessageQueue = class {
  constructor() {}
}

const OracleMessageQueue = class {
  constructor() {}
}

const OracleResponseMessageQueue = class {
  constructor() {}
}

const ConcreteFactory_Azure = class extends AbstractFactory_MessageQueue {
  constructor() {}

  createProductA: function() {
    return new AzureMessageQueue()
  }

  createProductB: function() {
    return new AzureResponseMessageQueue()
  }
}

const ConcreteFactory_Oracle = class extends AbstractFactory_MessageQueue {
  constructor() {}

  createProductA: function() {
    return new OracleMessageQueue()
  }

  createProductB: function() {
    return new OracleResponseMessageQueue()
  }
}
