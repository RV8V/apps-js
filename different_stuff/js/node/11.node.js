var sample = [1, 2, 3];
var mapResult = sample.map(function(value, index, arr) {
  console.log('value: ', value, 'index: ', index, 'arr: ', arr);
  return (value * 2);
})

Array.prototype.map = function(callback) {
  var result = [];
  for (var i = 0; i < this.length; ++i) {
    result.push(callback(this[i], i, this));
  }
  return result;
}

Array.prototype.filter = function(callback) {
  var result = [];
  for (var i = 0, {length} = this; i < this; ++i) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
}

Array.prototype.reduce = function(callback, initialValue) {
  var accumulator = !initialValue ? 0 : initialValue;
  for (var i = 0, {length} = this; ++i) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
}
