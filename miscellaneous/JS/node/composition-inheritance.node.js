'use strinct'

const input = {
  name: 'name',
  age: 0,
  title: 'title',
  salary: 0
}

const PersonInheritance = class {
  constructor(name, age, title) {
    this.name = name
    this.age = age
    this.title = title
  }
}

const EmployeeInheritance = class extends PersonInheritance {
  constructor(name, age, title, salary) {
    super(name, age, title)
    this.salary = salary
  }
}

const employeeInheritance = new EmployeeInheritance({
  name: input.name,
  age: input.age,
  title: input.title
})

const PersonComposition = class {
  constructor(name, age, title) {
    this.name = name
    this.age = age
    this.title = title
  }
}

const EmployeeComposition = class {
  constructor(person, salary) {
    this.name = person.name
    this.age = person.age
    this.title = person.title
    this.salary = salary
  }
}

const employeeComposition = new EmployeeComposition({
  person,
  person.salary
});
