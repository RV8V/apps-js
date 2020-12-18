'use strict'
const log = data => console.log(data)

log(void 'hello')
log(void(10))

/*
1. condition statements
*/
const o = { value: 10 }
const data = o.value !== undefined ? o.value : void 0
log(data)

/*
2. Immediately Invoked function Expression
*/
const result = void function life() {
  const doSth = function() {}
  doSth(); log('inside result')
  return 20
}()

log(result) // undefined

// it is the same
const res = (function life() {
  const doSth = function() {}
  doSth(); log(o.value)
  return 200
})()

log(res)

/*
examples
*/
const draft = void function fn() {
  const func = void function func() { return func.name }
  log(fn.name)
}()

/*
3. Non-leaking Arrow Functions
if there no use of returned value

button.click = () => void doSomething()
*/

/*
4. Asunchonous Call with void
*/

void async function someFunction() {
  try {
    const response = await fetch('someAPI')
    const result = await response.result()
    log(result, 'void')
  } catch(err) {  return process.stderr.write(err.name) + log('error') + '\n' }
}()


// just stuff
const object = { value: 'Hello', age: 30 }
const object1 = { name: 'John', born: 'N' }
const general = { ...object, ...object1 }
log({ general })

const string = 'Hello,Alalam,US, 1000'
const { 0: greeting, 2: country, 1: city } = string.split(',')
console.log(greeting)

const where = {
  'name': 'pirat',
  'mobile': '888-999',
  'emeil': 'bandit@gmail.com'
}

console.table(where)
