const R = require('ramda')

class Funtor {
  constructor(x) {
    this.value = x
  }

  static of(x) {
    return new Funtor(x)
  }

  map(fn) {
    return Funtor.of(fn(this.value))
  }
}

const person = { name: 'Jake', age: 31 }

console.log({ afterMap: Funtor.of(person).map(o => o.age + 1) })
