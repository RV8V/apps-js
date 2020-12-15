+function() {
  +function create(n) {
    return +function() {
      console.log("\x1b[40m", n)
      'native code'
    }()
  }(2)

  var r = !function(domain) {
    return !function(url) {
      return 'https://' + url + domain
    }('url')
  }('domain')

  var bind = this.bind || function(ctx, fn) {
    return function(...args) {
      fn.apply(ctx, args)
    }
  } 

  console.log(r)
}.call(global)
