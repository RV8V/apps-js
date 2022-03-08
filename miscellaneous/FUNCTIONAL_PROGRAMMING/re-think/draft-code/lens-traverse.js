const { lensTraverse } = require('ramda-adjunct');
const { over, view } = require('ramda');
const { Either } = require('ramda-fantasy');

const id = (x) => ({
  map: (f) => id(x),
  ap: (f) => f.map(x),
  chain: (f) => f(x),
});

const add1 = (x) => Either.of(x + 1);

const overResult = over(lensTraverse(Either.of), add1, [2, 3]);
// => RA.Identity([3, 4])

console.log({ overResult });

// console.log({
//   i: id((x) => x + 11)
//     .ap(id(1))
//     .chain((x) => x),
// });
// console.log({ i: Either.Right((x) => x + 1).ap(Either.Right(1)) });
