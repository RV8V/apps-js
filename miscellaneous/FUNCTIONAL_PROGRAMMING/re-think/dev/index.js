const R = require('ramda');

/**
 * @bind
 * @call
 * @apply
 */

const multiply = (x, y) => x * y;
const multiplyWithBind = multiply.bind(null, 2);

const multiplyForCall = (x) => (y) => x * y;
const multiplyForCallImp = multiplyForCall.call(null, 2);
const multiplyForApply = multiplyForCall.apply(null, [2]);
const multiplyWithRamda = R.curry(multiply);

console.log({
  multiplyWithBind: multiplyWithBind(3),
  multiplyForCallImp: multiplyForCallImp(3),
  multiplyForApply: multiplyForApply(3),
  multiplyWithRamda: multiplyWithRamda(2)(3),
});

/**
 * @example with fs
 */

const fs = require('fs');

const callback = (err, data) => {
  if (err) throw err;
  console.log({ data });
};

const applyFileName = (fileName) => fs.readFile(fileName, 'utf-8', callback);
const partialApply = (encoding, cb) => (fileName) =>
  fs.readFile(fileName, encoding, cb);

const readWithUtf8 = partialApply('utf-8', callback);

// fs.readFile('index.js', 'utf-8', callback);
// fs.readFile('../.gitignore', 'utf-8', callback);

// readWithUtf8('../.gitignore');
// applyFileName('../.gitignore');

const curryReadFile = R.curry(fs.readFile)(R.__, 'utf-8', callback);

// curryReadFile('../.gitignore');

const fileNames = ['../.gitignore', './index.js'];

fileNames.map(curryReadFile);
