const { Either, toEither } = require('../03-ramda-fantasy');
const { toEitherSafe } = require('../to-either');
const { prop, map, compose } = require('ramda');
const { Maybe } = require('ramda-fantasy');

{
  /********************example-1************************* */

  const renderPage = (user) => `(${JSON.stringify(user)})`;
  const showLogin = () => `please, login`;

  const user = { username: '1n', age: 1 };

  {
    const openSite = (currentUser) => {
      if (currentUser) {
        return renderPage(currentUser);
      }
      return showLogin();
    };

    console.log({ openSiteWithUser: openSite(user) });
    console.log({ openSiteWithoutUser: openSite() });
  }

  {
    const wrapUserInEither = toEither(`user not logged in`);

    const controlFlow = Either.either(showLogin, renderPage);

    const current = wrapUserInEither(user);
    const noUser = wrapUserInEither(null);

    const openSiteWithUser = controlFlow(current);
    const openSiteWithoutUser = controlFlow(noUser);

    console.log({ openSiteWithUser, openSiteWithoutUser });
  }
}

{
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
}
