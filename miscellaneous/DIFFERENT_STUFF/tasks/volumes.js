'use strict'

const countCharEntries = (string, chars) => {
  let count = 0
  const letters = chars.split('')
  for (const char of string) {
    if (letters.includes(char)) {
      count++
    }
  }
  return count
}

const countCharEntriesShort = (string, chars, result) => (
  result = 0,
  chars = chars.split(''),
  [...string].map(char => chars.includes(char) ? result++ : 0),
  result
)

console.log({
  count: countCharEntries('string', 'set'),
  short: countCharEntriesShort('string', 'set')
})
