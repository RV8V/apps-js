/**
 * @Handling exception Null. Maybe
 * @: Functors, Monads, Maybe, Curring
 * @: Curring helps working with global data(indexUrls in here) and with functions having many parameters
 */

const user = {
  name: 'jane',
  email: 'jane@mail.com',
  preferences: {
    language: {
      primary: 'sp',
      secondary: 'en'
    }
  }
}

const indexUrls = {
  'en': 'http://mysite.com/en',
  'sp': 'http://mysite.com/sp',
  'jp': 'http://mysite.com/jp',
}

const getUrlForUserImperative = user => {
  if (!user) {
    return indexUrls['en']
  }
  if (user.preferences.language.primary && user.preferences.language.primary !== undefined) {
    if (indexUrls[user.preferences.language.primary]) {
      return indexUrls[user.preferences.language.primary]
    } else {
      return indexUrls['en']
    }
  }
}

console.log({
  getUrlForUserImperativeNull: getUrlForUserImperative(),
  getUrlForUserImperative: getUrlForUserImperative(user),
  getUrlForUserImperativeDefault: getUrlForUserImperative({
    ...user,
    preferences: {
      ...user.preferences,
      language: {
        ...user.preferences.language,
        primary: 'usa'
      }
    }
  })
})

/********************************************************/

const R = require('ramda')
const Maybe = require('ramda-fantasy').Maybe
const MyMaybe = require('./maybe.js')

const prop = R.prop
const path = R.path
const curry = R.curry

const getUrlForUserDeclarative = user => {
  return Maybe(user)
    .map(path(['preferences', 'language', 'primary']))
    .chain(maybeGetUrl)
}

const maybeGetUrl = curry((allUrls, language) => {
  return Maybe(allUrls[language])
})(indexUrls)

const boot = (user, defaultUrl) => {
  return getUrlForUserDeclarative(user).getOrElse(defaultUrl)
}

console.log({
  bootNormal: boot(user, 'http://mysite.com/en'),
  bootEmptyObject: boot({}, 'http://mysite.com/en'),
  bootNull: boot(null, 'http://mysite.com/en'),
})

/********************************************************/

/**
 * @Curring helps working with global data(indexUrls in here) and with functions having many parameters
 */

const getUrlImperativeBad = language => indexUrls[language]

const getUrlDeclarativeGoodPartialApplicationGlobalData = indexUrls => language => indexUrls[language]
const theSameGetUrlDeclGoodPartialApplicationGlobalData = curry((indexUrls, language) => indexUrls[language])(indexUrls)

/********************************************************/

console.log({
  Maybe: {
    MaybeNull: Maybe(null),
    MaybeObject: Maybe({ name: '1n' }),
    MaybeArray: Maybe([1, 2]),
    MaybeEmptyObject: Maybe({}),
    MaybeEmptyArray: Maybe([]),
    MaybeEmptyScalar: Maybe(1),
    MaybeLanguage: Maybe(indexUrls['sp'])
  },
  path: {
    pathNormal: path(['a', 'b'], { a: { b: 1 } }),
    path1: path(['a', 'c'], { a: { b: 1 } }),
    path2: path(['a', 'b', 'c'], { a: { b: 1 } }),
    path3: path(['a', 'b'], null),
    path4: path(['a', 'b'], undefined),
    path5: path(['a', 'b'], []),
  },
  MaybePath: {
    test1: Maybe({
      name: '1n',
      age: 2n,
      city: {
        zipCode: 12
      }
    }).map(path(['name'])),
    test2: Maybe({
      name: '1n',
      age: 2n,
      city: {
        zipCode: 12
      }
    }).map(path(['name', 'city'])),
    test3: Maybe({
      name: '1n',
      age: 2n,
      city: {
        zipCode: 12
      }
    }).map(path(['undefined'])),
    test4: Maybe(user).map(path(['preferences', 'language', 'primary']))
  }
})
