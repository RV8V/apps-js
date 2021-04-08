class Beverage {
  constructor(description) {
    if (this.constructor === Beverage) {
      throw new Error('abstract class - no instance')
    }

    this.description = description
  }

  cost() {
    throw new Error('method cost not implemented')
  }

  getDescription() {
    return this.description
  }
}

class HouseBlend extends Beverage {
  constructor(description) {
    super(description)
  }

  cost() {
    return 10
  }
}

class DarkRoast extends Beverage {
  constructor(description) {
    super(description)
  }

  cost() {
    return 12
  }
}

const darkRoast = new DarkRoast('darkRoast Beverage')
const houseBlend = new HouseBlend('HouseBlend Beverage')
