const R = require('ramda');

const log = R.bind(console.log, console);

/**
 * @always fn returns passed value(e.g: constant)
 * @__     placeholder
 * @call   function that applies passed fn
 */

const returnPassedValue = R.always(R.__);
const returnPassedValueSame = (v) => R.always(v);

const getConstant = (v) => R.call(R.always(v));

const logAlways = {
  returnPassedValue: R.call(returnPassedValue(1)),
  returnPassedValueSame: returnPassedValueSame(1)(),
};

process.env.always && log(logAlways);

/**
 * @add takes only 2 args
 * @substruct
 */

const add = R.add(R.__, R.__);
const addSame = (v, x) => R.add(v)(x);

const logAdd = {
  add: add(1, 2),
  addSame: addSame(1, 2),
};

/**
 * @when const when = R.when(getConstant, returnPassedValue(logAdd))('undefined');
 */

R.when(getConstant, () => log(logAdd))(process.env.always);

/**
 * @truncate example
 * @unless   reverse to @when
 * @take     takes n symbols
 * @append   add element to the end
 * @join     join array to string
 */

{
  const truncate = (str) => {
    let truncatedStr;
    if (str.length > 10) {
      truncatedStr = str.substring(0, 10);
      truncatedStr = `${truncatedStr}...`;
    } else {
      truncatedStr = str;
    }
    return truncatedStr;
  };
  //   console.log(truncate('12345'));
  //   console.log(truncate('123456789010'));
}

{
  const truncate = R.when(
    (str) => str.length > 10,
    R.compose(R.join(''), R.append('...'), R.take(10))
  );

  //   console.log(truncate('12345'));
  //   console.log(truncate('123456789010'));
}

{
  const truncate = R.when(
    R.propSatisfies(R.gte(R.__, 10), 'length'),
    R.compose(R.join(''), R.append('...'), R.take(10))
  );

  //   console.log(truncate('12345'));
  //   console.log(truncate('123456789010'));
}

{
  const f = (v) => R.gte(R.length(v), 1);
  const compose = R.compose(R.flip(R.gte)(1), R.length(R.__));

  const truncate = R.when(
    compose,
    R.compose(R.join(''), R.append('...'), R.take(10))
  );

  //   console.log(truncate('12345'));
  //   console.log(truncate('123456789010'));
}

{
  const truncate = R.unless(
    R.propSatisfies(R.lt(R.__, 10), 'length'),
    R.compose(R.join(''), R.append('...'), R.take(10))
  );

  //   console.log(truncate('12345'));
  //   console.log(truncate('123456789010'));
}

/**
 * @call
 * @apply
 */

const min = R.apply(R.min, R.__);
const max = R.call(R.max, R.__);

const logMinMax = {
  min: min([1, 2]),
  max: max(1, 2),
};

R.unless(R.isNil, () => log(logMinMax))(null);

/**
 * @head
 * @tail
 * @init returns list without last element
 * @last
 */

const logHeadLast = {
  head: R.head([1, 2]),
  init: R.init([1, 2, 3]),
};

// log(logHeadLast);

/**
 * @uniq
 */

const logUniq = {
  uniq: R.uniq([1, 2, 1]),
  compose: R.compose(R.length, R.uniq)([1, 1, 1, 2]),
};

// log(logUniq);

/**
 * @prop takes value by prop name
 * @pluck
 */

const propToTest = { name: '1n', age: 1n };

const logProp = {
  nameValue: R.prop('name')(propToTest),
  pluck: R.pluck('name')([propToTest]),
};

// log(logProp);

const users = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 },
];

const maxAge = (v) => R.max(...R.pluck('age', v));
const maxAge1 = R.pipe(R.pluck('age'), R.apply(R.max));
const maxAge2 = R.apply(R.max, R.pluck('age', users));

const logMaxAge = {
  maxAge: maxAge(users),
  maxAge1: maxAge1(users),
  maxAge2: maxAge2,
};

// log(logMaxAge);

/**
 * @constains @deprecated
 */

const isNameConstains = (name) => R.contains(name, R.pluck('name', users));

/**
 * @range
 * @sum
 */

const range = R.range(R.__, R.__);
const sum = R.sum;

const logRange = {
  range: range(1, 8),
  sum: sum(range(1, 3)),
};

// log(logRange);

/**
 * @sort
 */

const nums = [3, 1, 4, 2, 8, 5, 6];

const asc = R.sort((x, y) => x - y, R.__);
const desc = R.sort((x, y) => y - x, R.__);

const ascAlso = R.sort(R.comparator(R.lt), R.__);
const descAlso = R.sort(R.comparator(R.gt), R.__);

const logSort = {
  asc: asc(nums),
  desc: desc(nums),
  ascAlso: ascAlso(nums),
  descAlso: descAlso(nums),
};

// log(logSort);

/**
 * @propEq
 * @R.__ accepts params from left to rigth <<<
 */

const find = (field, name, set) => R.find(R.propEq(field, name), set);
const find1 = (field, name) => R.find(R.propEq(field, name), R.__);
const find2 = (field) => R.find(R.propEq(field, R.__), R.__);
const find3 = R.find(R.propEq(R.__, R.__), R.__);

const logFind = {
  find: find('name', 'John', users),
  find1: find1('name', 'John')(users),
  find2: find2('name', 'John')(users),
  find3: find3(users, 'John', 'name'),
};

// log(logFind);

/**
 * @R.__ accepts params from rigth to left <<<
 */

const __ = R.always([R.__, R.__]);

const tag = (x) => (console.log({ x }), x);
const tap = R.tap((x) => console.log({ x }), R.__);

const check__ = (console.log({ placeHolder: R.__ }), R.always(R.__));

// const log__ = {
//   __: __('first', 'second'),
//   tag: tag('value after add1: '),
//   tap: tap('value after add1: tap'),
//   check__: check__(123)(1),
// };

// log(log__);

/**
 * @tap returns given value, but before execute passed function
 */

const add1 = (x) => x + 1;
const multiplyBy2 = (x) => x * 2;

const logWithTap = (msg) => R.tap((x) => console.log(msg, x));

{
  const add1AndMultiplyBy2 = R.pipe(
    add1,
    R.tap((x) => console.log('WTF', x)), // logs 'WTF' and '11'
    multiplyBy2
  );
  //   console.log({ tap: add1AndMultiplyBy2('1') });
}

{
  const add1AndMultiplyBy2 = R.pipe(
    add1,
    logWithTap('value after add1: '), // logs "value after add1: 11"
    multiplyBy2
  );
  //   console.log({ tap: add1AndMultiplyBy2('1') });
}

/**
 * @map with @call
 */

const repeated = R.map(R.call, R.repeat(Math.random, 5));
// console.log(repeated, R.repeat(Math.random, 5));

/**
 * @filter
 * @reject reverse to @filter
 */

const users1 = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 },
];

// console.log(R.filter((user) => user.age >= 70, users1));

const users2 = [
  { name: 'John', city: 'London', born: '2001-04-01' },
  { name: 'Lenny', city: 'New York', born: '1997-12-11' },
  { name: 'Andrew', city: 'Boston', born: '1987-02-22' },
  { name: 'Peter', city: 'Prague', born: '1936-03-24' },
  { name: 'Anna', city: 'Bratislava', born: '1973-11-12' },
  { name: 'Albert', city: 'Bratislava', born: '1940-18-19' },
  { name: 'Adam', city: 'Trnava', born: '1983-12-01' },
  { name: 'Robert', city: 'Bratislava', born: '1935-05-15' },
  { name: 'Robert', city: 'Prague', born: '1998-03-14' },
];

let res = R.reject(R.propEq('city', 'Bratislava'))(users2);
// console.log(res);

let res2 = R.filter(R.propEq('city', 'Bratislava'))(users2);
// console.log(res2);

const res3 = R.reject(R.propEq('name', 'Robert'), users2);
// console.log(res3);

/**
 * @partition separates set into 2
 */

const numbers = [-1, -2, -3, 4, 5];
const [negative, positive] = R.partition((x) => x < 0)(numbers);
// console.log({ negative, positive });

/**
 * @groupBy
 */

const students = [
  { name: 'Adam', score: 84 },
  { name: 'Eddy', score: 58 },
  { name: 'Peter', score: 69 },
  { name: 'Roman', score: 93 },
  { name: 'Jane', score: 56 },
  { name: 'Lucy', score: 76 },
  { name: 'Jack', score: 88 },
];

const groupStudents = R.groupBy((student) => {
  const gteThanPassed = R.flip(R.gte)(R.__, R.__);
  const getStudentProp = R.prop(R.__, R.__);

  const score = getStudentProp('score', student);

  return R.when(gteThanPassed(60), () => 'a')(score);
});

// console.log({ groupStudents: groupStudents(students) });

/**
 * @reduce
 */

const ns = [1, 2, 3];
const sum1 = (acc, v) => acc + v;
const nsResult = R.reduce(sum1)(0, ns);

// console.log({ nsResult });

/**
 * @where
 */

const us = [
  { name: 'John', city: 'London', born: '2001-04-01' },
  { name: 'Lenny', city: 'New York', born: '1997-12-11' },
  { name: 'Andrew', city: 'Boston', born: '1987-02-22' },
  { name: 'Peter', city: 'Prague', born: '1936-03-24' },
  { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
  { name: 'Albert', city: 'Bratislava', born: '1940-12-11' },
  { name: 'Adam', city: 'Trnava', born: '1983-12-01' },
  { name: 'Robert', city: 'Bratislava', born: '1935-05-15' },
  { name: 'Robert', city: 'Prague', born: '1998-03-14' },
];

const whereUsers = R.filter(R.where({ city: R.equals('London') }));

const whereUsers1 = R.filter(
  R.where({
    name: R.startsWith('A'),
    city: (city) => city === 'Bratislava',
  })
);

console.log({
  whereUsers: whereUsers(us),
  whereUsers1: whereUsers1(us),
});
