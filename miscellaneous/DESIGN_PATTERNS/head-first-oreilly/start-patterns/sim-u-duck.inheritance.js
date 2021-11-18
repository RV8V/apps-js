class Duck {
  constructor() {
    if (this.constructor === Duck) {
      throw new Error('can not make instance of abstract class Duck')
    }
  }

  display() {
    throw new Error('method display is not implemented')
  }

  quack() {}

  swim() {}

  fly() {
    console.log('new added method for duck')
  }
}

class MallordDuck extends Duck {
  constructor() {
    super()
  }

  display() {
    console.log('display for MallordDuck')
  }
}

class RedheadDuck extends Duck {
  constructor() {
    super()
  }

  display() {
    console.log('display for RedheadDuck')
  }
}

class RubberDuck extends Duck {
  constructor() {
    super()
  }

  display() {
    console.log('display for RubberDuck')
  }

  quack() {
    console.log('quack fro RubberDuck')
  }

  fly() {}
}

class DecoyDuck extends Duck {
  constructor() {
    super()
  }

  display() {
    console.log('display for DecoyDuck')
  }

  quack() {}

  fly() {}
}
