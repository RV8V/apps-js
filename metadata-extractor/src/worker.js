'use strict';

const { parentPort, workerData } = require('worker_threads');

const Helpers = require('../lib/helper');
const Process = require('../lib/parser');

const input = [];
const prepare = async task => {
  for (let i = 0; i < task.length; i++) {
    try {
      const folder = task[i];
      const file = await Helpers.getItems(`../epub/${folder}`);
      const items = await Helpers.getFile(`../epub/${folder}/${file}`);
      const res = await Helpers.getRes(items);
      const dataset = Process.process_(res);
      input.push(dataset);
    } catch (err) { console.log(err); }
  }
  parentPort.postMessage(input);
};

prepare(workerData);
