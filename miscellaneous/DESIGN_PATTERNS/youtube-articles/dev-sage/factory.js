class Tester {
  constructor(name) {
    this.name = name
  }
}

class Developer {
  constructor(name) {
    this.name = name
  }
}

class EmployeeFactoryOne {
  constructor() {}

  static create(name) {
    if (name === 'tester') {
      return new Tester(name)
    } else if (name === 'developer') {
      return new Developer(name)
    } else {
      return { name: 'default car name' }
    }
  }
}

const tester = EmployeeFactoryOne.create('tester')
const developer = EmployeeFactoryOne.create('developer')
const manager = EmployeeFactoryOne.create('manager')

console.log({
  tester,
  developer,
  manager
})

/********************************************************/

class EmployeeFactoryTwo {
  static PrototypeConstructors = {
    tester: Tester,
    developer: Developer
  }

  constructor() {
    this.checkPrototypeConstructorName = name => this.prototypeConstructors[name] || Error
  }

  static createOne(name) {
    const Constructor = this.PrototypeConstructors[name] || Error;
    return Constructor !== Error && new Constructor(name) || new Constructor(`Factory does not support class: ${name}`)
  }

  static createTwo(name) {
    const Constructor = this.PrototypeConstructors[name] || Error;
    return new Constructor(this !== Error && name || `Factory does not support class: ${name}`)
  }
}

const testerTwo = EmployeeFactoryTwo.createOne('tester')
const developerTwo = EmployeeFactoryTwo.createOne('developer')
const managerTwo = EmployeeFactoryTwo.createOne('manager')

const _testerTwo = EmployeeFactoryTwo.createTwo('tester')
const _developerTwo = EmployeeFactoryTwo.createTwo('developer')
const _managerTwo = EmployeeFactoryTwo.createTwo('manager')

console.log({ testerTwo, developerTwo, managerTwo })
console.log({ _testerTwo, _developerTwo, _managerTwo })

/********************************************************/

class _EmployeeFactoryTwo {
  static PrototypeConstructors = {
    tester: class Tester {
      constructor() {}
    },
    developer: class Developer {
      constructor() {}
    }
  }

  constructor() {
    this.checkPrototypeConstructorName = name => this.prototypeConstructors[name] || Error
  }

  static createOne(name) {
    const Constructor = this.PrototypeConstructors[name] || Error;
    return Constructor !== Error && new Constructor(name) || new Constructor(`Factory does not support class: ${name}`)
  }

  static createTwo(name) {
    const Constructor = this.PrototypeConstructors[name] || Error;
    return new Constructor(this !== Error && name || `Factory does not support class: ${name}`)
  }
}

const testerTwo_ = _EmployeeFactoryTwo.createOne('tester')
const developerTwo_ = _EmployeeFactoryTwo.createOne('developer')
const managerTwo_ = _EmployeeFactoryTwo.createOne('manager')

console.log({ testerTwo_, developerTwo_, managerTwo_ })

/********************************************************/

const factoryClass = (ConstructorName, name = ConstructorName) => new class ConstructorName {
  constructor() {
    this.name = name.toLowerCase()
  }
}

const test = factoryClass('Tester')
const dev = factoryClass('Developer')
const man = factoryClass('Manager')

console.log({ test, dev, man })

/********************************************************/

const factoryFunction = name => ({ name })

const _test = factoryFunction('Tester')
const _dev = factoryFunction('Developer')
const _man = factoryFunction('Manager')

console.log({ _test, _dev, _man })

/********************************************************/

const factoryModule = name => {
  const handlers = {
    tester: () => ({ name }),
    developer: () => ({ name, skills: 'normal' })
  }
  return handlers[name] && handlers[name]() || new Error(`Not supported: ${name}`)
}

const t = factoryModule('tester')
const d = factoryModule('developer')
const m = factoryModule('manager')

console.log({ t, d, m })

/********************************************************/

const factoryModuleTwo = name => {
  const handlers = {
    tester: () => ({ name }),
    developer: () => ({ name, skills: 'normal' })
  }
  try {
    return handlers[name]()
  } catch(err) {
    return new Error(`Not supported: ${name}`)
  }
}

const _t = factoryModuleTwo('tester')
const _d = factoryModuleTwo('developer')
const _m = factoryModuleTwo('manager')

console.log({ _t, _d, _m })
