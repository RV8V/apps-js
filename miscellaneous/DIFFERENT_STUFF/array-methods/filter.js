'use strict'

Array.prototype.myfilter = Array.prototype.myfilter = function(callback) {
  const arr = []
  for (var i = 0; i < this.length; ++i) {
    if (callback(this[i], i, this)) {
      arr.push(this[i])
    }
  }
  return arr
};

{
  const numbers = [1, 2, 3, 4, 5]
  const arr = numbers.filter(item => item > 2)
  console.log({ arr })
}

{
  const numbers = [1, 2, 3, 4, 5]
  const arr = numbers.myfilter(item => item > 2)
  console.log({ arr })
}
