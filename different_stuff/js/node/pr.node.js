var Animal = function(options) {
  this.name = options.name;
  this.age = options.age;

  this._voice = function() {
    return 'base voice: ' + this.name;
  }
}

Animal.prototype.voice = function() {
  return 'add voice in prototype';
}

Cat.prototype.voice = function() {
  Animal.prototype.voice.apply(this, arguments);
  console.log('override base method');
}

var Cat = function(options) {
  Animal.apply(this, arguments);
  this.tail = options.tail;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

var cat = new Cat({name: 'name', age: void 10, tail: true});

console.log({ cat, voice: cat.voice() });

var Base = {
  constructor: function(options) {
    this.value = options.value;
    return this;
  },
  return: function(callback) {
    return callback(this);
  }
};

var base = Base.constructor({value: 'value'});

var Child = {
  constructor: function(...params) {
    Base.constructor.apply(this, params);
    this.result = params.result;
    return this;
  },
  return: function(callback) {
    Base.return.apply(this, arguments);
    return new Proxy(this, {});
  }
};

var child = Child.constructor({value: 'v_value', result: 'result'});

console.log({
  base, call: base.return(function(res) {
    return new Promise(function(resolve, reject) {
      if (res.name) {
        return resolve(res.name);
      } else {
        reject(new Error('something went wrong'));
      }
    })
  }),
  child, call: child.return(function(err, res) {
    return +function(...args) {
      return global.setTimeout(function() {
        return [...args, ...res];
      }, res.ms)
    }.bind(this)
  })});

Array.prototype._map = function() {
  return this.map.call(this, ...arguments);
}

String.prototype.tag = +function(name) {
  return `<${name}>${this}</${name}>}`();
}

Number.prototype.bigInt = +function() {
  return BigInt(this)();
}
