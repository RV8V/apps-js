const { first, all, sum, map } = require('./types');

const acc1 = map({
  name: first('Nico'),
  isPaid: all(false),
  points: sum(10),
  friends: ['Franklin'],
});

const acc2 = map({
  name: first('Nico'),
  isPaid: all(false),
  points: sum(2),
  friends: ['Gesby'],
});

const combined = acc1.concat(acc2);

console.log({ combined: combined.x });
