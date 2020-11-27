interface IUser {
  readonly id: string
  readonly name: string
  readonly password?: string
}

type Type = string

const user: IUser = { id: '4', name: 'hello', password: 'secret' }

// привидение типов

const persone = { id: 'undefined', name: 'string' } as IUser
const perosne = <IUser>{}

const str: Type = 'hello world'
const anotherStr = (30 as any) as number

const value: number = 3
const string = <Type><any>value

// interface inheritance (extends)

interface One { readonly name: string }
interface Next extends One { readonly surname: string }

const one: One = { name: 'name' }
const next: Next = { name: 'name', surname: 'surname' }

// class and interface (implements)

interface IClock {
  time: Date
  setDate(date: Date): Date
}

class Clock implements IClock {
  public time: Date = new Date()

  constructor(time: Date) {
    this.time = time
  }

  setDate(date: Date): Date {
    this.time = date
    return date
  }
}

// interface for object that has a lot of dinamil keys

// simle example
interface Style { border: string, margin: string }
const style: Style = { border: '30', margin: '32', /*middle: '33'*/ }

interface Styling {
  [key: string]: string
}

const slyling: Styling = {
  border: 'hello world',
  middle: 'middle',
  // ...
}


















//
