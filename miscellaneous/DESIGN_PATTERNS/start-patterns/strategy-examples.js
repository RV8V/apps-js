const Interface = require('./interface-implementation.js')

/*
 * strategy as function
 */

class Greeter {
  constructor(strategy) {
    this.strategy = strategy
  }

  greet() {
    this.strategy()
  }
}

const politeGreetingStrategy = function() {
  console.log('hello')
}

const friendlyGreetingStrategy = function() {
  console.log('hi')
}

const greeter = new Greeter(politeGreetingStrategy)
greeter.greet()

greeter.strategy = friendlyGreetingStrategy
greeter.greet()

/*
 * strategy as class
 */

class GreeterViaClass {
  constructor(strategy) {
    this.strategy = strategy
  }

  greet() {
    this.strategy.execute()
  }
}

class Strategy {
  constructor() {
    if (this.constructor = Strategy) {
      throw new Error('abstract class - no instance')
    }
  }

  execute() {
    throw new Error('Strategy#execute needs to be overridden.')
  }
}

class GreetingStrategy {
  constructor() {}

  execute() {
    console.log(this.sayHi + this.sayBye)
  }

  sayHi() { return 'hi' }
  sayBye() { return ' bye' }
}

class GreetingFriendlyStrategy {
  constructor() {}

  execute() {
    console.log(this.sayHi + this.sayBye)
  }

  sayHi() { return 'hi' }
  sayBye() { return ' bye' }
}

const greetingStrategy = new GreetingStrategy()
const greetingFriendlyStrategy = new GreetingFriendlyStrategy()

Interface.implement(greetingStrategy, GreetingStrategy)
Interface.implement(greetingFriendlyStrategy, GreetingFriendlyStrategy)

const greeterViaClass = new GreeterViaClass(greetingStrategy)
const greeterViaClassFriendly = new GreeterViaClass(greetingFriendlyStrategy)

greeterViaClass.greet()

[greeterViaClass, greeterViaClassFriendly].forEach(strategy => {
  strategy.execute()
})
