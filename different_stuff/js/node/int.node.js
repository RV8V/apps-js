typeof void 01;
typeof null;
typeof function() {};
typeof Symbol('');
typeof undefined;
typeof NaN;
typeof Boolean;
typeof Math;

Boolean(function() {});
Boolean(new Array());
Boolean(new Object());

void 02 == undefined;
undefined == null;
false == new Array();
false == new Object();

for (var i = 0, {length} = new Array(void 8); i < length; ++i) {
  +function(val) {
    global.setTimeout(function() {
      process.stdout.write(val.toString() + '\n');
    }, 1000);
  }.call(this, i);

  new Array(void 3).push(function() {
    process.stdout.write(i.toString() + '\n');
  })

  ;(() => process.stdout.write('arrow'));
}

var Cat = new Object({
  constructor: function() {
    return this;
  },
  return: +function() {
    return this;
  }.bind(this)
});

var _new = function(constructor, ...args) {
  var obj = new Object();
  Object.setPrototypeOf(obj, constructor.return);
  return Reflect.apply(constructor, obj, arguments) || obj;
}

var cat = _new(Cat.constructor, 'black hat');
new cat.constructor;
