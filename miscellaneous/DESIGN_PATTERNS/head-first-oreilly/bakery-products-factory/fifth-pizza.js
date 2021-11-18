class Pizza {
  constructor(name, dough, sauce) {
    if (this.constructor === Pizza) {
      throw new Error('abstract class - no instance');
    }

    this.name = name
    this.dough = dough
    this.sauce = sauce
    this.toppings = []
  }

  prepare() {
    console.log(`preparing: ${this.name}`)
    console.log(`tossing: ${this.dough}`)
    console.log(`adding sause: ${this.sauce}`)

    for (let i = 0; i < this.toppings.length; ++i) {
      console.log(` ${this.toppings[i]}`)
    }
  }

  bake() {
    console.log('bake for 25 minutes at 350')
  }

  cut() {
    console.log('cutting the pizza into diagonal slices')
  }

  box() {
    console.log('place pizza in official PizzaStore box')
  }

  getName() {
    return this.name
  }
}

class NYStyleCheesePizza extends Pizza {
  constructor() {
    super()
    this.name = 'NY Style Sauce and Cheese Pizza'
    this.dough = 'thin crust dough'
    this.sauce = 'marinara sauce'
    this.toppings.push('grated reggiano cheese')
  }
}

class ChicagoStyleCheesePizza extends Pizza {
  constructor() {
    super()
    this.name = 'Chicago Style Sauce and Cheese Pizza'
    this.dough = 'large crust dough'
    this.sauce = 'bonara sauce'
    this.toppings.push('sliced maiano cheese')
  }

  cut() {
    console.log('cutting the pizza into square slices')
  }
}

class PizzaStore {
  constructor() {
    if (this.constructor === PizzaStore) {
      throw new Error('abstract class - no instance');
    }
  }

  createPizza(pizzaType) {
    throw new Error('method createPizza not implemented')
  }

  orderPizza(pizzaType) {
    const pizza = this.createPizza(pizzaType)

    pizza.prepare()
    pizza.bake()
    pizza.cut()
    pizza.box()

    return pizza
  }
}

class NYPizzaStore extends PizzaStore {
  constructor() {
    super()
  }

  createPizza(pizzaType) {
    let pizza

    if (pizzaType === 'cheese') {
      pizza = new ChesePizza()
    } else if (pizzaType === 'greek') {
      pizza = new GreekPizza()
    } else if (pizzaType === 'pepperoni') {
      pizza = new PepperoniPizza()
    }
    return pizza
  }
}

class ChicagoPizzaStore extends PizzaStore {
  constructor() {
    super()
  }

  createPizza(pizzaType) {
    let pizza

    if (pizzaType === 'hoc') {
      pizza = new HocPizza()
    } else if (pizzaType === 'vek') {
      pizza = new VekPizza()
    } else if (pizzaType === 'roni') {
      pizza = new RoniPizza()
    }
    return pizza
  }
}

class ChesePizza extends Pizza {}
class GreekPizza extends Pizza {}
class PepperoniPizza extends Pizza {}

class HocPizza extends Pizza {}
class VekPizza extends Pizza {}
class RoniPizza extends Pizza {}

const nyPizzaStore = new NYPizzaStore()
const chicagoPizzaStore = new ChicagoPizzaStore()

const nyPizza = nyPizzaStore.orderPizza('cheese')
const chicagoPizza = chicagoPizzaStore.orderPizza('hoc')
