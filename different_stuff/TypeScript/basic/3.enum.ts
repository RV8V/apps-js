enum MemberShip {
  simple,
  standard,
  premium
}

const simpleValue = MemberShip.simple
const simpleName = MemberShip[0]

console.log({ simpleValue, simpleName })

enum Different {
  first = 'hello world',
  second = 'good bye'
}

const value = Different.first // value not a key
console.log({ value })
