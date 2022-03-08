const { construct, prop, map, chain, compose } = require('ramda');
const { Future } = require('ramda-fantasy');

const fs = require('fs').promises;

const future = construct(Future);
const parse = JSON.parse;

// promiseToTask :: Promise a b -> Task a b
const promiseToFuture =
  (f) =>
  (...args) =>
    future((reject, resolve) =>
      f(...args)
        .then(resolve)
        .catch(reject)
    );

// fs.readFile('./yarn.json', 'utf-8').then((yarn) => {
//   const parsed = JSON.parse(yarn);
//   console.log({ parsed });
// });

const readYarnPackageFuture = promiseToFuture(fs.readFile)(
  './yarn.json',
  'utf-8'
);

const yarnPackage = readYarnPackageFuture.map(parse);

const yarnWorkspaces = yarnPackage.map(prop('workspaces'));
const yarnVersion = yarnPackage.map(prop('version'));

const whatEver = yarnWorkspaces.chain((workspaces) =>
  yarnVersion.map((version) => {
    return { workspaces, version, future: true };
  })
);

whatEver.fork(console.log, console.log);

// readFileFuture('./yarn.json', 'utf-8')
//   .map(JSON.parse)
//   .fork(
//     (err) => console.log({ err }),
//     (ok) => console.log({ ok })
//   );
