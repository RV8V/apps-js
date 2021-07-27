const R = require('ramda')

const setError1 = (err, obj) => {
  const lens = R.lensPath([err.field, 'errors'])
  return R.over(lens, v => R.uniq(R.append(err.message, v)), obj)
}

const setErrorRefactor2 = (err, obj) => {
  const lens = R.lensPath([err.field, 'errors'])
  const appendUniq = R.compose(R.uniq, R.append(err.message))
  return R.over(lens, appendUniq, obj)
}

const appendUniqNormal3 = R.curry(R.compose(R.uniq, R.append))

const setErrorRefactorNormal3 = (err, obj) => {
  const lens = R.lensPath([err.field, 'errors'])
  return R.over(lens, appendUniqNormal3(err.message), obj)
}

/** @: Not correct */
const appendUniqNormal4 = R.curry(R.compose(R.uniq, R.append))
const setErrorRefactorNormal4 = R.curry((obj, err) => {
  const lens = R.lensPath([err.field, 'errors'])
  return R.over(lens, appendUniqNormal4(err.message), obj)
})(errors = {})

const validationNameErr = {
  message: {
    name: 'is not correct',
  },
  field: 'Validation'
}

const validationSurnameErr = {
  message: {
    surname: 'is not correct',
  },
  field: 'Validation'
}

const authErr = {
  message: {
    auth: 'Failed',
    success: false
  },
  field: 'Auth'
}

{
  const errors = {}

  const setValidationNameErr = setError1(validationNameErr, errors)
  const setValidationSurnameErr = setError1(validationSurnameErr, setValidationNameErr)
  const setAuthErr = setError1(authErr, setValidationSurnameErr)

  console.dir({ first: setAuthErr }, { depth: 5 })
}

{
  const errors = {}

  const setValidationNameErr = setErrorRefactor2(validationNameErr, errors)
  const setValidationSurnameErr = setErrorRefactor2(validationSurnameErr, setValidationNameErr)
  const setAuthErr = setErrorRefactor2(authErr, setValidationSurnameErr)

  console.dir({ second: setAuthErr }, { depth: 5 })
}

{
  const errors = {}

  const setValidationNameErr = setErrorRefactorNormal3(validationNameErr, errors)
  const setValidationSurnameErr = setErrorRefactorNormal3(validationSurnameErr, setValidationNameErr)
  const setAuthErr = setErrorRefactorNormal3(authErr, setValidationSurnameErr)

  console.dir({ third: setAuthErr }, { depth: 5 })
}

{
  /** @: Not correct */

  const errors = {}

  const setValidationNameErr = setErrorRefactorNormal4(validationNameErr)
  const setValidationSurnameErr = setErrorRefactorNormal4(validationSurnameErr)
  const setAuthErr = setErrorRefactorNormal4(authErr)

  console.dir({ fourth: setAuthErr }, { depth: 5 })
}

/**********************************************************/

const user = { name: '1n', age: 2n }

const userAgeLens = R.lens(R.prop('age'), R.assoc('age'))
const overUserAgeLens = R.over(userAgeLens, age => (console.log({ age }), age + 1n), user)

console.log({ overUserAgeLens })

/**********************************************************/

const data = {
  name: {
    firstName: 'f1',
    lastName: 'l1'
  },
  age: 2n
}

const lensPathLens = R.lensPath(['name', 'firstName'])
const overLensPathLens = R.over(lensPathLens, x => (console.log({ x }), x + ' string'), data)

console.log({ overLensPathLens })

/**********************************************************/

const errs = [
  { message: 'Validation Error' },
  { message: 'Auth Failed' }
]

const appendErr = (err, errors) => R.append(err, errors)

const smth = { message: 'new error occured' }
const socket = { message: 'socket corrunted' }
const same = { message: 'socket corrunted' }

const addedSmthErr = appendErr(smth, errs)
const addedSocketErr = appendErr(socket, addedSmthErr)
const addedSameErr = appendErr(socket, addedSocketErr)

console.dir({ addedSameErr, uniq: R.uniq(addedSameErr) }, { depth: 4 })

/**********************************************************/
