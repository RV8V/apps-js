
function log(constructorFn: Function) {
  console.log(constructorFn)
}

function shouldLog(flag: boolean): any {
  return flag ? log : null
}

@shouldLog(false)
class User {
  constructor(private readonly name: string) {}
}

// next
type Input = { password: string, email: string }

const addNewFields = ({ password, email }: Input) => (constructor: Function) => {
  //const user = constructor.prototype.constructor(password, email)
  //constructor.prototype.password = password
  //constructor.prototype.email = email
  constructor.prototype.addFields = function(): boolean {
    this.password = password
    this.email = email
    return true
  }
  constructor.prototype.getPassword = function(): string {
    return this.password
  }
  console.log('decorator addNewFields was here')
}

@addNewFields({ password: 'secret', email: 'email@gmail.com' })
class Persone {
  constructor(private name: string, private surname: string) {}
}

const persone: Persone = new Persone('name', 'surname')
console.log({
  decorator: (<any>persone).addFields(),
  password: (<any>persone).getPassword(),
  email: (<any>persone).email
})
















//
