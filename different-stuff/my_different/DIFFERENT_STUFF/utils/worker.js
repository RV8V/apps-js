'use strict'

const { EventEmitter } = require('events')
const ee = new EventEmitter()

const fs = require('fs')

const cluster = require('cluster')

const Tool = require('./fal')

const folder = 'uploads'

process.on('message', message => {
  //for (let i = 0; i < 10; i++) fs.readdirSync(__dirname)
  //process.on('start', Tool.add)

  console.log({ workertasReceived: message })

  //console.log('Message to worker ', process.pid)
  //console.log({ task: message.task })
  if (!message.task) return

  const result = message.task.map(async file => {
    //const Tool = require('./fal')

    console.log('INSIDE WORKER - START')
    const avatar = file.split('/')[7]

    console.log('COMPRESS GO')
    await Tool.compress('uploads', avatar)
    Tool.add(file)
    //for (let i = 0; i < 1000; i++) fs.readdirSync(__dirname)
    console.log({ file, avatar })
    console.log({ ava: avatar })

    //setTimeout(() => process.emit('start', file), 100)
    //ee.on('start', Tool.add)

  //  let j = 0
  //  for (let i = 0; i < 2000; i++) j += 6

    //Tool.compress('uploads', avatar)
    //Tool.add(file)


    //return 'hello'
    //try {
    //  Image.open(file).tobytes()
    //} catch(err) { console.log('detected error image %s' % file) }

  })

  //process.send({ result })
})

//setTimeout(() => {}, 2000)




/*
const compress = async (folder, avatar) => {
  const files_ = await imagemin([`${folder}/${avatar}`], {
    destination: 'images',
    plugins: [ imageminJpegtran(), imageminPngquant({ quality: [0.6, 0.8] }) ]
  })
}




const add = async imagePath => {
  const options = {
    'text' : 'sample watermark',
    'color' : 'rgb(154, 50, 46)',
    'dstPath' : `${imagePath}`
  }

  watermark.embedWatermark(imagePath, options)
}
*/
