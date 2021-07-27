const R = require('ramda')

/**
 * @Fusion
 */

const l = R.bind(console.log, console)

const data = [
  { name: '1n', achievments: [1, 2, 3, 4] },
  { name: '2n', achievments: [,, 4] },
  { name: '3n', achievments: [1, 3, 4] },
]

{
  const getAchievments = R.prop('achievments')

  const process = R.pipe( /* pipe functions that returns Arrays each one, and return resulted Arrays, second variant is faster and with better performance */
    R.map(getAchievments),
    R.map(R.length)
  )

  l({
    map: R.map(getAchievments)(data),
    length: R.map(R.length, R.map(getAchievments)(data)),
    process: process(data)
  })
}

{
  const getAchievments = R.prop('achievments')

  const process = R.map( /* map over composed functions by R.pipe - we call composition of functions to objects {}, and return resulted Array  */
    R.pipe(
      getAchievments,
      R.length
    )
  )

  l({
    map: R.map(getAchievments)(data),
    length: R.map(R.length, R.map(getAchievments)(data)),
    process: process(data)
  })
}

{
  const numbers = [-1, -2, -3, 0, 1, 2, 3, 4, 5, 6, 7]

  const moreThanZero = x => x > 0
  const lessThanSix = x => x < 6

  const process = R.pipe(
    R.filter(moreThanZero),
    R.filter(lessThanSix)
  )

  l({
    zero: R.filter(moreThanZero)(numbers),
    six: R.filter(lessThanSix)(numbers),
    zeroSix: process(numbers)
  })
}

{
  const numbers = [-1, -2, -3, 0, 1, 2, 3, 4, 5, 6, 7]

  const moreThanZero = x => x > 0
  const lessThanSix = x => x < 6

  const process = R.filter(
    R.allPass([moreThanZero, lessThanSix])
  )

  l({
    zero: R.filter(moreThanZero)(numbers),
    six: R.filter(lessThanSix)(numbers),
    zeroSix: process(numbers)
  })
}

{
  const data = [
    { rank: 11, class: 'mage' },
    { rank: 10, class: 'mage' },
    { rank: 11, class: 'not mage' },
    { rank: 4, class: 'not mage' },
  ]

  {
    const isHighRanked = R.pipe(R.prop('rank'), R.gte(R.__, 10))
    const isMage = R.pipe(R.prop('class'), R.equals('mage'))

    const process = R.pipe(
      R.filter(isHighRanked),
      R.filter(isMage)
    )

    l({
      process: process(data)
    })
  }

  {
    const isHighRanked = R.pipe(R.prop('rank'), R.gte(R.__, 10))
    const isMage = R.pipe(R.prop('class'), R.equals('mage'))

    const process = R.filter(
      R.allPass([isHighRanked, isMage])
    )

    l({
      process: process(data)
    })
  }

  {
    const rankField = R.always('rank')
    const getRankValue = R.call(rankField)
    const getRank = R.prop(getRankValue)

    const tenRepresentative = R.always(10)
    const getTenValue = R.call(tenRepresentative)
    
    const greaterThanTen = R.gte(R.__, getTenValue)
    const isHighRanked = R.pipe(getRank, greaterThanTen)

    const classField = R.always('class')
    const getClassValue = R.call(classField)
    const getClass = R.prop(getClassValue)

    const mageField = R.always('mage')
    const getMageValue = R.call(mageField)
    const equalsToMage = R.equals(getMageValue)

    const isMage = R.pipe(getClass, equalsToMage)

    const process = R.filter(
      R.allPass([isHighRanked, isMage])
    )

    l({
      ten: R.call(tenRepresentative),
      process: process(data)
    })
  }
}
