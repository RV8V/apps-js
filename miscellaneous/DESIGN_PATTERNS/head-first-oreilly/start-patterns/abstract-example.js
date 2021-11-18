class Animal {
  constructor() {
    if (this.constructor === Animal) {
      throw new Error('abstract classes can not be initialized')
    }
  }

  say() {
    throw new Error('method say should be implemented')
  }

  eat() {
    console.log('eat method is not abstract')
  }
}

class Dog extends Animal {
  constructor() {
    super()
  }

  say() {
    console.log('implemented say method')
  }
}

class Cat extends Animal {}

const dog = new Dog()

// const animal = new Animal()
