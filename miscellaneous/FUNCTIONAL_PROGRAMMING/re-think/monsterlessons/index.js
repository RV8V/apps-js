const R = require('ramda');

const getValue = R.prop(R.__);
const getValueByProp = R.curry((prop, o) => o[prop]);
const map = R.curry((f, xs) => xs.map(f));
const add = R.add;

const log = R.bind(console.log, console);

const records = [
  { id: 1, name: '1n', numbers: [1, 2] },
  { id: 2, name: '2n', numbers: [3, 4] },
];

const logProp = {
  ids: records.map(getValue('id')),
  idsAlso: records.map(R.prop('id')),
  idsAlsoN: records.map(getValueByProp('id')),
};

const getPayloadFromServer = () =>
  Promise.resolve({
    id: 1,
    numbers: [1, 2, 3],
  });

// getPayloadFromServer()
//   .then(getValue('numbers'))
//   .then(map(add(1)))
//   .then(log);

/**
 * @Ramda
 * @both
 * @either
 * @compose
 */

const wasBornInCountry = (person) => person.birthCountry === 'UK';
const wasNaturalized = (person) => Boolean(person.naturalist);
const isOver18 = (person) => person.age >= 18;

const wasBornInCountryFp = R.propEq('birthCountry');
const wasNaturalizedFp = R.propEq('naturalist', R.__);
const isOver18Fp = R.gte(R.prop('age', R.__), R.__);

const isCitizen = (person) =>
  wasBornInCountry(person) || wasNaturalized(person);

const isEligibleToVote = (person) => isOver18(person) && isCitizen(person);

const testUser = {
  age: 20,
  birthCountry: 'UK',
};

// console.log({
//   wasBornInCountry: wasBornInCountry(testUser),
//   wasNaturalized: wasNaturalized(testUser),
//   isOver18: isOver18(testUser),
// });

// console.log({
//   wasBornInCountryFp: wasBornInCountryFp('UK', testUser),
//   wasNaturalizedFp: wasNaturalizedFp(true, testUser),
//   isOver18Fp: isOver18Fp(testUser),
// });

const users = [
  { name: 'Kane', age: 23, birthdayCountry: 'Ukraine', naturalist: false },
  { name: 'Jake', age: 18, birthdayCountry: 'UK', naturalist: true },
  { name: 'Novx', age: 34, birthdayCountry: 'Africa', naturalist: false },
];

const trace = (x) => (console.log({ x }), x);

const checkUser = R.compose(
  map(isOver18Fp),
  trace,
  map(wasNaturalizedFp(true)),
  trace,
  map(wasBornInCountryFp('UK')),
  trace
);

// console.log({ user: R.propEq('birthdayCountry', 'UK')(users[1]) });
// console.log({ user: wasBornInCountryFp('UK', testUser) });

// console.log({ checkUser: checkUser(users) });

// console.log(isEligibleToVote(testUser));

const isCitizenFp = R.either(wasBornInCountryFp('UK'), wasNaturalizedFp(true));
const isEligibleToVoteFp = R.both(isOver18, isCitizenFp);

// console.log({
//   isEligibleToVote: isEligibleToVote(testUser),
//   isCitizen: isCitizen(testUser),
// });

// console.log({
//   isEligibleToVoteFp: isEligibleToVoteFp(testUser),
//   isCitizenFp: isCitizenFp(testUser),
// });

// console.log({
//   either: R.either(
//     (x) => x === 1,
//     (x) => x === 4
//   )(1),
//   both: R.both(
//     (x) => x > 1,
//     (x) => x < 4
//   )(2),
// });

const wasNaturalizedFpT = R.compose(Boolean, R.prop('naturalist'));

// console.log({ wasNaturalizedFpT: wasNaturalizedFpT({ naturalist: '' }) });

const isTrue = R.pipe(Boolean, R.equals(true));

/**
 * @path get nested fields
 * @pathOr
 */

const bill = {
  nickname: 'Bill',
  country: 'UK',
  personal: {
    profile: {
      name: 'Bill',
      surname: 'Williams',
      age: 20,
    },
  },
};

const mike = {
  nickname: 'Mike',
  country: 'US',
  personal: {},
};

const getSurname = (user) => user.personal.profile.surname;

// try {
//   console.log(getSurname(bill));
//   console.log(getSurname(mike));
// } catch (err) {
//   console.log({ err });
// }

const getSurnameFp = R.path(['personal', 'profile', 'surname']);
const getSurnameOrFp = R.pathOr('field surname not set', [
  'personal',
  'profile',
  'surname',
]);

// console.log(getSurnameFp(bill));
// console.log(getSurnameFp(mike));

// console.log(getSurnameOrFp(bill));
// console.log(getSurnameOrFp(mike));

/**
 * @converge
 */

const isFirstElementBiggest = (arr) => arr[0] === arr.sort((x, y) => y - x)[0];

const isFirstElementBiggestConverge = R.converge(R.equals, [
  (elements) => elements[0],
  (elements) => elements.sort((a, b) => b - a)[0],
]);

const isValidAr = [6, 3, 4, 5, 2];
const isInvalidAr = [3, 4, 6, 1];

// console.log(isFirstElementBiggest([...isValidAr]));
// console.log(isFirstElementBiggest([...isInvalidAr]));

// console.log({ isInvalidAr });

// console.log(isFirstElementBiggestConverge([...isValidAr]));
// console.log(isFirstElementBiggestConverge([...isInvalidAr]));

const head = R.head;
const pipe = R.pipe;
const sort = R.sort;
const gt = R.gt;
const comparator = R.comparator;

const converge = R.converge(R.equals, [head, pipe(sort(comparator(gt)), head)]);

// console.log(converge([...isValidAr]));
// console.log(converge([...isInvalidAr]));

/**
 * @if
 * @else
 */

const getVideoFilepath = (video) => {
  const file = video.isHD ? video['720p'] : video['480p'];
  return `/api/videos/${file}`;
};

const video = {
  '720p': 'funny-video-hd.mp4',
  '480p': 'funny-video-480p.mp4',
  isHD: true,
};

// console.log(getVideoFilepath(video));

const getVideoFile = R.ifElse(
  R.propEq('isHD', true),
  R.prop('720p'),
  R.prop('480p')
);

const getVideoFileQ = R.compose(
  R.concat('/api/videos/'),
  R.ifElse(R.propEq('isHD', true), R.prop('720p'), R.prop('480p'))
);

// console.log(getVideoFileQ(video));

const getMessage = (isWorkingTime) => {
  const onlineMessage = 'We are online';
  const offlineMessage = 'We are offline';

  return isWorkingTime ? onlineMessage : offlineMessage;
};

// console.log(getMessage(false));

// const message = R.ifElse( does not work
//   R.always(R.__),
//   R.always('We are online'),
//   R.always('We are offline')
// );

// const message = (isWorkingTime) =>
//   R.call(
//     R.ifElse(
//       R.always(isWorkingTime),
//       R.always('We are online'),
//       R.always('We are offline')
//     )
//   );

// console.log(message(false));

/**
 * @lense
 */

const user = {
  name: 'John',
  surname: 'Flint',
};

const nameLenth = R.lens(R.prop('name'), R.assoc('name'));

const view = R.view(nameLenth, user);
const set = R.set(nameLenth, 'new usename', user);

console.log({ user, view, set });

/******************************* */

const newLenth = R.lens(R.prop('name'), R.assoc('name'));
const name = R.view(newLenth, user);
const upper = R.toUpper(name);
const updated = R.set(newLenth, upper, user);

console.log({ updated, upper });

/******************************* */

const same = R.over(newLenth, R.toUpper, user);

console.log({ same });

/******************************* */

const both = R.lensProp('name');
const result = R.over(both, R.toUpper, user);

console.log({ result });
