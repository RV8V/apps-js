const showIndexPage = (url) => {
  const base = {};
  base.location = url;
  return base;
};

//Глобальная схема indexURL’ов для разных языков
let indexURLs = {
  en: 'http://mysite.com/en', //Английский
  sp: 'http://mysite.com/sp', //Испанский
  jp: 'http://mysite.com/jp', //Японский
};

//Пользовательский объект
let joeUser = {
  name: 'joe',
  email: 'joe@example.com',
  prefs: {
    languages: {
      primary: 'sp',
      secondary: 'en',
    },
  },
};

const R = require('ramda');
const Maybe = require('ramda-fantasy').Maybe;

{
  // //TODO Напишите это в императивном и функциональном стилях
  // const getUrlForUser = (user) => {
  //   //todo
  // };
  //apply url to window.location
  //Императивная версия:
  //Слишком много if-else и проверок на null; зависимость от глобальных indexURL’ов; «английские» URL’ы берутся для всех стран по умолчанию

  const getUrlForUser = (user) => {
    if (user == null) {
      //не залоггирован
      return indexURLs['en']; //возвращает страницу по умолчанию
    }
    if (
      user.prefs.languages.primary &&
      user.prefs.languages.primary != 'undefined'
    ) {
      if (indexURLs[user.prefs.languages.primary]) {
        //если есть локализованная версия, то возвращает indexURLs[user.prefs.languages.primary];
        return indexURLs[user.prefs.languages.primary];
      } else {
        return indexURLs['en'];
      }
    }
  };

  //вызов
  const result = showIndexPage(getUrlForUser(joeUser));

  console.log({ result });
}
{
  const getIndexUrlForUser = (languages, lan) => new Maybe(languages[lan]);
  const partialIndexUrls = R.partial(getIndexUrlForUser, [indexURLs]);

  const getUrlForUserFp = (user) => {
    return Maybe(user)
      .map(R.path(['prefs', 'languages', 'primary']))
      .chain(partialIndexUrls);
  };

  const boot = (user, defaultURL) => {
    return showIndexPage(getUrlForUserFp(user).getOrElse(defaultURL));
  };

  console.log({ boot: boot({ joeUser }, 'hello world') });
}

const partial = R.partial((x, v) => x + v, [1]);
console.log({ partial: partial(10) });

const maybe = new Maybe(1).chain((x) => x + 1);
console.log({ maybe });
