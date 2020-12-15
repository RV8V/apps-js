var emulate = function(id, ms) {
  return new global.Promise(function(resolve) {
    return global.setTimeout(function() {
      return resolve(id);
    }, ms);
  });
}

var promises = new Array([
  global.Promise.resolve(0),
  emulate(1, 240),
  emulate(1, 240),
  emulate(1, 240)
]);

var old = async function() {
  for (var promise of await global.Promise.all(promises)) {
    process.stdout.write('old\n' + JSON.stringify(promise) + '\n');
  }
}

var modern = async function() {
  for await (var promise of promises) {
    process.stdout.write('modern\n' + JSON.stringify(promise) + '\n');
  }
}

old();
modern();

process.stdout.write(JSON.stringify(Object.getOwnPropertyDescriptors(emulate)));
process.stdout.write(JSON.stringify(Object.fromEntries(Object.entries(new Object({})))));

var t = function(base) {
  return base && base.value && base.value.amount;
}
