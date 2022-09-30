// const [ [ 'name', '1n' ], [ 'file', '' ], [ 'same', 1 ] ]
// > Object.entries(payload).reduce(([field, value]) => { acc[field] = value || 1; return acc } , {})
// Uncaught:
// TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
//     at REPL20:1:32
//     at Array.reduce (<anonymous>)

const payload = {
  name: 'name1',
  file: '',
  password: 1,
};

const user = {
  name: 'current name',
  file: 'filename',
  password: 2,
};

const f = (user, payload) => {
  return Object.entries(payload).reduce((acc, [field, value]) => {
    acc[field] = value || user[field];
    return acc;
  }, {});
};

console.log({ f: f(user, payload) });
