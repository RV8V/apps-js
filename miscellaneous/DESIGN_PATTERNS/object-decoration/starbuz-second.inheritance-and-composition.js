class Beverage {
  constructor() {
    if (this.constructor === Beverage) {
      throw new Error('abstract class - no instance')
    }

    this.description = 'unknown Beverage'
  }

  cost() {
    throw new Error('method cost not implemented')
  }

  getDescription() {
    return this.description
  }
}

class CondimentDecorator extends Beverage {
  constructor() {
    super()
    if (this.constructor === CondimentDecorator) {
      throw new Error('abstract class - no instance')
    }
  }

  getDescription() {
    throw new Error('method getDescription not implemented')
  }
}

class Espresso extends Beverage {
  constructor() {
    super()
    this.description = 'Espresso'
  }

  cost() {
    return 1.99
  }
}

class DarkRoast extends Beverage {
  constructor() {
    super()
    this.description = 'DarkRoast'
  }

  cost() {
    return 0.98
  }
}

class Mocha extends CondimentDecorator {
  constructor(beverage) {
    super()
    this.beverage = beverage
  }

  getDescription() {
    return this.beverage.getDescription() + ', Mocha'
  }

  cost() {
    return this.beverage.cost() + 0.20
  }
}

class Soy extends CondimentDecorator {
  constructor(beverage) {
    super()
    this.beverage = beverage
  }

  getDescription() {
    return this.beverage.getDescription() + ', Soy'
  }

  cost() {
    return this.beverage.cost() + 0.30
  }
}

class Whip extends CondimentDecorator {
  constructor(beverage) {
    super()
    this.beverage = beverage
  }

  getDescription() {
    return this.beverage.getDescription() + ', Whip'
  }

  cost() {
    return this.beverage.cost() + 0.40
  }
}

const espresso = new Espresso()
const darkRoast = new DarkRoast()

const mocha = new Mocha(espresso)
const soy = new Soy(darkRoast)
const whip = new Whip(mocha)
const nextWhip = new Whip(soy)

console.log({
  espresso: espresso.cost(),
  darkRoast: darkRoast.cost(),
  mocha: mocha.cost(),
  soy: soy.cost(),
  whip: whip.cost(),
  nextWhip: nextWhip.cost()
})
