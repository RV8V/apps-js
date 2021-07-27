const R = require('ramda')

/**
 * @Declarative
 * @Imperative
 */

const l = R.bind(console.log, console)

const data = [
  {
    id: 'the-witcher-3',
    name: 'The Witcher 3: Wild Hunt',
    characters: ['General', 'Triss', 'Ciri']
  },
  {
    id: 'rdr-2',
    name: 'Read Head 2: Winter',
    characters: ['Arthur', 'Dutch']
  },
  {
    id: 'dragons-dogma',
    name: 'Dragons Dogma 2: Sprint',
  },
]

const unwindImp = (field, items) => {
  const result = []
  items.forEach(item => {
    const value = item[field]
    if (value) {
      value.forEach(character => {
        result.push({ ...item, [field]: character })
      })
    } else {
      result.push(item)
    }
  })
  return result
}

const unwindDec = (field, items) => items.reduce((state, currentItem) => {
  const unwinded = (currentItem[field] || []).map(subItems => ({ ...currentItem, [field]: subItems }))
  return [...state, ...unwinded]
}, [])

{
  const unwindOne = R.curry((field, item) => R.pipe(
    R.prop(field),
    R.defaultTo([null]),
    R.map(subItems => ({ ...item, [field]: subItems }))
  )(item))

  const unwindDec = (field, items) => R.pipe(
    R.map(unwindOne(field)),
    R.flatten
  )(items)

  l({ declarative: unwindDec('characters', data) })
}

l({
  imp: unwindImp('characters', data),
  dec: unwindDec('characters', data)
})
