'use strinct'

const counterModule = (function() {

  let counter = 0,
      instance;

  const getCounter = function() {
    return counter;
  }

  const increaseCounter = function() {
    counter++;
    return instance;
  }

  const createInstance = function() {
    return {
      getCounter: getCounter,
      increaseCounter: increaseCounter
    };
  }

  return {
    getInstance: function() {
      return instance || (instance = createInstance());
    }
  }
})();

const _module = (function() {
  const createInstance = function() {
    return {}
  }

  return {
    getInstance: function() {
      return instance || (instance = createInstance());
    }
  }
})();

const instance = counterModule.getInstance();

console.log(require('util').inspect(instance, { depth: null }));
