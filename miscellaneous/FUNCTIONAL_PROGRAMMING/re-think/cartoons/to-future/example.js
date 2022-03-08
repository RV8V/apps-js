const { toFuture, futurify } = require('./to-future');
const fs = require('fs');
const Either = require('ramda-fantasy/src/Either');

const readPath = './cartoons/config.json';
const writePath = './cartoons/update-config.json';
const encoding = 'utf-8';

/**
 * @example
 */

const toReadFile = toFuture('readFile')(fs);
const toWriteFile = toFuture('writeFile')(fs);

console.log({ toReadFile, toWriteFile });

toReadFile(readPath, encoding).fork(console.log, console.log);
toWriteFile(writePath, '1').fork(console.log, console.log);

{
  /**
   * @can not convert future to either
   */
  const read = futurify(fs.readFile);

  const result = read(readPath, encoding).fork(Either.Left, Either.Right);
  console.log({ result });
}
