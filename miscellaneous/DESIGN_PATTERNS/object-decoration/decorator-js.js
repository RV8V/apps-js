class Cat {
  meow() {
    return `${this.name} says meow`
  }
}

function specifiedFunction() {}

Object.defineProperty(Cat.prototype, 'meow', {
  value: specifiedFunction,
  enumerable: false,
  configurable: true,
  writable: true
})

function readonly(target, key, descriptor) {
  descriptor.writable = false
  return descriptor
}

class Cat {
  @readonly
  meow() {
    console.log('meow')
  }
}

let descriptor = {
  value: specifiedFunction,
  enumerable: false,
  configurable: true,
  writable: true
};

descriptor = readonly(Cat.prototype, 'meow', descriptor) || descriptor;
Object.defineProperty(Cat.prototype, 'meow', descriptor);

const garfield = new Cat();
garfield.meow = () => { console.log('I want lasagne!'); };
