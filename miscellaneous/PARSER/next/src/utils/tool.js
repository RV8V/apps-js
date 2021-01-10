'use strict'

const fs = require('fs')
const path = require('path')

const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const watermark = require('image-watermark')

const { promisify } = require('../helpers/helper')

const compress = (folder, avatar) => {
  return imagemin([`${folder}/${avatar}`], {
    destination: 'images',
    plugins: [ imageminJpegtran(), imageminPngquant({ quality: [0.6, 0.8] }) ]
  })
}

const add = imagePath => {
  const options = {
    'text' : 'sample watermark',
    'color' : 'rgb(154, 50, 46)',
    'dstPath' : `${imagePath}`
  }
  fs.exists(imagePath, exists => {
  if (!exists) return console.log(`No such path of file: ${imagePath}`)
  return promisify(watermark.embedWatermarkWithCb, [imagePath, options])
 })
}

module.exports = { compress, add }
