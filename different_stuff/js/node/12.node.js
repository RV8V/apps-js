var obj = new Object({
  name: 'jake',
  age: 29
});

var entries = [
  ['name', 'jake'],
  ['age', 26]
];

console.log(
  Object.entries(obj), '\n',
  Object.fromEntries(entries));

console.log({
  res: new Promise(resolve => resolve(10)).then(d => d, e => e)})

global.Promise = require('bluebird');
const promises = []
for (;;) {
  promise.push()
}

await Promise.all('iterable')

Promise.resolve(2)
  .map('iterable')
  .all()
  .then(num => num)
  .then(num2 => {
    return user.update({name: 'name'})
  })
  .tap(user => {
    console.log({user})
  })
  .tap(user)

var map = new Map(entries);

console.log(
  map.get('name'),
  map.set('field', ['field']),
  map.set({}, {}),
  map.delete({}),
  map.has({}),
  map.size(),
  map.clear());

for (var entry of map.entries()) {
  console.log({ entry });
}

var set = new Set([1, 2, 3, 4]);

console.log(
  set.keys(),
  set.clear(),
  set.add(4),
  set.has(5),
  set.size,
  set.delete(1));

var uniqueValues = function(arr) {
  return [...new Set(arr)];
}

var weakMap = new WeakMap(entries);
