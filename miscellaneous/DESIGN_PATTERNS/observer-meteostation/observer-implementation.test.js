const assert = require('assert')

class EventObserver {
  constructor() {
    this.observers = []
  }

  subscribe(fnObservable) {
    this.observers.push(fnObservable)
  }

  unsubscribe(fnObservable) {
    this.observers = this.observers.filter(subscriber => subscriber !== fnObservable)
  }

  broadcast(data) {
    this.observers.forEach(subscriber => subscriber(data))
  }
}

const eventObserver = new EventObserver()
const fn = data => {}

eventObserver.subscribe(fn)
assert.strictEqual(eventObserver.observers.length, 1)

eventObserver.unsubscribe(fn)
assert.strictEqual(eventObserver.observers.length, 0)
