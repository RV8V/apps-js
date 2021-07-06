const R = require('ramda')

/**
 * @R.comparator return function for composition - similar to R.ascend, R,descend
 */

const l = R.bind(console.log, console)
const byAge = R.comparator((a, b) => a.age < b.age)

const people = [
  { name: 'Emma', age: 70 },
  { name: 'Peter', age: 78 },
  { name: 'Mikhail', age: 62 },
];

l({
  compare: R.sort(byAge, R.clone(people)),
  sortDesc: R.clone(people).sort((a, b) => a.age < b.age && 1 || -1),
  sortAsc: R.clone(people).sort((a, b) => a.age > b.age ? 1 : -1)
})
