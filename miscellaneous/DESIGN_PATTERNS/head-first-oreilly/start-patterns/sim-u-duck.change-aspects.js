const Interface = require('./interface-implementation.js')

const FlyBehaviorInterface = Interface('FlyBehaviorInterface', {
  fly: function() {}
})

const QuackBehaviorInterface = Interface('QuackBehaviorInterface', {
  quack: function() {}
})

class FlyWithWings {
  constructor() {}
  fly() { console.log('I can fly') }
}

class FlyCanNot {
  constructor() {}
  fly() {}
}

class Quack {
  constructor() {}
  quack() { console.log('I can quack') }
}

class Squack {
  constructor() {}
  quack() { console.log('I can squack only not quack') }
}

class MuteQuack {
  constructor() {}
  quack() {}
}

const flyWithWings = new FlyWithWings()
const canNotFly = new FlyCanNot()

const quack = new Quack()
const squack = new Squack()
const muteQuack = new MuteQuack()

Interface.implement(flyWithWings, FlyBehaviorInterface)
Interface.implement(canNotFly, FlyBehaviorInterface)

Interface.implement(quack, QuackBehaviorInterface)
Interface.implement(squack, QuackBehaviorInterface)
Interface.implement(muteQuack, QuackBehaviorInterface)
