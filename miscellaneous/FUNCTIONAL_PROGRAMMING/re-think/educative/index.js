const R = require('ramda');

const tag = R.curry((message, x) => (console.log({ message, x }), x));

const trueByField = (field) => R.compose(Boolean, tag('prop'), R.prop(field));
const isTruethy = trueByField('lovesTech');

const o = {
  lovesTech: 'yes',
  worksHard: 'also',
  name: 'username',
};

console.log({ loves: isTruethy(o) });

/************************************ */

const shouldCode = (person) =>
  person.lovesTech && person.worksHard
    ? `${person.name} may enjoy a tech career!`
    : `${person.name} wouldn't enjoy a tech career.`;

const onSuccess = (person) => `${person.name} may enjoy a tech career!`;
const onFail = (person) => `${person.name} wouldn't enjoy a tech career.`;

const should = R.both(trueByField('lovesTech'), trueByField('worksHard'));

const code = R.ifElse(should, onSuccess, onFail);

console.log({ code: code(o) });
console.log({ shouldCode: shouldCode(o) });

/************************************ */

const when = R.when(should, onSuccess);
const unless = R.unless(should, onFail);

console.log({ when: when(o), unless: unless(o) });

{
  const constructMessage = R.curry((field, message) =>
    R.pipe(R.prop(field), R.flip(R.concat)(message))
  );

  const baseByName = constructMessage('name');

  const onSuccess = baseByName(' may enjoy a tech career!');
  const onFail = baseByName(" would't enjoy a tech career.");

  const code = R.ifElse(should, onSuccess, onFail);

  console.log({ code: code(o) });
}

const people = [{ age: 23 }, { age: 11 }];

{
  const keepYoungAdults = (people) =>
    people.filter((p) => p.age >= 18 && p.age <= 25);

  console.log({ keepYoungAdults: keepYoungAdults(people) });
}

{
  const condition = R.both(R.flip(R.gte)(18), R.flip(R.lte)(25));
  const isAdult = R.propSatisfies(condition, 'age');
  const keep = R.filter(isAdult);
  console.log({ keep: keep(people), isAdult: isAdult({ age: 22 }) });
}

// {
//   const gte = (v) => (age) => {
//     console.log({ age });
//     return age > v;
//   };
//   const lte = (v) => (age) => age < v;

//   const condition = R.both(gte(18), lte(25));
//   const isAdult = R.propSatisfies(condition, 'age');
//   const keep = R.filter(isAdult);
//   console.log({
//     keep: keep(people),
//     isAdult: isAdult({ age: 22 }),
//     condition: condition(22),
//     propSatisfies: R.propSatisfies((x) => x > 0, 'x')({ x: 1 }),
//   });
// }

const toTest = R.propSatisfies(R.equals(true), 'adult');
console.log({ toTest: toTest({ adult: false }) });
