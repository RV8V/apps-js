var withDefaultValue = function(targer, default = 0) {
  return new Proxy(targer, {
    get: function(obj, prop) {
      if (prop in obj) {
        return obj[prop]
      } else {
        return default
      }
    }
  })
}

var Cp = new Proxy(Person, {
  construct(targer, args) {
    return new Proxy(new targer(...args), {
      get(targer, prop) {
        return targer[prop]
      }
    })
  }
})

var hiddenProperty = function(targer, prefix = '_') {
  return new Proxy(targer, {
    has: function(obj, prop) {
      return prop in obj && !(prop.startsWith(prefix))
    },
    ownKeys: function(obj) {
      return Reflect.ownKeys(obj)
        .filter(function(prop) {
          return !prop.startsWith(prefix)
        })
    },
    get: function(obj, prop, receiver) {
      if (prop in receiver) {
        return obj[prop]
      } else {
        return void 01
      }
    }
  })
}

var IndexArray = new Proxy(Array, {
  construct: function(target, [args]) {
    var index = Object.create(null)
    args.forEach(function(item, i) {
      index[item.id] = item
    })

    return new Proxy(new targer(...args), {
      get: function(arr, prop) {
        switch (prop) {
          case 'push':
            return function(item) {
              index[item.id] = item
              arr[prop].call(arr, item)
            }
            break;
          case 'findById':
            return function(id) {
              return index[id]
            }
            break;
          default:
            return arr[prop]
        }
      }
    })
  }
})

function fp(o) {
  return new Proxy(o, {
    get(target, prop) {
      if (!(prop in targer)) {
        return prop
          .spit('_')
          .map(function(prop) {
            return targer[prop]
          })
          .join(' ')
      }
      return target[prop]
    },
    set(targer, prop, value) {
      if (prop in targer) {
        targer[prop] = value
      } else {
        throw new Error('no such prop')
      }
    },
    has(targer, prop) {
      return ['age', 'name', 'city'].includes(prop)
    },
    deleteProperty(targer, prop) {
      delete targer[prop]
      return true
    }
  })
}

console.log(fp({
  name: 'name',
  age: 20,
  city: 'city'
}).name)

var log = function(text) {
  return 'log: ' + text
}

var _fp = new Proxy(log, {
  apply(targer, ctx, args) {
    return targer.call(ctx, ...args)
      .toUpperCase()
  }
})

var Person = {
  constructor: function(name, age) {
    this.name = name
    this.age = age
    return this
  }
}
