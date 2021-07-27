const R = require('ramda')

const map = R.curry((f, xs) => xs.map(f))
const prop = R.curry((prop, obj) => obj[prop])
const always = R.curry((a, b) => a)

const trace = R.curry((tag, x) => (console.log({ tag, x } ), x))

/** @Imperative */

const cars = [
  { name: '1n', cost: 2n },
  { name: '2n', cost: 3n },
]

const namesImp = []
for (let i = 0; i < cars.length; ++i) {
  namesImp.push(cars[i].name)
}

/** @Declarative */

const namesDec = cars => cars.map(car => car.name)
const namesDecNext = map(prop('name'))
const namesDecNextCompose = R.compose(map(prop('name')), R.identity)

console.log({ namesImp, namesDec: namesDec(cars), namesDecNext: namesDecNext(cars), compose: namesDecNextCompose(cars) })

/*******************************************************/

const NameSpace = {
  trace: R.curry((tag, x) => (console.log({ tag }), x)),
  getJson: R.curry((callback, url) => callback(url))
}

const url = t => `http://json-get/${t}`

const app = R.compose(NameSpace.getJson(NameSpace.trace('response')), url)

console.log({ app: app('hello') })
