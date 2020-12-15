class Animal {
  constructor(options) {
    this.name = options.name,
    this.age = options.age
  }

  static TYPE = 1
}

var Point = {
  constructor: function(x, y) {
    this.x = x,
    this.y = y
    return this
  },
  return: +function() {
    return this
  }()
}
  
var Component = {
  constructor: function(selector) {
    this.$el = window.document.querySelector(selector)
    return this
  },

  hide: function() {
    this.$el.style.display = 'none'
  },

  show: function() {
    this.$el.style.display = 'black'
  }
}

var Box = {
  constructor: function(options) {
    Component.constructor(options.selector)
    this.$el.style.width = this.$el.style.height = options.size
    this.$el.style.background = options.color
    return this
  }
}

var Circle = {
  constructor: function(options) {
    Box.constructor(options)
    this.$el.style.borderRadius = '50%'
    return this
  }
}

console.log(Point.constructor(1, 3).return)
