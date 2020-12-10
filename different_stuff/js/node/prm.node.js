module.exports = function _Promise(executor) {
  return new Promise(function(resolve, reject) {
    if (executor.apply(void 0, [this._resolve.bind(this), this._reject.bind(this)])) {
      return resolve();
    } else {
      this._finallyHandler();
      return reject(this._errorHandler(new Error('something went wrong')));
    }
  })

  this._queue = [];
  this._errorHandler = this._finallyHandler = function() {};

  this._resolve = function(...args) {
    this._queue.forEach(function(callback) {
      args = callback(...args);
    });
    this._finallyHandler();
  }

  this._reject = function(err) {
    this._errorHandler(err);
    this._finallyHandler();
  }

  this.then = function(callback) {
    this._queue.push(callback);
    return this;
  }

  this.catch = function(callback) {
    this._errorHandler = callback;
    return this;
  }

  this.finally = function(callback) {
    this._finallyHandler = callback;
    return this;
  }
}
