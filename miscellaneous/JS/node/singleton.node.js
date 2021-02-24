'use strinct'

const Counter = class {
  constructor() {
    if (typeof Counter.instance === 'object') {
      this.counter = 0;
      return Counter.instance
    }

    Counter.instance = this;
    return this;
  }

  getCounter() {
    return this.counter;
  }

  increaseCounter() {
    this.counter++;
    return this;
  }
}

const Singleton = class {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this
    }

    return Singleton.instance;
  }
}

const counter = new Counter();
const next = new Counter();

counter.increaseCounter().increaseCounter();
next.increaseCounter().increaseCounter();

console.log({ increaseCounter: counter.getCounter() });
