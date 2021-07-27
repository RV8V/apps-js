'use strict'

/**
 * @Lens solves the problem of data transformation in nested objects
 */

const defaultState = {
  data: {
    user: {
      name: '1n',
      age: 29,
      lang: 'usa',
      courses: [
        { name: '1c', score: 90 },
        { name: '2c', score: 68 },
      ]
    }
  }
}

const userReducerOne = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_DATA':
      return action.payload
    default:
      return state
  }
}

const userReducerTwo = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_DATA':
      return action.payload
    case 'FETCH_USER_SUCCESS':
      return { ...state, user: action.payload }
    case 'FETCH_USER_SUCCESS':
      return { ...state, user: { ...state.user, lang: action.payload } }
    case 'CHANGE_COURSE_SCORE':
      const index = state.user.courses.indexOf(
        c => c.name === action.payload.courseName
      )
      const newCourses = Object.assign([], state.user.courses, {
        index: {
          ...state.user.courses[index],
          score: action.score
        }
      })
      return { ...state, user: { ...state.user, courses: newCourses } }
    default:
      return state
  }
}

const getIndexByName = (state, name) => state.data.user.courses.find(
  c => c.name === name
)

const assign = courses => Object.assign([], courses, {
  index: '1'
})

console.dir({
  courses: defaultState.data.user.courses,
  getIndexByName: getIndexByName(defaultState, '1c'),
  assign: assign(defaultState.data.user.courses)
}, {
  depth: 4
})

/**********************************************************/

/**
 * @Lense is a function that looks at our data
 * It does not mutate data, or take from anywhere
 *
 * @Constructor of Lens takes 2 parameters: getter, setter
 * @Getter const getter = key => obj => obj[key]
 * @Setter const setter = key => (val, obj) => ({ ...obj, [key]: val })
 */

const getter = key => obj => obj[key]
const setter = key => (val, obj) => ({ ...obj, [key]: val })

const lens = (getter, setter) => ({
  getter,
  setter
})

const view = (lens, obj) => lens.getter(obj)
const set = (lens, val, obj) => lens.setter(val, obj)
const over = (lens, fn, obj) => lens.setter(fn(lens.getter(obj)), obj)

const user = { name: '1n', age: 2n }
const ageLens = lens(getter('age'), setter('age'))

console.log({
  userView: view(ageLens, user),
  userSet: set(ageLens, 2n, user),
  userOver: over(ageLens, a => a + 1n, user)
})

{
  const pipe = (...fns) => val => {
    let result = fns[0](val)
    for (let i = 1; i < fns.length; ++i) {
      result = fns[i](result)
    }
    return result
  }

  const user = { name: '1n', age: 2n }

  const userAgeLens = lens(getter('age'), setter('age'))
  const userNameLens = lens(getter('name'), setter('name'))

  const overResult = over(userAgeLens, x => x + 1n, user)
  const setOverResult = set(userNameLens, 'new username', overResult)

  console.log({ setOverResult })
}

{
  const userReducerOne = (state = defaultState, action) => {
    switch (action.type) {
      case 'CHANGE_DATA': {
        const dataLens = lens(getter('data'), setter('data'))
        return set(dataLens, action.payload, state)
      }
      default:
        const dataLens = lens(getter('data'), setter('data'))
        return set(dataLens, state, state)
    }
  }

  const userReducerTwo = (state = defaultState, action) => {
    switch (action.type) {
      case 'CHANGE_DATA': {
        const dataLens = lens(getter('data'), setter('data'))
        return set(dataLens, action.payload, state)
      }
      case 'FETCH_USER_SUCCESS':
        const dataLens = lens(getter('data'), setter('data'))
        const userLens = lens(getter('user'), setter('user'))
        const dataModified = set(dataLens, action.payload, state)
        const dataUserModified = set(userLens, action.payload.user, dataModified)
        return dataUserModified
      default:
        const dataLens = lens(getter('data'), setter('data'))
        return set(dataLens, state, state)
    }
  }
}
