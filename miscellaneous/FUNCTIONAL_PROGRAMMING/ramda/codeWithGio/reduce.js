const R = require('ramda')

/**
 * @Reduce
 */

 R.reduce(R.subtract, 0, [1, 2, 3, 4]) /* => ((((0 - 1) - 2) - 3) - 4) = -10 */
  /*        -               -10
          / \              / \
         -   4           -6   4
        / \              / \
       -   3   ==>     -3   3
      / \              / \
     -   2           -1   2
    / \              / \
   0   1            0   1
  */

const l = R.bind(console.log, console)

const data = [
  ['name', 'general'],
  ['profession', 'witcher'],
  ['renown', 'legende'],
]

const list = ['one', 'two', 'three']

{
  const result = {}
  for (let i = 0; i < data.length; ++i) {
    result[data[i][0]] = data[i][1]
  }

  const toStringWithSeparator = function(list, separator) {
    let res = ''

    for (let i = 0; i < list.length; ++i) {
      res += list[i]

      const isNotLast = i < list.length - 1

      if (isNotLast) {
        res += separator
      }
    }

    return res
  }

  const selectStringMoreThanCharNumPassed = function(list, charNum) {
    const result = []

    for (let i = 0; { length } = list, i < length; ++i) {
      if (list[i].length > charNum) {
        result.push(list[i])
      }
    }
    return result
  }

  l({
    result,
    toStringWithSeparator: toStringWithSeparator(list, '-'),
    selectStringMoreThanCharNumPassed: selectStringMoreThanCharNumPassed(['hello', 'w', 'world'], 3)
  })
}

{
  const reduce = R.curry(function(state, fn, list) {
    for (let i = 0; i < list.length; ++i) {
      state = fn(state, list[i], i === list.length - 1)
    }
    return state
  })

  const toObject = reduce({}, (state, item) => ({ ...state, [item[0]]: item[1] }))
  const toObjectL = reduce({}, (state, [key, value]) => ({ ...state, [key]: value }))
  const toStrWithSep = (list, separator) => reduce('', (state, item, isLast) => (state += item, isLast && state || state + separator), list)
  const selectStrsMoreThanCh = (list, charNum) => reduce([], (state, item) => (item.length > charNum && [...state, item], state), list)

  const selectStrsMoreThanChN = (list, charNum) => reduce([], (state, item) => {
    if (item.length > charNum) {
      return [...state, item]
    }
    return state
  }, list)

  l({
    toObjectL: toObjectL(data),
    reduce: data.reduce((state, [key, value]) => ({ ...state, [key]: value }), {}),
    toStringWithSeparatorDeclarative: toStrWithSep(['one', 'two', 'three'], '-'),
    selectStrsMoreThanChN: selectStrsMoreThanChN(['hello', 'w', 'world'], 3),
    selectStrsMoreThanCh: selectStrsMoreThanChN(['hello', 'w', 'world'], 3)
  })
}
