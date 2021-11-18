class Pizza {}

class PizzaStore {
  constructor() {}

  orderPizza() {
    const pizza = new Pizza()

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
