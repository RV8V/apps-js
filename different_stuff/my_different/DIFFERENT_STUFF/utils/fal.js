'use strict'

const fs = require('fs')
const path = require('path')

const { EventEmitter } = require('events')
const ee = new EventEmitter()

const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const watermark = require('image-watermark')

const R = require('./rebuild')
const Util2 = require('./utils/util2')

const promisify = (func, args) => new Promise((resolve, reject) =>
  func.apply(null, [...args, (err, result) =>
    err ? reject(err) : resolve(result)
  ])
)



const prom = (func, args) => new Promise((resolve, reject) =>
  func.apply(null, [...args, exists =>
    err ? reject(err) : resolve(result)
  ])
)



function check(imagePath) {
  return promisify(fs.exists, [imagePath])
}

function getItems(folder = __dirname) {
  return promisify(fs.readdir, [folder])
}
/*
const add = async imagePath => {
  const exists = fs.exists(imagePath, async exists => {
    console.log({ exists }, 'EXISTS')
    console.log('WATERWARK BEFORE EXISTS')
    if (!exists) return console.log('DO NOT ENTER')
    console.log('WATERWARK AFTER EXISTS')
    const options = {
      'text' : 'sample watermark',
      'color' : 'rgb(154, 50, 46)',
      'dstPath' : `${imagePath}`
    }
    watermark.embedWatermark(imagePath, options)
  })
  return 10
}
*/

const compress = async (folder, avatar) => {
    console.log('COMPRIK')
    const files = imagemin([`${folder}/${avatar}`], {
      destination: 'images',
      plugins: [ imageminJpegtran(), imageminPngquant({ quality: [0.6, 0.8] }) ]
    })
}


/*
const result = [
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584720491691.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584741200229.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584741210807.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584741217804.png'
  ]
*/

/*
const addWaterMark = async imagePath => {
  const options = {
    'text' : 'sample watermark',
    'color' : 'rgb(154, 50, 46)',
    'dstPath' : `${imagePath}`
  }


  arr.push(imagePath)
  console.log({ arr })

  const tasks = await Util2.chunkArray(result, 3, 8)
  //console.dir({ tasks }, { depth: 20 })

  watermark.embedWatermark(imagePath, options)
}


/*
const addWaterSign = async arr => {
  const tasks = await Util2.chunkArray(result, 3, 8)
  //console.dir({ tasks }, { depth: 20 })
  for (const file of tasks) {
    const { task } = file
    console.log({ task })

    const string = task.join('')
    const imagePath = string

    const options = {
      'text' : 'sample watermark',
      'color' : 'rgb(154, 50, 46)',
      'dstPath' : `${imagePath}`
    }

    watermark.embedWatermark(imagePath, options)
  }
}
addWaterSign(result)


/*
imagePath: '/home/ruslan/Documents/My/DRAFT/images/avatar-1584720491691.png'
task: [ '/home/ruslan/Documents/My/DRAFT/images/avatar-1584741217804.png' ]
string: '/home/ruslan/Documents/My/DRAFT/images/avatar-1584741217804.png'
*/





/*
const add = imagePath => {
  fs.exists(imagePath, exists => {
    console.log({ exists }, 'EXISTS')
    console.log('WATERWARK BEFORE EXISTS')
    if (!exists) return console.log('DO NOT ENTER')
    console.log('WATERWARK AFTER EXISTS')
    const options = {
      'text' : 'sample watermark',
      'color' : 'rgb(154, 50, 46)',
      'dstPath' : `${imagePath}`
    }

    watermark.embedWatermark(imagePath, options)
  })
}
*/



/*
const add = imagePath => {
  const options = {
    'text' : 'sample watermark',
    'color' : 'rgb(154, 50, 46)',
    'dstPath' : `${imagePath}`
  }
  console.log({ path: imagePath })
    //for (let i = 0; i < 10; i++) fs.readdirSync(__dirname)
    const exists = fs.existsSync(imagePath)
    console.log({ exists }, 'EXISTS')
    console.log('WATERWARK BEFORE EXISTS')

    if (!exists) return console.log('DO NOT ENTER')
    console.log('WATERWARK AFTER EXISTS')
    watermark.embedWatermark(imagePath, options)
}
*/



const add = async imagePath => {
  const options = {
    'text' : 'sample watermark',
    'color' : 'rgb(154, 50, 46)',
    'dstPath' : `${imagePath}`
  }
  console.log({ path: imagePath })
    //for (let i = 0; i < 10; i++) fs.readdirSync(__dirname)
    const exist = await check(imagePath)
    console.log({ exist }, 'EXISTS')
    console.log('WATERWARK BEFORE EXISTS')

    if (!exist) return console.log('DO NOT ENTER')
    console.log('WATERWARK AFTER EXISTS')
    watermark.embedWatermark(imagePath, options)
}


/*
const add = async imagePath => {
  const exists = await check(imagePath)
  console.log({ exists }, 'EXISTS')
  console.log('WATERWARK BEFORE EXISTS')
  if (exists) return console.log('DO NOT ENTER')
  console.log('WATERWARK AFTER EXISTS')
  const options = {
    'text' : 'sample watermark',
    'color' : 'rgb(154, 50, 46)',
    'dstPath' : `${imagePath}`
  }
  watermark.embedWatermark(imagePath, options)
}
*/










module.exports = { compress, add }
