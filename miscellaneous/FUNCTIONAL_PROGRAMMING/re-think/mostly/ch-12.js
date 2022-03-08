const {
  map,
  compose,
  take,
  split,
  join,
  identity,
  sequence,
} = require('ramda');
const { Future } = require('ramda-fantasy');

const readFile = compose(Future.of, identity);
const log = (message) => console.log({ message });

// firstWords :: String -> String
const firstWords = compose(join(' '), take(3), split(' '));

// tldr :: FileName -> Task Error String
const tldr = compose(map(firstWords), readFile);

const firstMessage = 'hail the monarchy in some country';
const secondMessage = 'smash the partiarchy e.g from sso';

// tldr(firstMessage).fork(log, log);

const arr = map(tldr, [firstMessage, secondMessage]);
// [Task('hail the monarchy'), Task('smash the patriarchy')]

arr.map((f) => f.fork(log, log));
