const R = require('ramda')

const compose = (...fns) => param => fns.reduceRight((val, f) => f(val), param)

const f = () => {}
const g = () => {}
const h = () => {}

/** @Associative */

compose(f, compose(g, h)) === compose(compose(f, g), h);

const replace = R.curry((what, replacement, s) => s.replace(what, replacement))
const map = R.curry((f, xs) => xs.map(f))
const join = R.curry((joinSymbol, xs) => xs.join(joinSymbol))
const split = R.curry((separator, s) => s.split(separator))
const reduce = R.curry((f, state, xs) => xs.reduce(f, state))
const add = R.curry((a, b) => a + b)
const sortBy = R.curry((f, xs) => xs.sort(f))
const concat = R.curry((a, b) => a.concat(b))
const append = R.curry((s1, s2) => s2.concat(s1))

const head = xs => xs[0]
const toLowerCase = s => s.toLowerCase()
const toUpperCase = s => s.toUpperCase()

/** @Not Point-free style because we remind data: word */

const snakeCaseNotPointFree = word => word.toLowerCase().replace(/\s+/ig, '_');

/** @Point-free style because we do not remind data: word */

const snakeCasePointFree = compose(replace(/\s+/ig, '_'), toLowerCase);

const initialsNotPointFree = name => name.split(' ').map(compose(toUpperCase, head)).join('. ');
const initialsPointFree = compose(join('. '), map(compose(toUpperCase, head)), split(' '))

console.log({
  initialsNotPointFree: initialsNotPointFree('hello world'),
  initialsPointFree: initialsPointFree('hello world'),
})

/** @Debugging by function Trace */

const trace = R.curry((tag, x) => (console.log({ tag, x } ), x))

const dasherize = compose(
  join('-'),
  toLowerCase,

  trace('after split'),

  split(' '),
  replace(/\s{2,}/ig, ' '),
);

/** @dasherize('The world is a vampire'); error here */

const dasherizeNormal = compose(
  join('-'),

  map(toLowerCase),
  trace('after split'),

  split(' '),
  replace(/\s{2,}/ig, ' '),
);

dasherizeNormal('The world is a vampire');

/***********************@Exercises***********************/

const last = cars => cars[cars.length - 1]
const prop = R.curry((prop, obj) => obj[prop])

const cars = [
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: 'Mercedes W-223',
    horsepower: 450,
    dollar_value: 3000000,
    in_stock: true,
  }
]

const isLastInStock = (cars) => {
  const lastCar = last(cars);
  return prop('in_stock', lastCar);
};

const isLastInStockCompose = compose(prop('in_stock'), last)

console.log({ isLastInStock: isLastInStock(cars), isLastInStockCompose: isLastInStockCompose(cars) })

/*******************************************************/

const average = xs => reduce(add, 0, xs) / xs.length;
const averageR = R.converge(R.divide, [R.sum, R.length])

const averageDollarValue = (cars) => {
  const dollarValues = map(c => c.dollar_value, cars);
  return average(dollarValues);
};

const averageDollarValueCompose = compose(average, map(prop('dollar_value')))

console.log({ average: average([1, 2, 3, 4]), averageR: averageR([1, 2, 3, 4]) })
console.log({ averageDollarValue: averageDollarValue(cars), averageDollarValueCompose: averageDollarValueCompose(cars) })

/*******************************************************/

const fastestCar = (cars) => {
  const sorted = sortBy(car => car.horsepower)(cars);
  const fastest = last(sorted);

  return concat(fastest.name, ' is the fastest');
};

const fastestCarCompose = compose(
  concat(R.__, ' is the fastest'),
  x => x.name,
  last,
  sortBy(car => car.horsepower)
)

const fastestCarComposeNext = compose(
  append(' is the fastest'),
  prop('name'),
  last,
  sortBy(prop('horsepower'))
)

console.log({
  fastestCar: fastestCar(cars),
  fastestCarCompose: fastestCarCompose(cars),
  fastestCarComposeNext: fastestCarComposeNext(cars)
})
