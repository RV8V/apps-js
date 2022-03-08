const {
  lensPath,
  over,
  uniq,
  append,
  compose,
  curry,
  always,
  call,
  prop,
  pipe,
  flip,
} = require('ramda');

/***************1111111111111**************** */

const setError = (err, errorLog) => {
  const lens = lensPath([err.field, 'errors']);
  return over(
    lens,
    (value) => {
      console.log({ value });
      return uniq(append(err.message, value));
    },
    errorLog
  );
};

const validationNameErr = {
  message: {
    name: 'is not correct',
  },
  field: 'Validation',
};

const validationSurnameErr = {
  message: {
    surname: 'is not correct',
  },
  field: 'Validation',
};

const authErr = {
  message: {
    auth: 'Failed',
    success: false,
  },
  field: 'Auth',
};

/***************22222222222222**************** */

const setError2 = (err, log) => {
  const logLens = lensPath([err.field, 'errors']);
  const setErrorMessage = compose(uniq, append(err.message));

  console.log({ setErrorMessage: setErrorMessage.length });
  return over(logLens, setErrorMessage, log);
};

/***************33333333333333**************** */

const setError3 = (err, log) => {
  const logLens = lensPath([err.field, 'errors']);
  /**
   * @setErrorMessage should be curried because com fn does not works - needs to partialy apply append fn with error message
   */
  const setErrorMessage = curry(compose(uniq, append));

  /**
   * @or use with without curring
   * @const com = compose(uniq, append);
   * @console.log({ com: com.length });
   * @return over(logLens, (newValue) => com(err.message, newValue), log);
   */

  console.log({ setErrorMessage: setErrorMessage.length });

  return over(logLens, setErrorMessage(err.message), log);
};

/***************444444444444444**************** */

const setError4 = (err, log) => {
  const tag = (x) => (console.log({ x }), x);
  const getConstant = compose(call, tag, always);

  /**
   * @console.log({
   *   getConstant: getConstant.length,
   *   errors: getConstant('errors'),
   * });
   */

  const logLens = lensPath([err.field, getConstant('errors')]);
  const setErrorMessage = curry(compose(uniq, append));
  return over(logLens, setErrorMessage(err.message), log);
};

/********************************************* */

/***************55555555555**************** */

const tag = (x) => (console.log({ x }), x);
const getConstant = compose(call, always);
const getValueByKey = compose(prop, getConstant);

const setError5 = (err, log) => {
  console.log({ getValueByKey: getValueByKey.length });

  const getFieldValue = getValueByKey('field');
  const logLens = lensPath([getFieldValue(err), getConstant('errors')]);
  const setErrorMessage = curry(compose(uniq, append));
  return over(logLens, setErrorMessage(err.message), log);
};

/********************************************* */

/***************666666666666666**************** */

const closureContext = pipe(flip(prop), getConstant);

const setError6 = (err, log) => {
  const getObjectValue = closureContext(err);
  const logLens = lensPath([getObjectValue('field'), getConstant('errors')]);
  const setErrorMessage = curry(compose(uniq, append));
  return over(logLens, setErrorMessage(getObjectValue('message')), log);
};

/********************************************* */

const errors = {};

const name = setError6(validationNameErr, errors);
const surname = setError6(validationSurnameErr, name);
const authLog = setError6(authErr, surname);

console.dir({ name, surname, errors, authLog }, { depth: 5 });
