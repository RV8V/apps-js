const { Success, Failure } = require('data.validation')
const { curryN } = require('ramda')

const notBlank = v => v && Success(v) || Failure(['field must be not blank'])

const maxLength = (length, v) => ('' + v).length <= length && Success(v) || Failure(['value is too long'])

const notWhiteSpace = v => v !== 'notWhiteSpace' && Success(v) || Failure(['can not be notWhiteSpace'])

const combined = (length, v) =>
  Success(curryN(3, () => 'validation passed with success'))
    .ap(notBlank(v))
    .ap(notWhiteSpace(v))
    .ap(maxLength(length, v))

console.log({
  Success: combined(10, '12'),
  Failure: combined(1, 111)
})
