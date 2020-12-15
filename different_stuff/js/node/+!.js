+function() {
  (function() {
    console.log('()')
  })()

  !function() {
    console.log('!')
  }() 

  +function() {
    console.log('+')
    return 10;
  }();

  (() => {
    console.log('()()')
  })();

  /*!() => {
    console.log('tes string e')
  }();*/

  /*+() => {
    console.log('tes string f')
  }()*/

}.call(this)
