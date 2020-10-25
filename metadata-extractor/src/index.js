'use strict';

const { Worker } = require('worker_threads');
const path = require('path');
const os = require('os');
const fs = require('fs');

const Connect = require('./connection');

const folder = fs.readdirSync('../epub');
const workerPath = path.resolve('./worker.js');

const userCPUCount = os.cpus().length;

const calculateFactorialWithWorker = () => {
  const numbers = folder;
  const segmentSize = Math.ceil(numbers.length / userCPUCount);
  const segments = [];

  console.log({ inputLength: numbers.length, workers: userCPUCount, elementsByPart: segmentSize });
  console.log('Processing... wait approximately 7 minutes');

  for (let segmentIndex = 0; segmentIndex < userCPUCount; segmentIndex++) {
    const start = segmentIndex * segmentSize;
    const end = start + segmentSize;
    const segment = numbers.slice(start, end);
    segments.push(segment);
  }

  const promises = [];
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, { workerData: segment });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
    promises[i] = promise;
  }

  const array = [];
  return Promise.all(promises).then(results => {
    for (let i = 0; i < results.length; i++) {
      const arr = results[i];
      array.push(...arr);
    }
    Connect.saveTodatabase(array);
  });
};

calculateFactorialWithWorker();
