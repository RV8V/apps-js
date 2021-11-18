const Interface = require('./interface-implementation.js')

const FlyBehaviorInterface = Interface('FlyBehaviorInterface', {
  fly: function() {}
})

const QuackBehaviorInterface = Interface('QuackBehaviorInterface', {
  quack: function() {}
})

class Duck {
  constructor(flyBehavior, quackBehavior) {
    if (this.constructor === Duck) {
      throw new Error('abstract class is here')
    }

    this.flyBehavior = flyBehavior
    this.quackBehavior = quackBehavior
  }

  perfomeFly() {
    this.flyBehavior.fly()
  }

  perfomeQuack() {
    this.quackBehavior.quack()
  }

  setFlyBehavior(flyBehavior) {
    this.flyBehavior = flyBehavior
  }

  setQuackBehavior(quackBehavior) {
    this.quackBehavior = quackBehavior
  }

  display() {}
}

class MallordDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new Quack())
  }

  display() {
    console.log('mallordDuck display')
  }
}

class ModelDuck extends Duck {
  constructor(flyBehavior, quackBehavior) {
    super(flyBehavior, quackBehavior)
  }

  display() {
    console.log('mallordDuck display')
  }
}

class FlyWithWings {
  constructor() {}
  fly() { console.log('I can fly - flyWithWings') }
}

class FlyCanNot {
  constructor() {}
  fly() {}
}

class FlyOnRocketPowered {
  constructor() {}
  fly() { console.log('fly on rocket - FlyOnRocketPowered') }
}

class Quack {
  constructor() {}
  quack() { console.log('I can quack - Quack') }
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
const flyOnRocketPowered = new FlyOnRocketPowered()

const quack = new Quack()
const squack = new Squack()
const muteQuack = new MuteQuack()

Interface.implement(flyWithWings, FlyBehaviorInterface)
Interface.implement(canNotFly, FlyBehaviorInterface)
Interface.implement(flyOnRocketPowered, FlyOnRocketPowered)

Interface.implement(quack, QuackBehaviorInterface)
Interface.implement(squack, QuackBehaviorInterface)
Interface.implement(muteQuack, QuackBehaviorInterface)

const mallordDuck = new MallordDuck()

mallordDuck.perfomeFly()
mallordDuck.perfomeQuack()

const modelDuck = new ModelDuck(canNotFly, quack)

modelDuck.perfomeFly()
modelDuck.setFlyBehavior(flyOnRocketPowered)
modelDuck.perfomeFly()
