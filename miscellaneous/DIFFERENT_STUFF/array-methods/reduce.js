'use strict'

Array.prototype.myreduce = Array.prototype.myreduce = function(callback, initialValue) {
  let acc = initialValue === undefined ? undefined : initialValue
  for (var i = 0; i < this.length; ++i) {
    if (acc !== undefined) {
      acc = callback(acc, this[i], i, this)
    } else {
      acc = this[i]
    }
  }
  return acc
}

{
  const numbers3 = [20, 20, 2, 3];
  const total = numbers3.reduce(function(a, b) {
    return a + b;
  }, 10);

  console.log(total); // 55

  const flattened = [
    [0, 1],
    [2, 3],
    [4, 5]
  ].reduce(function(a, b) {
    return a.concat(b);
  });

  console.log(flattened);
}

{
  const numbers3 = [20, 20, 2, 3];
  const total = numbers3.myreduce(function(a, b) {
    return a + b;
  }, 10);

  console.log(total); // 55

  const flattened = [
    [0, 1],
    [2, 3],
    [4, 5]
  ].myreduce(function(a, b) {
    return a.concat(b);
  });

  console.log(flattened);
}

{
  const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
  const object = fruitBasket.reduce((acc, value) => {
    if (acc[value] === undefined) {
      acc[value] = 0
    } else {
      acc[value] = acc[value] + 1
    }
    return acc
  }, {})

  console.log({ object })
}

{
  const dataset = [
    { username: 'username first', password: 'password first', email: 'email first' },
    { username: 'username second', password: 'password second', email: 'email second' },
    { username: 'username last', password: 'password last', email: 'email second' },
  ]

  const mapped = dataset.reduce((acc, { username, password, email }) => {
    if (acc['username'] === undefined) {
      acc['username'] = []
    } else {
      acc['username'] = [...acc['username'], username]
    }

    acc['password'] = acc['password'] === undefined ? [] : [...acc['password'], password]
    acc['email'] = acc['email'] === undefined ? [] : [...acc['email'], email]

    return acc
  }, {})

  console.log({ mapped })
}
