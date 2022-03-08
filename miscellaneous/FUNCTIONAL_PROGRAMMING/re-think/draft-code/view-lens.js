const {
  curry,
  defaultTo,
  lensProp,
  lensPath,
  compose,
  view,
} = require('ramda');

const { Either } = require('ramda-fantasy');

const reflectObject = {
  data: {
    get: {
      system: {
        ntp: 3,
      },
    },
  },
};

const dataLens = lensProp('data');
const getLens = lensProp('get');
const systemLens = lensProp('system');
const ntpLens = lensProp('ntp');

// const dataGetSystemNtpLens = compose(dataLens, getLens, systemLens, ntpLens);
const dataGetSystemNtpLens = lensPath(['data', 'get', 'system', 'ntp']);

const constructFn = curry((defaultTo, view) => compose(defaultTo, view));

// const viewOr = (defaultValue, lens) =>
//   Either.of(constructFn)
//     .ap(Either.of(defaultTo(defaultValue)))
//     .ap(Either.of(view(lens)));

const viewOr = curry((defaultValue, lens) =>
  compose(defaultTo(defaultValue), view(lens))
);

const viewPipe = viewOr('not found', dataGetSystemNtpLens);

// console.log({ view: viewPipe.ap(Either.of(reflectObject)) });
// console.log({ view: viewPipe.ap(Either.Left(null)) });

console.log({ view: viewPipe(reflectObject) });
console.log({ view: viewPipe(null) });

// const viewOr = curry((defaultValue, lens, obj) =>
//   pipe(view(lens), defaultTo(defaultValue))(obj)
// );

// console.dir(viewOr(null, dataGetSystemNtpLens, reflectObject));
