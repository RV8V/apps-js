class ChesePizza {}
class GreekPizza {}
class PepperoniPizza {}

class PizzaStore {
  constructor() {}

  orderPizza(pizzaType) {
    let pizza

    if (pizzaType === 'cheese') {
      pizza = new ChesePizza()
    } else if (pizzaType === 'greek') {
      pizza = new GreekPizza()
    } else if (pizzaType === 'pepperoni') {
      pizza = new PepperoniPizza()
    }

    pizza.prepare()
    pizza.bake()
    pizza.cut()
    pizza.box()
    return pizza
  }

  prepare() {}
  bake() {}
  cut() {}
  box() {}
}
