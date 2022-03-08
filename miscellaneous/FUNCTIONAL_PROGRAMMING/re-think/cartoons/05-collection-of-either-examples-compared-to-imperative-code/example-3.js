const { Either, toEither } = require('../03-ramda-fantasy');
const { prop, map, compose, chain, pathOr } = require('ramda');
const { Maybe } = require('ramda-fantasy');

/********************example-3************************* */

const user = {
  address: {
    street: {
      name: 'street name',
    },
  },
};

{
  const streetName = (user) => {
    const address = user.address;

    if (address) {
      const street = address.street;

      if (street) {
        return street.name;
      }
    }
    return 'no street';
  };

  console.log({ streetName: streetName(user) });
  console.log({ streetName: streetName({}) });
}

const defaultStreet = () => `no street`;
const id = (x) => x;

{
  const streetName = compose(
    map(prop('name')),
    chain(toEither(`user street in nullable`)),
    map(prop('street')),
    toEither(`user is nullable`),
    prop('address')
  );

  const flow = Either.either(defaultStreet, id);
  const userEither = streetName(user);
  const noUserEither = streetName({});

  console.log({ streetName: flow(userEither) });
  console.log({ streetName: flow(noUserEither) });
}

{
  const streetName = compose(
    map(pathOr('no street', ['address', 'street', 'name'])),
    Maybe.toMaybe
  );

  const current = streetName(user).chain(id);
  const no = streetName({}).chain(id);

  console.log({ current, no });
}
