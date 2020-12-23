let count = 0;

const recurse = () => count++ === 5 ? console.log('end') : (console.log('enter ', count), recurse())
const pow = (x, y) => y === 0 ? 1 : x * pow(x, y - 1);

recurse()
pow(2, 3)

const company = {
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

const calculate = department => {
  if (Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0);
  } else {
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += calculate(subdep);
    }
    return sum;
  }
}

const object = {
  sales: [1, 2, 4],
  development: { a: 1, b: 2 }
}

/**
 *
 * @Object.values make array of object values
*/

console.log({ values: Object.values(object) })
console.log({ values: Object.values({ a: 1, b: 2 }) })

console.log(calculate(company))

const list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

const printList = list => {
  while(list) {
    console.log({ value: list.value })
    list = list.next
  }
}

const printListRec = list => {
  console.log({ value: list.value })
  if (list.next) {
    printListRec(list.next)
  }
}

const sum = value => {
  if (value === 1) return 1;
  else return value + sum(value - 1);
}

console.log({ result: sum(4) })

printListRec(list)
printList(list)
