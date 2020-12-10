'use strict'

const cluster = require('cluster');if (cluster.isMaster) { require('./master.js') } else { require('./worker.js') }
/*
const fs = require('fs')
const data = fs.readdirSync(__dirname+'/images')
//const d = data.map(file => '/home/ruslan/Documents/My/DRAFT/images/' +file)
console.dir({ length: data.length }, { depth: 3000 })
*/
