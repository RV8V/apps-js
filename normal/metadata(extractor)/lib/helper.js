'use strict';

const fs = require('fs');
const xml = require('xml2js');

const parser = new xml.Parser();

const promisify = (func, args) => new Promise((resolve, reject) =>
  func.apply(null, [...args, (err, result) =>
    (err ? reject(err) : resolve(result))
  ])
);

function getItems(folder) {
  return promisify(fs.readdir, [folder]);
}

function getFile(file) {
  return promisify(fs.readFile, [file]);
}

function getRes(items) {
  return promisify(parser.parseString, [items]);
}

module.exports = { getItems, getFile, getRes };
