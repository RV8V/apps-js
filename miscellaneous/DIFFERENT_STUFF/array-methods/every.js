'use strict'

Array.prototype.myevery = Array.prototype.myevery || function(callback, context) {
  for (var i = 0; i < this.length; ++i) {
    if (!callback.call(context, this[i], i, this)) {
      return false
    } else return true
  }
}

{
  const numbers = [1, 2, 3, 4, 5]
  const result = numbers.every(item => {
    return item > 4
  })

  console.log({ result })
}

{
  const numbers = [11, 22, 33, 44, 55]
  const result = numbers.myevery(item => {
    return item > 4
  }, [50, 60])

  console.log({ result })
}
