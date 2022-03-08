const { compose, map, concat, construct } = require('ramda');
const { fpRange } = require('./range-example');

const string = construct(String);

const requireCartoonExamples = compose(
  map(require),
  map(concat('./example-')),
  map(string),
  fpRange
);

/**
 * @usage
 */

requireCartoonExamples(6);

/**
 * @usage
 */

// for (let i = 1; i < 7; i++) {
//   require(`./example-${i}`);
// }
