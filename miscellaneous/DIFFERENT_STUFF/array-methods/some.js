'use strict'

Array.prototype.mysome = Array.prototype.mysome || function(callback) {
  for (var i = 0; i <= this.length; ++i) {
    if (callback(this[i], i, this)) {
      return true
    } else return false
  }
}

{
  const numbers = [1, 2, 3]
  const result = numbers.mysome(item => {
    return item > 0
  })

  console.log({ result })
}

{
  const numbers = [1, 2, 3]
  const result = numbers.some(async item => {
    return item + item
  })

  console.log({ result })
}
