'use strict';

console.assert(true, 'ok')
try {
  console.assert(0, 'bad')
} catch(e) {
  console.log('error');
}

// tracing трасировка
function foo() {
  function boo() {
    console.trace()
  }
  boo()
}
foo()

// grouping
console.log('before 1st group')
console.group('hello')
console.log('inside 1st group')
console.group('Inner group')
console.log('hello from inner group')
console.groupEnd('Inner group')
console.log('Outside inner group')
console.groupEnd('hello')
console.log('after all\n')

// counting
console.count('hello')
console.count('hello')
console.countReset('hello')
console.count('hello')

// time out
console.time()
for (let i = 0; i < 100; i++) i += 2
console.timeEnd()

// assert
function greaterThan(a, b) {
  console.assert(a > b, 'Its wrong')
}
greaterThan(1, 2)

// profile ??
const itNeedsToBeProfiled = () => {
  console.profile("itNeedsToBeProfiled()")
  return 10
  console.profileEnd()
}
itNeedsToBeProfiled()

// clear console
//console.clear()


// stdout
const write = s => process.stdout.write(s)
write('last one called\n')
