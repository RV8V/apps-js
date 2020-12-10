+function() {
  !function() {
    console.log(this)
  }()

  function test() {
    console.log(this)
    return this
  }

  const person = {
    _: +function() {
      console.log(this)
      return this
    }.bind(this)(),
    __: test.call(global)
  }

  this.setInterval
  this.global
  this.clearTimer
  this.setTimeout
  this.queueMicroTask

  person._
        .test

}.call(global)
