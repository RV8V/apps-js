const { futurify } = require('./to-future/to-future');
const { sequence, traverse } = require('ramda');
const { Future } = require('ramda-fantasy');
const fs = require('fs');

const readFile = futurify(fs.readFile);

const files = ['./cartoons/config.json', './cartoons/update-config.json'];

const listOfFutures = files.map((file) => readFile(file, 'utf-8'));
const futureOfList = sequence(Future.of, listOfFutures);

const same = traverse(Future.of, (file) => readFile(file, 'utf-8'), files);

listOfFutures.map((future) => future.fork(console.log, console.log));
futureOfList.fork(console.log, console.log);

same.fork(console.log, console.log);
