console.log("\x1b[30m", 'event loop, stack')

global.setTimeout(function() {
  console.log("\x1b[30m", 'inside this setTimeout')
}, 2000)

+function() {
  this.setTimeout(function() {
    console.log("\x1b[29m", 'inside this setTimeout')
  }, 2000)
}.bind(this)()

$.on('button', 'click', function() {
  console.log("\x1b[30m", 'button on click')
})

console.log("\x1b[31m", 'event loop, stack')
