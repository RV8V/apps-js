const Interface = require('../start-patterns/interface-implementation.js')

const IteratorInterface = Interface('IteratorInterface', {
  hasNext: function() {},
  next: function() {}
})

class DinerMenuIterator {
  constructor(...args) {
    this.items = args
    this.position = 0
  }

  next() {
    return this.items[this.position++]
  }

  hasNext() {
    if (this.position >= this.items.length || this.items[this.position] === null) {
      return false
    } else {
      return true
    }
  }
}

class DinerMenu {
  constructor(dinerMenuIterator) {
    this.dinerMenuIterator = dinerMenuIterator
  }

  createIterator() {
    return this.dinerMenuIterator
  }
}

class Waitress {
  constructor(dinerMenu) {
    this.dinerMenu = dinerMenu
  }

  representMenu(iterator) {
    while(iterator.hasNext()) {
      console.log(iterator.next())
    }
  }
}

const dinerMenuIterator = new DinerMenuIterator('poridge', 'apples', 'milk')
const dinerMenu = new DinerMenu(dinerMenuIterator)

const waitress = new Waitress(dinerMenu)

waitress.representMenu(dinerMenuIterator)

Interface.implement(dinerMenuIterator, IteratorInterface)
