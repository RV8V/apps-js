const R = require('ramda')

/**
 * @R.concat               - awaits two arguments
 * @Array.prototype.concat - awaits one arguments, second one is this
 * @Semigroup              - a + (b + c) = (a + b) + c
 */

const l = R.bind(console.log, console)

const Str = function(value) {
  this.value = value
}

Str.prototype.concat = function(str) {
  return new Str(this.value + str)
}

const String_ = {
  init: function(value) {
    return Object.assign({}, this, {
      value: value
    })
  },
  concat: function(str) {
    return String_.init(this.value + str)
  },
  getValue: function() {
    return this.value
  }
}

const string = new Str('hello, ')
const string_ = String_.init('hello, ')

l({
  strPrototype: string.concat('world'),
  strObjectLiteral: string_.concat('world').getValue(),
  concatArr: R.concat([1, 1], [3, 1]),
  prototypeConcat: [1, 1].concat([3, 1]),
  string: R.concat('str', 'ing')
})
