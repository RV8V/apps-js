(function() {
  console.log(this, global)
  var a, b, range, result, j, ref, l, i, o, q, index, s, len2
  a = 10
  b = 30
  var _this = { this: 'this is test' }
  range = (function() {
    console.log(this)
    result = []
    for (j = 0; j <= 25; j++)
      result[j] = j
    return result
  }).apply(this);
  console.log({ range })
  var r = (function(param) {
    console.log({ param }, this)
  }).call(_this, 1);
  ref = [a, b], a = ref[1], b = ref[0]
  console.log('user' in ref)
  var indexOf
  indexOf = /*[].indexOf ||*/ function(item) {
    console.log({ item, i })
    for (var i = 0, l = this.length; i < l; i++) {
      console.log({ i, l })
      if (i in this && this[i] === item)
        return i
    }
    return -1
  }
  console.log(indexOf.call([1, 2, 3], 32))
  for (i = o = 0; o < 10; i = o++)
    console.log({ i, o })

  result = (function(f) {
    for (index = s = 0, len2 = this.length; s < len2; index = ++s) {
      if ((indexOf.call(this, 3)) >= 0) {
        return 'hello world'
      }
    }
  }).bind([1, 2, 3])(1)
  console.log({ result })
}).call(this)
