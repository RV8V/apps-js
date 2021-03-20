const str_ = 'aaassdddsaa'// -> '3a2s3d1s2a'

const f_ = str => {
  const res = []
  const arr = str.split('')

  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length; ++j) {
      if (arr[i] !== arr[j]) {
        console.log({ i: arr[i], j: arr[j] })
        res.push(i)
        res.push(arr[i])
      }
    }
  }
  console.log({ res })
  return res.join('')
}

console.log({ res: f_(str_) })

const e = eval('1+1')

console.log({ e })

const value = eval('let i = 0; ++i');

console.log({ value })

let a = 1;
eval('a = 3');
eval('console.log(a)');

eval('var x = 3; function f1() {}');
eval('console.log(typeof x, typeof f1)');

var code = '[';
var w = 0;
for (; w < 4; ++w) {
  code += w + ',';
}
code += w + ']';
eval('console.log(code)')

const str = 'aaassdddsaa'// -> '3a2s3d1s2a'

const f = str => {
  let res = ''
  let i = 0

  while(i < str.length) {
    for (var cout = 1; str[i] === str[i + cout]; cout++) {}
    res += cout + str[i]
    i += cout
    eval('console.log(res)')
  }
  return res
}

console.log({ result: f(str) })

const sum = (a, b) => {
  if (a instanceof Number) {
    console.log('yes')
  }

  console.log({
    what: a instanceof Number,
    constructor: a.constructor,
    flag: a.constructor === Number
  })
}

const t = (a, b, errors) => (
  errors = [],
  a.constructor !== Number && errors.push('a should be number'),
  b.constructor !== Number && errors.push('b should be number'),
  errors.length ? errors : a + b
)

console.log({ res: t(1, 2) })

const duckFactoryLike = ConstructorName => class {
  constructor() {}

  fly() {
    console.log(`${ConstructorName} can fly`)
  }

  walk() {
    console.log(`${ConstructorName} can walk`)
  }
}

const Duck = duckFactoryLike('Duck')
const AirPlane = duckFactoryLike('AirPlane')

const checkForDuckInterface = object => {
  if (object.fly.constructor === Function && object.walk.constructor === Function) {
    return true
  } else {
    return false
  }
}

const run = duckLikeInstances => {
  for (let i = 0; i < duckLikeInstances.length; ++i) {
    const duck = duckLikeInstances[i]
    if (checkForDuckInterface(duck)) {
      duck.fly()
    }
  }
}

console.log({
  duck: checkForDuckInterface(new Duck()),
  airplane: checkForDuckInterface(new AirPlane()),
  run: run([new Duck(), new AirPlane()])
})
