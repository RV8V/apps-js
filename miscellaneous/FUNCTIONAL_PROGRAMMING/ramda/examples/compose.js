const R = require('ramda');
const _ = require('lodash');

const ONE = 1;
const INITIAL_VALUE = 2;
const CRETERIA = 'Jake';
const COMPLETED = false;
const OUR_COUNTRY = 'Ukraine';
const NORMAL_AGE = 18;

const addOneImperative = (x) => x + ONE;
const squareImperative = (x) => x ** x;

const combineDeclavative = R.compose(squareImperative, addOneImperative);

const validImperative = (users) =>
  _.filter(users, (user) => user.name === CRETERIA);
const completedImperative = (tasks) =>
  _.filter(tasks, { completed: COMPLETED });

const validDeclarative = R.filter(R.whereEq({ name: CRETERIA }));
const completedDeclarative = R.filter(R.whereEq({ completed: COMPLETED }));

const wasBornInOurCountry = (person) => person.birthdayCountry === OUR_COUNTRY;
const wasNaturalist = (person) => Boolean(person.naturalist);
const canDrive = (person) => person.age >= NORMAL_AGE;

const checkDeclavative = R.compose(
  wasNaturalist,
  wasBornInOurCountry,
  canDrive
);

const isCitizenImperative = (person) =>
  wasBornInOurCountry(person) || wasNaturalist(person);
// const isNaturalistCitizen = person => wasBornInOurCountry(person) && wasNaturalist(person)

const isCitizenPointFree = R.either(wasBornInOurCountry, wasNaturalist);
const isNaturalistCitizen = R.both(wasBornInOurCountry, wasNaturalist);

const users = [
  { name: 'Kane', age: 23, birthdayCountry: 'Ukraine', naturalist: false },
  { name: 'Jake', age: 18, birthdayCountry: 'USA', naturalist: true },
  { name: 'Novx', age: 34, birthdayCountry: 'Africa', naturalist: false },
];

const tasks = [
  { name: 'go home', completed: false },
  { name: 'go to play', completed: true },
  { name: 'go to buy milk', completed: false },
];

console.log({
  validImperative: validImperative(users),
  validDeclarative: validDeclarative(users),
  completedImperative: completedImperative(tasks),
  combineDeclavative: completedDeclarative(tasks),
  combineDeclavative: combineDeclavative(INITIAL_VALUE),
  checkDeclavative: checkDeclavative(users),
});
