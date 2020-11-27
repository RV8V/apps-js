// array
const arr1: Array<any> = [1, true]
const arr2: any[] = [1, true]

const arr3: Array<string | number> = [1, '2']
const arr4: (string | number)[] = [1, '1']

const arr5: (string | number)[][] = [ [1], ['hello'] ]


// object
const o: { name: string, age: number, log: () => string } = {
  name: 'name',
  age: 30,
  log() { return this.name }
}

type T = (string | number)[]
type Man_ = { jobs: T, log?: () => T }

























//
