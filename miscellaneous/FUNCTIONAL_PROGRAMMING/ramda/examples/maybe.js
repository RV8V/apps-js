const R = require('ramda')

class Maybe {
  constructor(x) {
    this.value = x
  }

  static of(x) {
    return new Maybe(x)
  }

  isNoting() {
    return this.value === null || this.value === undefined
  }

  map(fn) {
    return this.isNoting() ? this : Maybe.of(fn(this.value))
  }
}

console.log({
  withAge: Maybe.of({ name: 'name', age: 2 }).map(x => x.age).map(age => age + 1),
  withoutAge: Maybe.of({ name: 'name' }).map(x => x.age).map(age => age + 1)
})
