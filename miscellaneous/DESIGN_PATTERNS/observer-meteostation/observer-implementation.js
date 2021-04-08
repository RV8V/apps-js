const Interface = require('../start-patterns/interface-implementation.js')

const SubjectInterface = Interface('SubjectInterface', {
  registerObserver: function() {},
  removeObserver: function() {},
  notifyObservers: function() {}
})

const ObserverInterface = Interface('ObserverInterface', {
  update: function() {}
})

class ConcreteSubject {
  constructor(observers) {
    this.observers = observers
  }

  registerObserver() {}
  removeObserver() {}
  notifyObservers() {}

  getState() {}
  setState() {}
}

class ConcreteObserver {
  constructor(subject) {
    this.subject = subject
  }

  update() {}
}

const concreteObserver = new ConcreteObserver()
const concreteSubject = new ConcreteSubject()

Interface.implement(concreteObserver, ObserverInterface)
Interface.implement(concreteSubject, SubjectInterface)
