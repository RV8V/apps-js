const R = require('ramda')

/**
 * @R.ascend returns comparator
 * @R.descend reverse to R.ascend
 *
 *
 */

const l = console.log

const people = [
  { name: 'Emma', age: 70 },
  { name: 'Peter', age: 78 },
  { name: 'Mikhail', age: 62 },
];

l({
  sortAscend: R.sort(
    R.ascend(R.prop('age')),
    people
  ),
  sortDescend: R.sort(
    R.descend(R.prop('age')),
    people
  ),
  ascend: R.ascend(R.prop('age'))({ age: 7 }, { age: 8 }),
  descend: R.ascend(R.prop('age'))({ age: 8 }, { age: 7 })
})
