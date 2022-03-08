const {
  map,
  chain,
  sequence,
  traverse,
  flip,
  curry,
  identity,
  compose,
  prop,
} = require('ramda');

const { toFuture } = require('../../cartoons/to-future/to-future');

const {
  cacheFuture,
  safeParse,
  trace,
  eitherToFuture,
  logger,
  constant,
  ramdaEither,
  futurifyWithEither,
} = require('./helpers');

const fs = require('fs');

const toReadFile = toFuture('readFile')(fs);
const toReadFileEither = futurifyWithEither(fs.readFile);

// const read = (encoding) => (path) => toReadFile(path, encoding);
const readEither = (encoding) => (path) => toReadFileEither(path, encoding);

const encoding = 'utf-8';
const fileName = 'package.json';

// const readPkgUpResultF = compose(
//   chain(eitherToFuture),
//   map(safeParse),
//   cacheFuture,
//   read(encoding)
// );

const readPkgUpResultF = compose(
  chain(eitherToFuture),
  map(safeParse),
  cacheFuture,
  chain(eitherToFuture),
  readEither(encoding)
);

/************************************* */

// readPkgUpResultF(fileName).fork(
//   logger('error occured while reading file'),
//   logger('read with success')
// );

/************************************* */

// depSemverRangeDictF :: Future Error Object
const pkgFieldValue = compose(prop, constant);

const eiPkgFieldValue = curry(
  compose(ramdaEither('dependencies are nullable'), prop)
);

/************************************* */

// console.log({
//   dep: pkgFieldValue('dependencies'),
//   pkgFieldValue: pkgFieldValue('dependencies')({ dependencies: true }),
//   //   eiPkgFieldValue: eiPkgFieldValue('dependencies'),
//   ei: eiPkgFieldValue('dependencies')({ dependencies: null }),
// });

// const depSemverRangeDictF = map(pkgFieldValue('dependencies'));

/************************************* */

// depNamesF :: Future Error [String]

const depSemverRangeDictF = compose(
  chain(eitherToFuture),
  map(eiPkgFieldValue('dependencies'))
);

const package = readPkgUpResultF(fileName);

/************************************* */

// depSemverRangeDictF(package).fork(
//   logger('error occured while getting package dependencies'),
//   logger('got package dependencies with success')
// );

/************************************* */

const fnDepNamesF = map(Object.keys);

const dependencies = depSemverRangeDictF(package);

/************************************* */

// depNamesF(dependencies).fork(
//   logger('error while getting keys'),
//   logger('keys with success')
// );

/************************************* */

const depNamesF = fnDepNamesF(dependencies);

const { join } = require('path');
const { lift } = require('ramda');

// joinPaths :: String -> [String] -> [String]
const joinPaths = (basePath, names) =>
  names.map((name) => join(basePath, name));

/************************************* */

// const curriedJoin = curry(join);

// // joinPaths :: String -> [String] -> [String]
// const joinPaths = (basePath) => map(curriedJoin(basePath));

/************************************* */

// mjoinPaths :: M String -> M [String] -> M [String]
const mjoinPaths = lift(joinPaths);

const { resolve } = require('path');
const { Future } = require('ramda-fantasy');

const pathF = Future.of(__dirname + fileName);

// depPathsF :: Future Error [String]
const depPathsF = mjoinPaths(
  pathF.map((path) => resolve(path, '../example/node_modules')),
  depNamesF
);

/************************************* */

depPathsF.fork(logger('err'), logger('ok'));

/************************************* */

// console.log({
//   joinPaths: joinPaths(__dirname + fileName, ['ramda', 'ramda-fantasy']),
// });

/************************************* */

// depsPkgJSONF :: Future Error [Object]
// The package.json of each dependency as an object

const readPkg = compose(chain(eitherToFuture), readEither(encoding));

// const depsPkgJSONF = depPathsF.chain(traverse(Future.of, readPkg));

const dep = Future.of(['ramda-package.json', 'ramda-fantasy.json']);

const depsPkgJSONF = compose(
  chain(traverse(Future.of, identity)),
  map(chain(eitherToFuture)),
  map(chain(safeParse)),
  chain(traverse(Future.of, readPkg))
);

const depVersionDictF = depsPkgJSONF(dep).map((depsPkgJSON) => {
  return depsPkgJSON.reduce((acc, val) => {
    acc[val.name] = val.version;
    return acc;
  }, {});
});

const columnify = require('columnify');

const depsColumnifyDataF = lift(
  (depNames, depSemverRangeDict, depVersionDict) => {
    return depNames.map((name) => {
      return {
        dependency: name,
        'semver-range': depSemverRangeDict[name],
        'installed-version': depVersionDict[name],
      };
    });
  }
)(depNamesF, dependencies, depVersionDictF);

depsColumnifyDataF.map(columnify).fork(logger('err'), logger('ok'));

/************************************* */

// depVersionDictF.fork(logger('err'), logger('ok'));

/************************************* */
