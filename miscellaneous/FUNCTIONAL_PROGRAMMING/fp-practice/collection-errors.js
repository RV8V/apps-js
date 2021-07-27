/**
 * @Validation
 * @Known as Functor Validation, Validation Applicativness, Monada Validation
 * @Validation similar to Either
 * @Either returns first error, Validation returns an Array of errors
 * @Usage for form validation. (e.g. Registration Form)
 *
 * @like in Either, we have 2 constructors Success, Failure
 */

/** @Folktalejs from */

const Validation = require('data.validation')

const Success = Validation.Success
const Failure = Validation.Failure

const R = require('ramda')

const numericRegExp = /^(0|[1-9][0-9]*)$/
const validEmailReqExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/** @Instead of */

const isUsenameValid = name => numericRegExp.test(name) ? ['Username can not be numeric'] : name

/** @Use */

const isUsenameValidV = name => numericRegExp.test(name) ? Failure(['Username can not be numeric']) : Success(name)
const isPasswordLengthCorrect = password => password.length < 5 ? Failure(['password length is short']) : Success(password)
const isEmailValid = email => validEmailReqExp.test(String(email).toLowerCase()) ? Success(email) : Failure(['Email is not valid'])

const returnSuccess = () => 'success'

/** @.ap left part of this method should be Functor or Monada containing Function */

/** @.will be worked if monad1 will contain function, result of monad1.ap(monad2) also should contain function and so.on */
/** @const finalResult = monad1.ap(monad2).ap(monad3) */

console.log({
  failure: Success(returnSuccess)
    .ap(isUsenameValidV(1111)),
  success: Success(returnSuccess)
    .ap(isUsenameValidV('username')),
  // successDoNotWorking: Success(returnSuccess)
  //   .ap(isEmailValid('ertg@gmail.com'))
  //   .ap(isUsenameValidV('username'))
  //   .ap(isPasswordLengthCorrect('123456'))
})

const validateForm = (username, password, email) => {
  const success = R.curryN(3, returnSuccess)
  return Success(success)
    .ap(isEmailValid(email))
    .ap(isUsenameValidV(username))
    .ap(isPasswordLengthCorrect(password))
}

console.log({
  validateForm1: validateForm('qwe', 'pwd12345', '3,@gmail.com'),
  validateForm1: validateForm('qwe', 'pwd12345', '3,@gmail.com'),
  validateForm1: validateForm(123, 'pwd5', 'gmail.com')
})
