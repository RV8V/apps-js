class ChesePizza {}
class GreekPizza {}
class PepperoniPizza {}

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

    this.prepare(pizza)
    this.bake(pizza)
    this.cut(pizza)
    this.box(pizza)

    return pizza
  }

  prepare(pizza) {}
  bake(pizza) {}
  cut(pizza) {}
  box(pizza) {}
}
