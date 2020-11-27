

const f = o => Object.keys(o).reduce((hash, key) => (hash[key] = o[key] + 1, hash), {})
const fn = o => ({...args} = o, args.reduce((hash, key) => (hash[key] = o[key] + 1, hash), {}))

const generate = (length, characters) => {
  let res = ''
  const range = characters.length
  for (let i = 0; i < length; i++) {
    const key = Math.floor(range * Math.random())
    res += characters[key]
  }
  return res
}

//console.log(generate(4, 'dfkfkgggg'))
//console.log(fn({ a: 10 }))

const o = {
  m1: x => [x],
  m2: function (x, y) {
    return [x, y];
  },
  m3(x, y, z) {
    return [x, y, z];
}
}

//console.log(Object.entries(o))

const m = iface => Object.entries(iface)
  .reduce((res, cur) => {
    const value = cur[1];
    console.log({cur, value})
    if (typeof value === 'function') {
      res.push([cur[0], value.length]);
    }
    return res;
  }, []);
//m(o)

//console.log('1.2.3.4.5'.split('.').reverse())

const ipTpInt = (ip = '127.0.0.1') => ip.split('.')
 .reverse().reduce((acc, val, i) => acc + Number(val) << i * 8, 0)

//console.log(ip())

let b = 5
//console.log(b = b << 0)

const ma = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
//console.log(Math.max(...ma.flat(2)))
const persons = {
     lenin: { born: 1870, died: 1924 },
     mao: { born: 1893, died: 1976 },
     gandhi: { born: 1869, died: 1948 },
     hirohito: { born: 1901, died: 1989 },
   }

//console.log(Object.keys(persons).reduce((hash, name) => (hash[name] = persons[name].died - persons[name].born, hash), {}))



const f2 = (a = [], f) => (f = i => a[i], f.push = s => a.push(s), f.pop = a.pop(), f)

console.log(f2([1,2,3]))
const arr1 = [3,4,5]
arr1.pop(); arr1.push('1234')
console.log(arr1)

const o = new Object({ a: 10, d: 20, o: {} })

const f = o => Object.keys(o).
  reduce((hash, key) => (hash[key] = typeof o[key], hash), [])


const fn1 = new Function
  ('...args', 'return args.filter(val => typeof val === "number").reduce((val, acc) => acc + val) ')
console.log(fn1(1,2,3, 10, {}, 'q'))

//=========================


const arr = [1,2,3,4,5,6]
const arr1 = [3,4,5,6,7,8]

const difference = (s1, s2) => {
  let s = []
  for (let i = 0; i < s1.length; i++) {
    s2.includes(s1[i]) ? s : s.push(s1[i])
  }
  return s
}


const f = (a, i) => a.indexOf(i) !== 1 ? (a.splice(a.indexOf(i), 1), a) : a
console.log(f([1,2,3,5], 7))

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
//const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

//const pipe = (...fns) => (...args) => (i = 0, fns.reduce((acc, f) => f(acc), args[i++]) )

const pipe = (...fns) => (...args) => (i = 0, fns.filter(f => f instanceof Function).reduce((acc, f) => f(acc), args[i++]) )


const d = x => x + 2
const t = v => v + 3

// 'memoize'

/*
function Memoize(o = {}) { this.o = o }
Memoize.prototype.run = function() {}
Memoize.prototype.calculateKey = function(...val) {
  //const key = val => '<' + JSON.stringify(val) + ' ' + typeof val + '>'
  return ((...args) => args.map( val => '<' + JSON.stringify(val) + ' ' + typeof val + '>'  ))(val);
}

const e = new Memoize(o = {a: 10})
console.log(e.calculateKey('hello'))

const Memoized = class {
  constructor(fn = new Funtion()) {
    this.fn = fn
  }
  memoize(...args) {
    const cache = new Map()
    const record = cache.get(key)
    if (record) return val
    cache.set(key, this(fn(...args)))
    return cache.get(key)
  }

}

Object.assign(cache, )

const key = val => '<' + JSON.stringify(val) + ' ' + typeof val + '>'
const funcForKey = (...args) => args.map(key).join('|');
console.log(funcForKey('field'))






Memoized.prototype.memoize = function(fn) {
  const cache = {};
  const memoized = function(...args) {
    const record = cache[key]
    if (record) return record
    const val = cache[key]
    cache[key] = fn(val)
    return res
  };

  Object.setPrototypeOf(memoized, Memoized.prototype);
  return Object.assign(memoized, fields);
};


if (!Object.assign) {
  Object.assign = function(o1, o2) {
    for (const key in o1) {
      o2[key] = o1[key]
    }
    return o2
  }
}


Memoize.prototype.calculateKey = function(...val) {
  //const key = val => '<' + JSON.stringify(val) + ' ' + typeof val + '>'
  return ((...args) => args.map( val => '<' + JSON.stringify(val) + ' ' + typeof val + '>'  ))(val);
}
*/
/*
const key = val => '<' + JSON.stringify(val) + ' ' + typeof val + '>'
const funcForKey = (...args) => args.map(key).join('|');
console.log(funcForKey('field'))

const memoize = fn => {
  const cache = {};
  return (...args) => {
    const val = cache[key];
    if (val) return val;
    const res = fn(...args);
    cache[key] = res;
    return res;
  };
};

const memoize1 = (fn, cache) => (...args, val) => (val = cache[key], val ? val : (cache[key] = val, fn(val)))
const memoize2 = (fn, cache) => (...args) => cache[key] ? (console.log('from cache'),cache[key]) : (console.log('calculating'), cache[key] = cache[key], fn(cache[key]))
const f = a => a + 1
const mSumSeq = memoize2(f);

console.log('Value:', mSumSeq(2, 5));
console.log('From cache:', mSumSeq(2, 5));
console.log('Calculated:', mSumSeq(2, 6));
*/

// metjods
'use strict';

const reduce = (reducer, arr, initial) => {
  let acc = initial === undefined ? arr.unshift() : initial;
  for (let i = 0, { length } = arr; i < length; i++)
    acc = reducer(i, arr[i]);
  return acc;
}

const sii = (a, b) => a + b
const arr = [1,2,3,4]
//const { length } = arr
const { length, name } = sii
//console.log({ length, name })

const res = reduce(sii, arr, )
console.log(res)

const forEach1 = function(fn, arr) {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr)
  }
}

const map = function(fn, arr) {
  let a = []
  for (let i = 0; i < arr.length; i++) {
    a.push(fn(arr[i], i, arr))
  }
  return a
}

const filter = function(fn, arr) {
  let a = []
  for (let i = 0; { length } = arr; i++) {
    if (fn(arr[i], i, arr)) {
      a.push(arr[i])
    }
  }
  return a
}

const find = function(fn, arr) {
  let indexFined
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      indexFined = arr[i]
      break;
    }
  }
  return indexFined
}

console.log(find(n => n === 3 ), [2,3,4,5])

const reduce1 = function(fn, arr, initial = 0) {
  let acc = initial === undefined ? arr.shift() : initial
  for (let i = 0, {length} = arr; i < length; i++) {
    acc = fn(acc, arr[i], arr)
  }
  return acc
}

// deepclone

const isPrimitive = e => e instanceof Object;

const deep = obj => {
  if (!isPrimitive) return obj;
  const hash = {};
  for (const key in obj) {
    hash[key] = obj[key];
    deep(obj[key]);
  }
  return hash;
}

const f = o => Object.keys(o).reduce((hash, key) => (hash[key] = o[key], hash), {})
const deep2 = (i, hash) => !isPrimitive ? i : Object.keys(i).reduce(key => (hash[key], deep(key)))
//const deep3 = (o, hash) => typeof o !== 'object' ? Object.keys(o).reduce(key => hash[key] = o[key], hash) :

const o1 = { 'f': new Set([1,2,4, Array.of(1,2,3) ,4,5]), 'field': {'field2': { field: 10, o: Buffer.from('12'), o1: { a: [1,2,3,4] } }}}
//console.dir(deep(o1), {depth: 6})
//console.log(new Set([1,2,4, Array.of(1,2,3) ,4,5]))


// async composeAsync

const f1 = (arg1, cb) => cb(arg1 + 10)
const f2 = (arg2, cb) => cb(arg2 * 4)
const f4 = (arg2, cb) => cb(arg2 - 3)

const f12 = arg1 => arg1 + 1
const f22 = arg2 => arg2 * 1
const f42 = arg2 => arg2 - 1

//const f3 = compose(...fns)

const comp = (...fns) => (...args) => {
//  let res = fns[0](x)
  let res = fns.shift()(...args)
//  console.log({res})
  //console.log(fns.length)
  if (fns.length === 0) return res
  for (let i = 0; i < fns.length; i++) {
    res = fns[i](res)
  }
  return res
  //else comp(...fns)(res)
}

console.log(comp(f12, f22, f42)(5))

const composeAsync = (...afns) => x => {
  let res = afns[0](x)
  if (afns.length === 0) return f
  for (let i = 0; i < afns.length; i++) {
    res = afns[i](Promise.resolve(res))
  }
  return res
}


async function w1(a) { console.log('w1', a); return a * 3 }
async function w2(a) { console.log('w2', a); return a + 4 }
async function w3(a) { console.log('w3', a); return a - 5 }


const composeAsync = (...afns) => x => {
  if (afns.length === 0) return res1
  let res1 = afns[0](x)
  for (let i = 1; i < afns.length; i++) {
    res1 = res1.then(afns[i])
  //  console.log(res1)
  }
  return res1
}

const v = composeAsync(w1, w2, w3)(1).then(res => console.log(`Result: ${res}`))
