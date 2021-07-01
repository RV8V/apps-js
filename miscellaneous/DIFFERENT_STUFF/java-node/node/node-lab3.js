'use strict'

'C3 = 9303 % 3 = 0'
'C13 = 9303 % 17 = 4'
'replace first and last words in sentence'

const replaceWords = str => {
  const arr = str.split(' ')
  const first = arr.shift()
  const last = arr.pop()
  return [last, ...arr].concat([first]).join(' ')
}

const questionPrint = str => {
  const strings = str.split('?')

  const set = []

  for (let i = 0; i < strings.length; i++) {
    const arr = strings[i].split(' ')

    for (let j = 0; j < arr.length; j++) {
      if (!set.includes(arr[j])) {
        set.push(arr[j])
      }
    }
  }

  return set.filter(element => !!element).map(element => {
    return {
      element,
      length: element.length
    }
  })
}

'console.log({ res: replaceWords(\'hello world, I am here\') })'
'console.log({ res: questionPrint(\'hello hello hello name here name hello?Hello world?\') })'
