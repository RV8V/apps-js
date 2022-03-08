const {
  pipe,
  filter,
  propEq,
  equals,
  prop,
  complement,
  map,
  project,
  pick,
} = require('ramda');

const isTruth = pipe(Boolean, equals(true));
const isFalsy = complement(isTruth);

const notesList = [
  {
    title: 'Buy milk and bread',
    createdAt: '2020-04-04',
    dueDate: null,
    archived: false,
  },
  {
    title: 'Pick up a package at the post office',
    createdAt: '2020-04-04',
    dueDate: null,
    archived: false,
  },
  {
    title: 'Take a walk with Yoda',
    createdAt: '2020-04-04',
    dueDate: null,
    archived: true,
  },
];

const tag = (x) => (console.log({ x }), x);

const filterNotes = filter(propEq('archived', false));
const filterNotes1 = filter(pipe(prop('archived'), tag, isFalsy));

// console.log({
//   filterNotes: filterNotes(notesList),
//   filterNotes1: filterNotes1(notesList),
// });

const fn = pipe(prop('archived'), tag, isFalsy);

// console.log(map(fn)(notesList));

/**
 * @project
 */

const fields = ['title', 'createdAt', 'dueDate'];

const importantFields = project(fields);
const projectSame = map(pick(fields));

console.log(importantFields(notesList), projectSame(notesList));
