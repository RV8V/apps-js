const R = require('ramda')

/**
 * @Is is an instance of the supplied constructor
 * This function will check up the inheritance chain, if any.
 */

class Animal {
  constructor(name) {
    this.name = name
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name)
  }
}

const AnimalConstructor = R.construct(Animal)
const CatConstructor = R.construct(Cat)

R.bind(console.log, console)({
  1: R.is(Number, 1),
  2: R.is(Animal, new Animal('1')),
  3: R.is(Animal, AnimalConstructor('1')),
  4: R.is(Animal, new Cat('1')),
  5: R.is(Animal, CatConstructor('1')),
  6: R.is(Cat, new Animal('1')),
  7: R.is(Cat, AnimalConstructor('1')),
})
