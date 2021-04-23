const R = require('ramda')

class Monada {
  constructor(x) {
    this.value = x
  }

  static of(x) {
    return new Monada(x)
  }

  map(fn) {
    return Monada.of(fn(this.value))
  }

  ap(functor) {
    return functor.map(this.value)
  }

  join() {
    return this.value
  }
}

const property = R.curry((key, item) => Monada.of(item).map(R.prop(key)))
const addressValue = property('address')

const data = {
  name: 'Data name',
  address: {
    street: 'street name',
    houses: {
      count: 34
    }
  }
}

console.log({
  addressValue: addressValue({ building: 4, address: 'address' }),
  address: addressValue(data)
})
