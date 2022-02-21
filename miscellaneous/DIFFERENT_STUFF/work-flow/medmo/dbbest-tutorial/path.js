const http = require.resolve('http');
const path = require('path');

const defaultPath = 'root/folder/index.js';

const pathValues = [path.basename, path.dirname, path.extname, path.isAbsolute, path.parse].map(f => ({ [f.name]: f(defaultPath) }));

console.log({ pathValues })
