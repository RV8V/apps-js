const clone = (x) => JSON.parse(JSON.stringify(x));

const user = {};
const discount = 0.2;

{
  //Добавим скидку в объект user, если существует и пользователь, и скидка.
  //Null-ошибки кидаются в том случае, если пользователь или скидка является null.
  const applyDiscount = (user, discount) => {
    let userClone = clone(user); // С помощью какой-нибудь библиотеки сделаем копию
    userClone.discount = discount.code;
    return userClone;
  };

  /**
   * @Example of Error
   */

  try {
    const appliedDiscount = applyDiscount(null, discount);
    console.log({ appliedDiscount });
  } catch (err) {
    console.log({ err: err.message });
  }
}

const Maybe = require('ramda-fantasy').Maybe;
const { curry } = require('ramda');

// {
//   const maybeUser = Maybe(user);
//   const maybeDiscount = Maybe(discount);

//   // перепишем функцию и каррируем её, чтобы
//   // передавать по одному параметру за раз
//   const applyDiscount = curry((user, discount) => {
//     user.discount = discount.code;
//     return user;
//   });

//   // передадим через map первый аргумент (maybeUser) в applyDiscount
//   const maybeApplyDiscountFunc = maybeUser.map(applyDiscount);

//   /**
//    * @ 1) функцией, обёрнутой в Maybe, — если пользователь существует;
//    * @ 2) Nothing (подклассом Maybe) — если пользователь не существует.
//    */

//   /**
//    * @Error
//    * @maybeDiscount.map(maybeApplyDiscountFunc); // ПРОБЛЕМА!
//    */

//   const disc = maybeApplyDiscountFunc.ap(maybeDiscount);

//   //Поскольку applyDiscount хранится внутри this.val в обёртке maybeApplyDiscountFunc:
//   const count = maybeDiscount.map(applyDiscount);

//   console.log({ disc, count });
// }

{
  /**
   * @Assign value to null objects
   * @Use Applicative Functor
   */

  const clone = (value) => JSON.parse(JSON.stringify(value));

  /** @Imperative Style */
  /** @Error if userClone is null, or discount is null */

  const applyDiscount = (user, discount) => {
    const userClone = clone(user);
    userClone.discount = discount.code;
    return userClone;
  };

  /** @Declarative Style */

  const Maybe = require('ramda-fantasy').Maybe;
  const R = require('ramda');

  const user = { name: '1n' };
  const discount = { code: '1c' };

  const maybeUser = Maybe(user);
  const maybeDiscount = Maybe(discount);

  const applyDiscountCurry = R.curry((user, discount) => {
    user.discount = discount.code;
    return user;
  });

  const maybeApplyDiscountFunction = maybeUser.map(applyDiscountCurry);

  /** @Map does not know how to work with function wrapped into Maybe */
  /** @maybeDiscount.map(maybeApplyDiscountFunction) */

  /** @Parameter inside .ap method should contains value which is a not function */

  const applyedApMethodResult = maybeApplyDiscountFunction.ap(maybeDiscount);

  console.log({
    maybeApplyDiscountFunction,
    applyedApMethodResult,
  });

  /********************************************/
}

{
  const R = require('ramda');

  const user = { username: '1n' };
  const country = { name: '1c' };

  const maybeUser = new Maybe(user);
  const maybeCountry = new Maybe(country);

  const setUserCountryCurry = R.curry((user, country) => {
    const userClone = clone(user);
    user.country = country.name;
    return user;
  });

  const threeParams = R.curry((user, country, car) => {
    return { user, country, car };
  });

  const maybeSetUserCountryFunctorWithFunction =
    maybeUser.map(setUserCountryCurry);

  const appliedSetResultFunctor =
    maybeSetUserCountryFunctorWithFunction.ap(maybeCountry);

  const car = { its: 'name' };

  console.dir(
    {
      maybeSetUserCountryFunctorWithFunction,
      appliedSetResultFunctor,
      same: maybeUser.map(setUserCountryCurry).ap(maybeCountry),
      threeParams: {
        userCountryCar: Maybe.of(user)
          .map(threeParams)
          .ap(Maybe.of(country))
          .ap(Maybe.of(car)),
      },
    },
    {
      depth: 4,
    }
  );
}
