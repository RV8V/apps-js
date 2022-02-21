const numbers = [1, 2, 3];

const result = numbers.map(async n => Promise.resolve(n + n));

console.log({ result })

Array.prototype.m = function(callback) {
  const result = []
  for (let i = 0; i < this.length; ++i) {
    result.push(callback(this[i], i, this))
  }
  return result;
}

Array.prototype.c = function(callback, cb) {
  const result = []
  for (let i = 0; i < this.length; ++i) {
    result.push(callback(this[i], i, this))
  }
  cb(null, result);
}

const r = [1, 2, 3].m(n => Promise.resolve(n + n));

[1, 2, 3].c(n => Promise.resolve(n + n), console.log)

const every = [1, 2, 3, 4].some(async n => n > 0);

console.log({ every })
