const { Either, toEither } = require('../03-ramda-fantasy');

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
