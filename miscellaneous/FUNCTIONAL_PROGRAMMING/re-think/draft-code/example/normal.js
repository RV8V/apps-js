/**
 * @print each dependency’s name,
 * @its semver range,
 * @and the actual version installed in @node_modules.
 */

const {
  map,
  chain,
  traverse,
  curry,
  identity,
  compose,
  prop,
  reduce,
  lift,
} = require('ramda');

const {
  cacheFuture,
  safeParse,
  eitherToFuture,
  logger,
  ramdaEither,
  futurifyWithEither,
} = require('./helpers');

const fs = require('fs');
const { resolve, join } = require('path');

const { Future } = require('ramda-fantasy');

const columnify = require('columnify');

const toReadFileEither = futurifyWithEither(fs.readFile);

const readEither = (encoding) => (path) => toReadFileEither(path, encoding);

const encoding = 'utf-8';
const fileName = 'package.json';

const readPkgUpResultF = compose(
  chain(eitherToFuture),
  map(safeParse),
  cacheFuture,
  chain(eitherToFuture),
  readEither(encoding)
);

const eiPkgFieldValue = curry(
  compose(ramdaEither('dependencies are nullable'), prop)
);

const depSemverRangeDictF = compose(
  chain(eitherToFuture),
  map(eiPkgFieldValue('dependencies'))
);

const package = readPkgUpResultF(fileName);
const dependencies = depSemverRangeDictF(package);

const fnDepNamesF = map(Object.keys);
const depNamesF = fnDepNamesF(dependencies);

const curriedJoin = (dirname) => (name) => join(dirname, name);

const joinPaths = (basePath) => map(curriedJoin(basePath));

const mjoinPaths = lift(joinPaths);

const pathF = Future.of(__dirname + fileName);

const curriedResolve = (end) => (path) => resolve(path, end);

const resolvedPathF = map(curriedResolve('../example/node_modules'));

const depPathsF = mjoinPaths(resolvedPathF(pathF), depNamesF);

const readPkg = compose(chain(eitherToFuture), readEither(encoding));

const depsPkgJSONF = compose(
  chain(traverse(Future.of, identity)),
  map(chain(eitherToFuture)),
  map(chain(safeParse)),
  chain(traverse(Future.of, readPkg))
);

const constructPcks = (acc, val) => ({ ...acc, [val.name]: val.version });

const getDepVersionDictF = map(reduce(constructPcks, {}));

/**
 * @use dep here because of err while reading node_modules/
 */

const dep = Future.of(['ramda-package.json', 'ramda-fantasy.json']);

const depVersionDictF = getDepVersionDictF(depsPkgJSONF(dep));

// const depVersionDictF = getDepVersionDictF(depsPkgJSONF(depPathsF));

const handleMap = (depSemverRangeDict, depVersionDict) => (name) => ({
  dependency: name,
  'semver-range': prop(name)(depSemverRangeDict),
  'installed-version': prop(name)(depVersionDict),
});

const handleDependencies = (depSemverRangeDict, depVersionDict, names) =>
  map(handleMap(depSemverRangeDict, depVersionDict), names);

const fnDepsColumnifyDataF = lift(handleDependencies);

const depsColumnifyDataF = fnDepsColumnifyDataF(
  dependencies,
  depVersionDictF,
  depNamesF
);

depsColumnifyDataF
  .map(columnify)
  .fork(logger('err while logging columns'), logger('worked with success'));
