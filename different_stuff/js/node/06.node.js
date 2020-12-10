;var person = Object.create({
  calculate() {
    return this.name
  }
}, {
  calculate: {
    value: function() {
      return this.year
    },
    enumerable: false,
    writable: true,
    configurable: true
  },
  name: {
    value: 'value',
    enumerable: true,
    writable: true,
    configurable: true
  },
  year: {
    value: 2,
    enumerable: true,
    writable: false,
    configurable: false
  },
  value: {
    get() {
      return this.year
    },
    set(value) {
      this.year = value
      return true
    }
  }
})

person.name = 'v'
delete person.name

person.value = 3

for (var key in person) {
  if (person.hasOwnProperty(key))
    console.log({ key, value: person[key] })
}

console.log({ person: person.name, res: person.calculate() })
