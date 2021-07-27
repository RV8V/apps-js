const R = require('ramda')

const factorial = n => n === 0 ? 1 : n * factorial(n - 1)
const factorialT = n => n === 0 && 1 || n * factorial(n - 1)

class ObjectFunctor extends Object {
  constructor(value) {
    super()
    this.value = value
  }

  map(f) {
    return new ObjectFunctor(f(this.value))
  }
}

console.log({
  1: factorial(4),
  2: factorialT(4),
  3: new ObjectFunctor({
    a: 4, b: 5
  }).map(o => Object.keys(o).map(i => factorialT(o[i]))),
  // 4: new ObjectFunctor({
  //   a: 4, b: 5
  // }).map(factorialT)
})
