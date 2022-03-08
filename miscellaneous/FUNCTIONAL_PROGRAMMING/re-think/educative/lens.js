const { compose, lensIndex, lensProp, view } = require('ramda');

const person = {
  firstName: 'Bobo',
  lastName: 'Flakes',
  friends: [
    {
      firstName: 'Clark',
      lastName: 'Kent',
    },
    {
      firstName: 'Bruce',
      lastName: 'Wayne',
    },
    {
      firstName: 'Barry',
      lastName: 'Allen',
    },
  ],
};

const getThirdFriend = compose(lensProp('friends'), lensIndex(2));

const result = view(getThirdFriend, person);

console.log({ result });
