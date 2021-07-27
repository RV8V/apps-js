const R = require('ramda')

/**
 * @Declarative
 * @Imperative
 *
 * Do not use arrow function because we use point-free style e.g
 *
 * const getFieldValueArrow = string => R.prop(string)
 * const getFieldValuePointFree = R.prop(R.call(R.always('name')))
 *
 * getFieldValueArrow: getFieldValueArrow('name')(object),
 * getFieldValuePointFree: getFieldValuePointFree(object)
 */

const l = R.bind(console.log, console)

const data = [
  { name: '1 forEach((item, i) => {});', title: `1 setTimeout(function () {}, 10);` },
  { name: '2 forEach((item, i) => {});', title: `2 setTimeout(function () {}, 20);` },
  { name: '3 forEach((item, i) => {});', title: `3 setTimeout(function () {}, 30);` },
]

{
  const names = []
  for (let i = 0; i < data.length; ++i) {
    names.push(data[i].name)
  }
}

{
  const names = data.map(item => item.name)
}

{
  const names = R.map(item => R.prop('name', item), data)

  l({ names })
}

{
  const getValue = R.prop('name')
  const names = R.map(item => getValue(item), data)

  l({ names })
}

{
  const getValue = R.prop('name')
  const names = R.map(getValue, data)

  l({ names })
}

{
  const getValue = R.prop('name')
  const transform = R.map(getValue)

  l({ transform: transform(data) })
}

{
  const getValue = R.prop(R.__)
  const transform = R.map(item => getValue('name')(item))

  l({ transform: transform(data) })
}

{
  const fieldName = R.always('name')
  const getValue = R.prop(fieldName())
  const transform = R.map(getValue)

  l({ transform: transform(data) })
}

{
  const fieldName = R.always('name')
  const callGetName = R.call(fieldName)
  const getValue = R.prop(callGetName)
  const transform = R.map(getValue)

  l({ transform: transform(data) })
}

{
  const transform = R.map(
    R.prop(
      R.call(
        R.always('name')
      )
    )
  )

  l({ transform: transform(data) })
}

/********************************************/

{
  const fieldName = R.always('name')
  const callGetName = R.call(fieldName)
  const getValue = R.prop(callGetName)
  const transform = R.map(item => getValue(item).toUpperCase())

  l({ transform: transform(data) })
}

{
  const fieldName = R.always('name')
  const callGetName = R.call(fieldName)
  const getValue = R.prop(callGetName)
  const upper = R.toUpper
  const transformAndUp = R.pipe(getValue, upper)
  const transform = R.map(transformAndUp)

  l({ transform: transform(data) })
}

{
  const fieldName = R.always('name')
  const callGetName = R.call(fieldName)
  const getValue = R.prop(callGetName)
  const upper = R.toUpper
  const transform = R.map(item => R.pipe(getValue, upper)(item))

  l({ transform: transform(data) })
}

{
  const fieldName = R.always('name')
  const callGetName = R.call(fieldName)
  const getValue = R.prop(callGetName)
  const upper = R.toUpper
  const transform = R.map(
    R.pipe(getValue, upper)
  )

  l({ transform: transform(data) })
}

{
  const fieldName = R.always('name')
  const callGetName = R.call(fieldName)
  const getValue = R.prop(callGetName)
  const upper = R.toUpper
  const transform = R.map(
    R.compose(upper, getValue)
  )

  R.bind(console.log, console)({
    transform: transform(data)
  })
}

{
  const object = { name: 'n1', email: 'e1' }

  const getFieldValueArrow = string => R.prop(string)
  const getFieldValuePointFree = R.prop(R.call(R.always('name')))

  l({
    getFieldValueArrow: getFieldValueArrow('name')(object),
    getFieldValuePointFree: getFieldValuePointFree(object)
  })
}

/********************************************/

{
  const data = [
    { name: '1n', title: 't1' },
    { name: '2n', title: 't2' },
    {             title: 't3' },
  ]

  {
    /* const transformed = data.map(item => item.name.toUpperCase()) -> err name can be undefined */
    const transformed = data.map(item => (item.name || '').toUpperCase())

    l({ transformed })
  }

  {
    const fieldName = R.always('name')
    const callGetName = R.call(fieldName)
    const getValue = R.prop(callGetName)
    const upper = R.toUpper
    const emptyString = R.always('')
    const getEmplyString = R.call(emptyString)
    const defaultTo = R.defaultTo(getEmplyString)

    const transformAndUp = R.pipe(getValue, defaultTo, upper)
    const transform = R.map(transformAndUp)

    l({ transform: transform(data) })
  }
}

/********************************************/

{
  const data = [
    { name: 'n1', achievments: [1, 2, 3, 4] },
    { name: 'n2', achievments: [1, 2, 3, 4, 0] },
    { name: 'n3', achievments: [1, 2, 3, 4, 7, 8] },
  ]

  {
    const result = data.map(item => {
      return {
        character: item.name,
        rank: item.achievments.length
      }
    })

    l({ result })
  }

  {
    const result = data.map(({ name: character, achievments }) => ({
      character,
      rank: achievments.length
    }))

    l({ result })
  }

  /*
  item
  {
    character: item -> get name
    rank:      item -> get achievments -> get length
  }
  */

  {
    const getName = R.prop('name')
    const getRank = R.pipe(R.prop('achievments'), R.length)

    const result = data.map(item => ({
      character: getName(item),
      rank: getRank(item)
    }))

    l({ result })
  }

  {
    const getName = R.prop('name')
    const getRank = R.pipe(R.prop('achievments'), R.length)

    const applySchema = R.applySpec({
      character: getName,
      rank: getRank
    })

    const transform = R.map(applySchema)

    l({
      applyLength: applySchema.length,
      result: transform(data)
    })
  }

  {
    const fieldName = R.always('name')
    const getFieldNameValue = R.call(fieldName)
    const getName = R.prop(getFieldNameValue)

    const fieldAchievments = R.always('achievments')
    const getFieldAchievmentsValue = R.call(fieldAchievments)
    const getAchievments = R.prop(getFieldAchievmentsValue)

    const getLength = R.length
    const getRank = R.pipe(getAchievments, getLength)

    const applySchema = R.applySpec({
      character: getName,
      rank: getRank
    })

    const transform = R.map(applySchema)

    l({
      applyLength: applySchema.length,
      result: transform(data)
    })
  }

  {
    const data = [
      { name: 'n1', achievments: [1, 2, 3, 4] },
      { name: 'n2', achievments: [1, 2, 3, 4, 0] },
      { name: 'n3', achievments: [1, 2, 3, 4, 7, 8] },
      { name: 'n3' },
    ]

    {
      const result = data.map(item => ({
        character: item.name,
        rank: item.achievments && item.achievments.length || 0
      }))

      l({ result })
    }

    {
      const getName = R.prop('name')
      const getRank = R.pipe(
        R.prop('achievments'),
        R.length,
        R.defaultTo(0)
      )

      const applySchema = R.applySpec({
        character: getName,
        rank: getRank
      })

      const transform = R.map(applySchema)

      l({
        applyLength: applySchema.length,
        result: transform(data)
      })

      l({
        prop: R.prop('achievments')({ name: 'n3', achievments: [1, 2, 3, 4, 7, 8] }),
        def: R.defaultTo(
          R.prop('achievments')({ name: 'n3', achievments: [1, 2, 3, 4, 7, 8] })
        )(0)
      })
    }

    {
      const isValueDefined = R.pipe(R.isNil, R.not)
      const isValueDefinedToo = R.complement(R.isNil)

      const dataset = [null, undefined, 1, 2]

      const checkIfNotFalsy = R.pipe(
        R.filter(isValueDefined),
        R.map(x => x + 1)
      )

      l({
        checkIfNotFalsy: checkIfNotFalsy(dataset)
      })

      l({
        1: R.not(R.isNil(1)),
        2: R.not(R.isNil(0)),
        3: R.not(R.isNil(undefined)),
        4: R.complement(R.isNil)(1),
        5: R.complement(R.isNil)(0),
        6: R.complement(R.isNil)(undefined),
      })
    }
  }
}
