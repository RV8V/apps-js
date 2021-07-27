const R = require('ramda')

/**
 * OOP + FP. Composing Constructors
 * @R.construct  - wrapper for a constuctor function(constructor of prototype). Used to construct instances withour usage of 'new'. Because 'new' keyword does not usage in pipelines(of its nature - syntax error)
 * @R.constructN - wrapper for variadic functions(...arguments)
 * @R.invoker    - returns a function with parameters: count of args, function name, ... target object
 * Usage to interact with library or old code with was written in Object Oriented Style, where we have classes. Interact not to rewrite classes on functions
 *
 * new ClassName(...) does not compose
 */

const l = R.bind(console.log, console)

/************************************************************/

class FullName {
  constructor(fname, lname) {
    Object.assign(this, { fname, lname })
  }

  toString() {
    return [this.fname, this.lname].filter(Boolean).join(', ')
  }
}

const makeFullName = R.construct(FullName)

const janeImp = new FullName('Jane', 'Bod')
const janeDec = makeFullName('Jane')('Bod')

/**
 * R.pipe(
 *   R.concat('string'),
 *   ...
 *   new FullName('Jane').toString()
 * )
 */

/************************************************************/

const sliceFrom = R.invoker(1, 'slice')
const sliceFrom6 = R.invoker(2, 'slice')(6)

const dog = {
  speak: async () => 'Woof!'
}

const speak = R.invoker(0, 'speak');

l({
  imp: janeImp,
  dec: janeDec,
  length: FullName.length,
  sliceFrom: sliceFrom(6, '0123456789'),
  sliceFrom6To8: sliceFrom6(8, '0123456789'),
  slice: '0123456789'.slice(6, 8),
  speak: speak(dog).then(l)
})

/************************************************************/

function Animal(kind) {
  this.kind = kind
}

Animal.prototype.returnKind = function() {
  return `It is a ${this.kind}`
}

const AnimalConstructor = R.construct(Animal)

const pig = AnimalConstructor('pig')

const kinds = ['tiger', 'bear', 'owl']
const returnKind = R.invoker(0, 'returnKind')
const constructNewAnimalsAndReturnKind = R.compose(returnKind, AnimalConstructor)

const result = R.map(constructNewAnimalsAndReturnKind, kinds)

l({ result })

/************************************************************/

class ComplexFullName {
  constructor(...parts) {
    this.parts = parts
  }
}

const complex = new ComplexFullName('jane', 'goc', 'a-okd')
const normal = new FullName('jane', 'goc')

const makeComplexNameN = R.constructN(3, ComplexFullName)
const makeComplexName = R.construct(ComplexFullName)

l({
  complexLenght: ComplexFullName.length,
  normal: FullName.length,
  makeComplexName: makeComplexName('jane', 'mic', 'a-si'),
  makeComplexNameN: makeComplexNameN('jane', 'mic', 'a-si'),
})

/************************************************************/

function Salad() {
  this.ingredients = arguments
}

Salad.prototype.recipe = function() {
  l({ i: this.ingredients, values: Object.values(this.ingredients) })
  
  const instructions = R.map(ingredient => `add a dollop of ${ingredient}`, this.ingredients)
  return R.join('\n', instructions)
}

const ThreeLayerSalad = R.constructN(3, Salad)

const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');

l({ recipe: salad.recipe() })
