#! /usr/bin/env node
const { resolve, dirname } = require('path');
const R = require('ramda');
// const fs = require('mz/fs');
const fs = require('fs');
const yaml = require('js-yaml');

const foldP = R.uncurryN(3, f => acc =>
  R.reduce(
    (promise, ...item) => promise.then(acc => f(acc, ...item)),
    Promise.resolve(acc),
  ),
);

const path = R.partial(resolve, [process.cwd()]);

const run = (traverse, contentBuffer, filePath) =>
  traverse(
    yaml.safeLoad(contentBuffer.toString()),
    R.partial(resolve, [dirname(filePath)]),
  );

const traverse = async (swagger, swaggerPath) => {
  return foldP(
    async (acc, [key, value]) => {
      if (key === '$fs-ref') {
        return foldP(
          async (acc, value) => {
            const dependencyPath = swaggerPath(value);
            const content = await fs.readFileSync(dependencyPath);
            const traversedValue = await run(traverse, content, dependencyPath);
            if (R.is(Array, traversedValue) && R.isEmpty(acc)) {
              return traversedValue;
            }
            return R.merge(acc, traversedValue);
          },
          acc,
          R.unless(R.isArrayLike, R.of, value),
        );
      }
      value = R.is(Object, value) ? await traverse(value, swaggerPath) : value;
      key = R.test(/^\d+$/, key) ? Number(key) : key;
      const set = R.type(acc) === 'Array' ? R.update : R.assoc;
      const result = set(key, value, acc);
      return R.is(Array, result) && R.is(Array, acc) && acc.length - 1 === key
        ? R.flatten(result)
        : result;
    },
    R.type(swagger) === 'Array' ? R.times(R.identity, swagger.length) : {},
    R.toPairs(swagger),
  );
};

(async () => {
  const [, , layout, build] = process.argv;
  const layoutPath = path(layout);
  const content = await fs.readFileSync(path(layout), 'utf-8');

  console.log({ res: yaml.safeDump(await run(traverse, content, layoutPath)) })

  console.log({ path: path(build) })

  // const f = require('fs')
  //
  // const file = f.writeFileSync(path(build), yaml.safeDump(await run(traverse, content, layoutPath)))
  //
  // console.log({ file })

  const result = await fs.writeFileSync(
    path(build),
    yaml.safeDump(await run(traverse, content, layoutPath)),
    'utf-8',
  );


  // const system = require("fs");
  //
  // system.writeFile(path(build), "Hello мир!", function(error){
  //
  // 	if(error) throw error; // если возникла ошибка
  // 	console.log("Асинхронная запись файла завершена. Содержимое файла:");
  // 	let data = fs.readFileSync(path(build), "utf8");
  // 	console.log(data);	// выводим считанные данные
  // });

})().catch(error => {
  console.error(error.stack);
  process.exit(1);
});
