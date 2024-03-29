/**
 * @const either = right || left;
 */

const right = (x) => ({
  map: (f) => right(f(x)),
  inspect: () => `right(${x})`,
  fold: (f, g) => g(x),
  ap: (f) => f.map((v) => x(v)),
});

const left = (x) => ({
  map: (f) => left(x),
  inspect: () => `left(${x})`,
  fold: (f, g) => f(x),
  ap: (f) => f.map((v) => v),
  left: true,
});

/**
 * @usage
 */

// left(10)
//   .map((x) => x + 1)
//   .fold(console.log, console.log);

module.exports = { right, left };
