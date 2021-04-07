const Interface = require('./interface-implementation.js')

const FlyableInterface = Interface('FlyableInterface', {
  fly: function() {}
})

const QuackableInterface = Interface('QuackableInterface', {
  quack: function() {}
})

class Duck {
  constructor() {
    if (this.constructor === Duck) {
      throw new Error('abstract class - no instance')
    }
  }

  display() {}

  swim() {}
}

class MallordDuck extends Duck {
  constructor() { super() }

  fly() { return true }

  quack() { return true }
}

class RedheadDuck extends Duck {
  constructor() { super() }

  quack() { return true }
}

class DecoyDuck extends Duck {
  constructor() { super() }

  display() { return 'override base implementation' }
}

const mallordDuck = new MallordDuck()
const redheadDuck = new RedheadDuck()
const decoyDuck = new DecoyDuck()

console.log({
  MallordDuckInterface: Interface.implement(mallordDuck, FlyableInterface, QuackableInterface),
  RedheadDuckInterface: Interface.implement(redheadDuck, QuackableInterface)
})
