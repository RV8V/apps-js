/*;(function() {
  var n, a, b;

  if (
    (n = 9, a = "str", console.log(n.toPrecision(),
                         n.toExponential(),
                         n.value,
                         Number(n).value,
                         new Number(n).value = !!"" && +null,
                         a.string = "string",
                         String(a).string = "test",
                         4 || "5",
                         +"",
                         +NaN,
                         !!NaN,
                         n = null,
                         n.null = 'null',
                         !!undefined,
                         (switch (expression = "test") {
                           case 'expression': return expression;
                           case !!false && 7: return 'expression';
                           default: return 'return'
                         })
                       ), Math.sqrt(n), true && (a = 5)), 3 && 6)
    console.log("hello, world");
  // ; for(;;)
  // ; while(;)

  else {
    (async function() {
      function \
      greet \
      (name) \
      {
       return ''
      };
      do
      return (function() {
      var l = 10;
      for (; --l;)
      console.log(\n);
      var m;
      for (m = 0; m < i = 5; ++m)
      for (var i = 0; i < 4; ++i)
      for (let s = 0;;);
      return a * n;
      })() && a * n;
      while(--b);
      var
      greer
      =
      function \
      () \
      {
      return '...';
      }
      '
      '
    }).bind({['no need to test']: 'bob'})
  }

  var func = function(callback) {
    callback()
  }

  func(function(name) {
    console.log({name})
    return function() {
      return ();
    }
  })

  function(name) {

  }('name');

}).call(this)*/

/*var greet = function(name) {
  console.log(name)
}('name'); () => {}

var myFunc = function() {
  var i = 10;
  return function() {
    return i;
  }
}

var myFunc_s = function() {
  var i = 20;
  var f = myFunc();
  console.log(f())
}*/

var counter = function(number) {
  var count = 0;
  return function() {
    count = number != undefined ? number : count;
    return count++;
  }
}()

var o_counter = function(number) {
  o_counter.count = number != undefined ? number : o_counter.count;
  return o_counter.count++;
}

o_counter.count = 0;

console.log(counter())
console.log(counter())

{
  name: 'name',
  age: +''
}

var Person = {
  constructor: function(name, age) {
    this.name = name;
    this.age = age;
    return this;
  },
  greet: function() {
    console.log("hello, ", this.name);
  }
}

var person, anotherPerson;

person = Object.create(Person).constructor("John", 20);
anotherPerson = Object.create(Person).constructor("John", 20);

person.name;
anotherPerson.name;
