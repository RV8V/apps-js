
function log(constructor: Function) {
  console.log({ constructor }, '\n')
}

function log2(target: any, propname: string | symbol) {
  console.log({ target })
  console.log({ propname }, '\n')
}

function log3(target: any, propname: string | symbol, descriptor: PropertyDescriptor) {
  console.log({ target })
  console.log({ propname })
  console.log({ descriptor }, '\n')
}

// example
interface WrapperInterface {
  name: string
  username: string
}

function wrapper(options: WrapperInterface) {
  // without generic type <T> typescript does not understant parameters
  // so that we have to specify them to make it clear
  // <T> is a Constructor -- it has field constructor -- it means that <T> is really class
  // but we have to specify it clearly
  return function<T extends { new(...args: any[]): object }>(Constructor: T) {
    // here is what we want to add
    return class extends Constructor {
      constructor(...args: any[]) {
        super(...args)
        // args are parameters that are passed to base constructor (Component)
        // so that we can have access to this parameters
        // we intercept constructor
      }
    }
  }
}

@log
@wrapper({
  name: 'hello',
  username: 'world'
})
class Component {
  @log2
  private name: string

  constructor(name: string) {
    this.name = name
  }

  @log3
  get getname(): string {
    return this.name
  }

  @log3
  logname(): void {
    console.log('Component name is', this.name)
  }
}

class Class {}
