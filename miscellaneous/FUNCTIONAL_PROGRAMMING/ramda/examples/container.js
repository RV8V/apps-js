const R = require('ramda')

const INITIAL_VALUE = 2

const inspect = value => {
  if (!value) return value
  return value.inspect ? value.inspect() : value.toString()
}

const log = value => console.log(inspect(value))

class Container {
  constructor(x) {
    this.value = x
  }

  static of(x) {
    return new Container(x)
  }

  inspect() {
    return `Container(${inspect(this.value)})`
  }
}

log(Container.of(INITIAL_VALUE))
