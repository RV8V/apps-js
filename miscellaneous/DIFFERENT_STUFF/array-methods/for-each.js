'use strict'

Array.prototype.foreach = Array.prototype.foreach || function(callback) {
  for (let i = 0; i < this.length; ++i) {
    callback(this[i], i, this)
  }
}

{
  const arr = [1, 2, 3, 4, 5]
  let sum = 0
  let s = 0

  arr.forEach(e => {
    sum = sum + e
  })

  console.log({ sum })
}

{
  const arr = [1, 2, 3, 4, 5]
  let s = 0

  arr.foreach((item, i, arr) => {
    s = s + item + arr[i]
  });

  console.log({ s })
}
