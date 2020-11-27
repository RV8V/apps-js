'use strict';

// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
global.api = {};
api.fs = require('fs');
api.vm = require('vm');
api.util = require('util');

function Req() {};
// #6
Req.prototype.fn = function (module) {
  console.log('ModuleName: ' + module);
  console.log('Time: ' + new Date());
  require(module);
}
// #4
Req.prototype.wrapped = function (path, fn) {
  const wrapped = item => {
    console.log('ApplicationName: ' + path);
    console.log('Time: ' + new Date());
    fn(item);
  };
  return wrapped;
}
// #8
Req.prototype.count = function(f) {
  console.log(f.length);
  console.log(f.toString());
}

const runSandboxed = path => {
  const context = {
    module: {},
    require: new Req().fn,
    api: {
      console: { log: new Req().wrapped(path, console.log) }, // #1
      timers: { setTimeout, setInterval },
      fs: api.fs,
      util: api.util // #2
      },
    }

  context.global = context;
  const sandbox = api.vm.createContext(context);
  // Read an application source code from the file
  api.fs.readFile(path, (err, src) => {
    // We need to handle errors here

    // Run an application in sandboxed context
    const script = new api.vm.Script(src);
    // #3
    if (process.argv[2] === path || path === 'usage.js') script.runInNewContext(sandbox);

    const exported = sandbox.module.exports;
    console.log(exported);

    //count args of exported function and print input code
    if (typeof exported === 'function') { new Req().count(exported); exported() }

    // print type of exported inside items, (instance of Map)
    // console.log(exported)
    // exported instanceof Map --- false
    else if (new Map([]) instanceof Map) {  // #7
      for (const [key, val] of exported.entries()) {
        console.log(key + ': ' + typeof val);
      };
    }

    // We can access a link to exported interface from sandbox.module.exports
    // to execute, save to the cache, print to console, etc.

  })
}

runSandboxed('usage.js');




/*
const vm = require('vm')
const x = 1

const context = { x: 2 }
const sandbox = vm.createContext(context)
const code = `s = 10, api => ${x}`
const script = new vm.Script(code)
const f = script.runInNewContext(sandbox)
console.log({f})
*/
/*
global.api = {}
api.fs = require('fs')
api.vm = require('vm')

const runSandboxed = fileName => {
  const context = {
    module,
    api: { console, timers: { setTimeout: setTimeout }, fs: api.fs }
  }
  context.global = context
  const sandbox = api.vm.createContext(context)
  api.fs.readFile(fileName, 'utf8', (err, data) => {
    const script = new api.vm.Script(data)
    const f = script.runInNewContext(sandbox)
    if (typeof f === 'function') f()
  })
}
runSandboxed('./ex.js')
*/
