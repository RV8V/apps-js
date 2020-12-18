'use strict'

process.on('message', message => {
  console.log({ message })
  const { task } = message
  /*if (!task) return
  for (const file of task) {
    const str = file.split('/')
    const avatar = str[str.length - 1]
    const folder = str[str.length - 2]
    Tool.compress(folder, avatar).then(file => {
      const { destinationPath } = file[0]

      return Tool.add(destinationPath)
    }).then(() => {
      process.send(avatar)
    }).catch(err => console.log(`Error: ${err}`))
  }*/
})
