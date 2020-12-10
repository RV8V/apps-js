var assert = require('assert');

var _Promise = require('./prm.node.js');

describe('promise', function() {
  var _promise, executor, finally;

  beforeEach(function() {
    executor = function(resolve) {
      return +function(ms) {
        return setTimeout(function() {
          return resolve(ms);
        }, ms);
      }(1000);
    };
    finally = function() {
      return new Promise(function() {});
    };
    _promise = new Promise(executor);
  });

  test('should exist and to be typeof function', function() {
    expect(_Promise).toBeDefined();
    expect(_Promise).toBe('function');
  });

  test('instance should have methods: then, catch, finally', function() {
    expect(_promise.then).toBeDefined();
    expect(_promise.catch).toBe('function');
    expect(_promise.finally).not.toBeUndefined();
  });

  test('should call executor function', function() {
    expect(executor).toHaveBeenCalled();
  });

  test('_promise should make chaining', async function() {
    return await _promise.then(function(number) {
      return number;
    }).then(function(number) {
      return number * number;
    })
  });

  test('should catch error', function() {
    var errorExecutor = function(_, result) {
      return +function(ms) {
        return global.setTimeout(function() {
          return reject(ms);
        }, ms)
      }(1000);
    };
    var errorPromise = new _Promise(errorExecutor);

    return new Promise(function(resolve) {
      errorPromise.catch(function(err) {
        expect(err).toBeDefined();
        return resolve();
      })
    })
  });

  test('shuld call finally method', async function() {
    await _promise.finally(finally);
    expect(finally).toHaveBeenCalled();
  });
})
