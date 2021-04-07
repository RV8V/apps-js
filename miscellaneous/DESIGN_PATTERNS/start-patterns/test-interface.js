const Interface = require('./interface-implementation.js')

const Event = Interface('Event', {})
// const EventNew = new Interface('EventNew', {})

// console.log({ Event: Event instanceof Interface, EventNew: EventNew instanceof Interface })

const NewEvent = Interface('NewEvent', {
  on: function() {}
})

console.log({
  Event: Event instanceof Interface,
  on: NewEvent.on
})

const NewNumber = Interface('NewNumber', {
  calculate: function() {}
})

const FirstNumber = Object.create(NewNumber)

FirstNumber.calculate = function() {
  return true
}

const TestEvent = Interface('TestEvent', {
  on: function() {}
})

// TestEvent.on()

console.log({ FirstNumber: FirstNumber.calculate })

const Logger = Interface('Logger', {
  log: function() {}
})

const Emitter = Interface('Emitter', {
  emit: function() {}
})

const object = {
  log: function() {
    return true
  },

  emit: function() {
    return true
  }
}

console.log({ implemented: Interface.implement(object, Logger, Emitter) })

const Write = Interface('Write', {
  log: function() {}
})

const writer = {
  bind: function() {
    return true
  },

  // log: function() {}
}

Interface.implement(writer, Write)
