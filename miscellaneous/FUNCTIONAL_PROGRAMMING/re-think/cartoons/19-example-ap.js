const { curry } = require('ramda');
const { Either } = require('ramda-fantasy');

const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);

const query = (selector) => Either.of({ selector, height: 10 });

const getSize = (screen, head, foot) => screen - (head.height + foot.height);

const chaining = query('head').chain((head) =>
  query('foot').map((foot) => getSize(800, head, foot))
);

const size = curry(getSize);

const either = Either.of(size(800)).ap(query('head')).ap(query('foot'));

const lift = liftA2(size(800), query('head'), query('foot'));

console.log({ chaining, either, lift });
