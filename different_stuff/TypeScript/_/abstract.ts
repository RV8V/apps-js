
abstract class BaseClass {
  //protected readonly name: string
  //protected readonly surname: string

  protected getname(): void {
    //return this.name
  }

  abstract log(message: string): void
}

class ChildClass extends BaseClass {
  constructor(private readonly username: string) {
    super()
  }
  log(message: string): void {
    console.log(new Date().toLocaleString() + ': ' + message)
  }
  public /*get*/ getusername(): string {
    return this.username
  }
}

const instance = new ChildClass('hello world')
instance.log('hello')
instance.getusername()

// interface

interface IUser {
  readonly name: string
}

class Person implements IUser {
  name: string // we can not user thsese --> public, protected, private here

  constructor(name: string) {
    this.name = name
  }
}

interface Man extends IUser {
  readonly isTeacher: boolean
}

const user1: Person = new Person('name')
const user2: Man = { name: 'name', isTeacher: true }
const user3: IUser = { name: 'John' }

interface First {
  value: number
}

interface Second {
  key: string
}

class Class implements First, Second {
  constructor(public value: number, public key: string) {}
}

class ClassNext extends Class implements Second {
  constructor() {
    super(10, 'hello from child class')
  }
}
