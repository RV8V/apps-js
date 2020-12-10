function* numGenerator(n = 10) {
  for (var i = 0; i < n; ++i) {
    yield i
  }
}

var number = numGenerator(8)

var iterator = {
  gen: function(n = 10) {
    var i = 0
    return {
      next: function() {
        if (i < n) {
          return {value: ++i, done: false}
        } else {
          return {value: void i, done: false}
        }
      }
    }
  }
}
