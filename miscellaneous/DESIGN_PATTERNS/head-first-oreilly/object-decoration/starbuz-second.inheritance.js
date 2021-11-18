class Beverage {
  constructor(description) {
    if (this.constructor === Beverage) {
      throw new Error('abstract class - no instance')
    }

    this.description = description
    this.milk = false
    this.soy = false
    this.mocha = false
    this.whip = false
  }

  cost() {
    throw new Error('method cost not implemented')
  }

  getDescription() {
    return this.description
  }

  hasMilk() { return Boolean(this.milk) }
  hasSoy() { return Boolean(this.soy) }
  hasWhip() { return Boolean(this.whip) }
  hasMocha() { return Boolean(this.mocha) }

  setMilk() { this.milk = true }
  setSoy() { this.soy = true }
  setWhip() { this.whip = true }
  setMocha() { this.mocha = true }
}

class HouseBlend extends Beverage {
  constructor(description) {
    super(description)
  }

  cost() {
    return 10 + super.cost()
  }
}

class DarkRoast extends Beverage {
  constructor(description) {
    super(description)
  }

  cost() {
    return 12 + super.cost()
  }
}

const darkRoast = new DarkRoast('darkRoast Beverage')
const houseBlend = new HouseBlend('HouseBlend Beverage')
