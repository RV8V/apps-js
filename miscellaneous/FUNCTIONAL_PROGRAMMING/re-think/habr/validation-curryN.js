//грязное решение
let counter = 0;
const logAfter3Calls = () => {
  if (++counter == 3) console.log('called me 3 times');
};
logAfter3Calls(); // Ничего не происходит
logAfter3Calls(); // Ничего не происходит
logAfter3Calls(); // 'called me 3 times'

/***************************************** */

const R = require('ramda');

//чистое решение
const log = () => console.log(`returned result after calling 3 times`);

const logAfterThreeCalls = R.curryN(3, log);

logAfterThreeCalls('')('')('');

/****************************************** */

const Validation = require('data.validation'); //из folktalejs
const Success = Validation.Success;
const Failure = Validation.Failure;

function isUsernameValid(a) {
  return /^(0|[1-9][0-9]*)$/.test(a)
    ? Failure(["Username can't be a number"])
    : Success(a);
}

function isPwdLengthCorrect(a) {
  return a.length > 10
    ? Success(a)
    : Failure(['Password must be 10 characters']);
}

function ieEmailValid(a) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(a) ? Success(a) : Failure(['Email is not valid']);
}

const returnSuccess = () => 'success'; //просто возвращает success

function validateForm(username, pwd, email) {
  const success = R.curryN(3, returnSuccess); // 3 — потому что вызываем ap три раза.
  return Success(success)
    .ap(isUsernameValid(username))
    .ap(isPwdLengthCorrect(pwd))
    .ap(ieEmailValid(email));
}

const one = validateForm('raja', 'pwd123412567890', 'r@r.com').value;
//Output: success

const two = validateForm('raja', 'pwd', 'r@r.com').value;
//Output: ['Password must be 10 characters' ]

const three = validateForm('raja', 'pwd', 'notAnEmail').value;
//Output: ['Password must be 10 characters', 'Email is not valid']

console.log({ one, two, three });
