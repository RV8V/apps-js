#! /usr/bin/env node

var fs = require('fs');
var path = require('path');

fs.readFile(path.resolve(__dirname, 'bears.txt'), function(err, data) {
  var bears = String(data).split('\n');
  console.log({ bears })
});
