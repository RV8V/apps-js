class ChesePizza {}
class GreekPizza {}
class PepperoniPizza {}

class PizzaStore {
  constructor(factory) {
    this.factory = factory
  }

  orderPizza(pizzaType) {
    const pizza = this.factory.createPizza(pizzaType)

    this.prepare(pizza)
    this.bake(pizza)
    this.cut(pizza)
    this.box(pizza)
  }

  prepare(pizza) {}
  bake(pizza) {}
  cut(pizza) {}
  box(pizza) {}
}

class SimplePizzaFactory {
  constructor() {}

  createPizza(pizzaType) {
    let pizza = null

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

const originalFactory = new SimplePizzaFactory()
const originalStrore = new PizzaStore(originalFactory)

originalStrore.orderPizza('cheese')
