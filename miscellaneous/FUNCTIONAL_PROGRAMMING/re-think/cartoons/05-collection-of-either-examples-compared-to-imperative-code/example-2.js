const { Either, toEither } = require('../03-ramda-fantasy');
const { prop, map, compose } = require('ramda');
const { Maybe } = require('ramda-fantasy');

/********************example-2************************* */

const user = { premium: false, preferences: ['english', 'ukrainian'] };
const defaltPrefs = ['franch', 'german'];

const loadPrefs = (prefs) => prefs;

{
  const getPrefs = (user) => {
    if (user.premium) {
      return loadPrefs(user.preferences);
    }
    return defaltPrefs;
  };

  console.log({ getPrefs: getPrefs(user) });
  console.log({ getPrefs: getPrefs({ ...user, premium: true }) });
}

const notPremium = (message) => defaltPrefs;

{
  const wrapUserInEither = toEither(`user does not have premium`);
  const controlFlow = Either.either(notPremium, loadPrefs);

  const current = wrapUserInEither(user).map(prop('preferences'));
  const noUser = wrapUserInEither(null);

  const getPrefWithUser = controlFlow(current);
  const getPrefWithoutUser = controlFlow(noUser);

  console.log({ getPrefWithUser, getPrefWithoutUser });
}

{
  const getPrefs = compose(
    map(prop('preferences')),
    toEither(`user does not have premium`)
  );
  const either = Either.either(notPremium, loadPrefs);
  const current = getPrefs(user);
  const no = getPrefs(null);

  console.log({ either: either(current) });
  console.log({ either: either(no) });
}

{
  const maybe = compose(map(prop('preferences')), Maybe.toMaybe);
  const resultWithUser = maybe(user).getOrElse(defaltPrefs);
  const result = maybe(null).getOrElse(defaltPrefs);

  console.log({ resultWithUser, result });
}
