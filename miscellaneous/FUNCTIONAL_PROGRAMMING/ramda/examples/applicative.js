const R = require('ramda')

class Applicative {
  constructor(x) {
    this.value = x
  }

  static of(x) {
    return new Applicative(x)
  }

  map(fn) {
    return Applicative.of(fn(this.value))
  }

  ap(functor) {
    return functor.map(this.value)
  }
}

const catOne = Applicative.of({ name: 'cat', age: 2 }).map(x => x.age)
const catTwo = Applicative.of({ name: 'cat', age: 1 }).map(x => x.age)

console.log({
  result: Applicative.of(x => y => x + y).ap(catOne).ap(catTwo)
})
