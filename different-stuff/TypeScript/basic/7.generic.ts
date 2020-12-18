
const numbers: Array<number> = [1,2,3,4]
const strings: Array<string> = ['1', '2']

function reverse<T>(arr: T[]): T[] {
  return arr.reverse()
}

reverse<number>(numbers)
reverse<string>(strings)
