const R = require('ramda')

/**
 * @R.bind return a function binded with passed context
 * @R.tap run a function and always returns passed parameter, 'return' in function is ignored
 */

function Greet(word) {
  this.word = word
}

Greet.prototype.greet = function(name) {
  return this.word + ', ' + name
}

const Greeter = {
  init: function(word) {
    return Object.assign({}, this, { word })
  },
  greet: function(name) {
    return this.word + ', ' + name
  }
}

const l = console.log

const greetier = Greeter.init('Hello')
const hello = new Greet('Hello')

l({
  one: hello.greet('Jane')
})

R.pipe(
  R.toUpper,
  greetier.greet,
  l
)('Jane')

R.pipe(
  R.toUpper,
  hello.greet,
  l
)('Jake');

R.pipe(
  R.toUpper,
  hello.greet.bind(hello),
  l
)('Jake');

R.pipe(
  R.toUpper,
  R.bind(hello.greet, hello),
  l
)('Jake');

const sayX = x => console.log('x is ' + x);
R.tap(sayX, 100);

const tap = x => x + 10
l(R.tap(tap, 20))

const log = R.bind(console.log, console)
R.pipe(R.assoc('a', 1), R.tap(log), R.assoc('a', 5))({ a: 4 })
