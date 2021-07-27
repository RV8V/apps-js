const R = require('ramda')

/**
 * @R.difference   - Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list
 * @R.intersection - Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
 * @R.union        - Combines two lists into a set (i.e. no duplicates) composed of the elements of each list. -> [...new Set[...arr1, ...arr2]]
 *
 */

const l = R.bind(console.log, console)

l({
  1: R.difference([1, 2, 3], [4, 5, 1]),
  2: R.difference([{}, { 1: 2 }], [{}]),
  3: R.intersection([1, 2, 3], [3, 4]),
  4: R.union([1, 2, 3], [2, 3, 4, 5]),
  5: ((arr1, arr2) => [...new Set([...arr1, ...arr2])])([1, 2, 3], [2, 3, 4, 5]),
  6: ((arr1, arr2) => [...new Set(arr1.concat(arr2))])([1, 2, 3], [2, 3, 4, 5])
})
