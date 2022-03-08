/**
 * @const either = right || left;
 */

const right = (x) => ({
  map: (f) => right(f(x)),
  inspect: () => `right(${x})`,
  fold: (f) => f(x),
  ap: (f) => f.map((v) => x(v)),
});

const left = (x) => ({
  map: (f) => left(x),
  inspect: () => `left(${x})`,
  fold: (f) => x,
  ap: (f) => f.map((v) => v),
  left: true,
});

const either = (f) => (g) => (e) => {
  if (e.left) return e.fold((v) => f(v));
  return e.fold((v) => g(v));
};

/**
 * @usage
 */

// const r = right(10);
// const l = left(10);

// const result = either(console.log)((x) => x + 1)(l);

// console.log({ result });

module.exports = { right, left, either };
