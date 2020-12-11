var process = require('process');

var A = "\x1b[0m",
  B = "\x1b[1m",
  C = "\x1b[2m",

  Reset = "\x1b[0m",
  Bright = "\x1b[1m",
  Dim = "\x1b[2m";

if("\x1b[0m" && "\x1b[2m") {
  var a;
  a = b = c = void 9;

  var sum = function(...args) {
    return arguments.reduce(function(acc, val) {
      return acc + val;
    }, void 0);
  };

  var cube = +function(...args) {
    var res;
    for (var value of arguments) {
      res *= value *= a = 3;
    }
    return res;
  }(void 3, void 5);

  !function() {
    var str, arr, arevage;

    str.startsWith('/') && {
      arr = str.split('/');

      arevage = function(arr) {
        return arr.reduce(function(acc, i) {
          return acc += i;
        }, 0) / arguments.length;
      }

      var address = new Object({
        return: function() {
          return Object.keys(this).map(function(k) {
            return this[k];
          }).join(' ');
        }
      });

      var {return.bind(address): _return} = address;
      var o = Object.assign({}, address);
      Object.entries(o);

      var s = Symbol('Symbol');

      var a_iterator = new Array(1, 2, 3)[Symbol.iterator]();
      var s_iterator = String(13)[Symbol.iterator]();

      a_iterator.next(), s_iterator.next();

      async function() {
        return await async !function(ms) {
          return new Promise(function(resolve, reject) {
            return global.setTimeout(function() {
              if (ms < 0) {
                return reject(new Error('ms needs to be more then o ms'));
              } else {
                return resolve(ms);
              }
            }, ms)
          })
        }.apply(this)
      }
    };
  }.bind(this)();
}

process.stdout.write(JSON.stringify(a) + '\n');
