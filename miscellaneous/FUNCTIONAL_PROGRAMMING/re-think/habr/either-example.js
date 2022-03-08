//Императивное решение
//Возвращает либо ошибку, либо цену с учётом налога

const isNumber = (x) => typeof x === 'number';

{
  const tax = (tax, price) => {
    if (!isNumber(price)) return new Error('Price must be numeric');

    return price + tax * price;
  };

  // Возвращает либо ошибку, либо цену с учётом скидки
  const discount = (dis, price) => {
    if (!isNumber(price)) return new Error('Price must be numeric');

    if (price < 10)
      return new Error('discount cant be applied for items priced below 10');

    return price - price * dis;
  };

  const isError = (e) => e && e.name == 'Error';

  const getItemPrice = (item) => item.price;

  //Показывает общую цену с учётом налога и скидки. Должен обрабатывать ошибки.
  const showTotalPrice = (item, taxPerc, dis) => {
    let price = getItemPrice(item);
    let result = tax(taxPerc, price);
    if (isError(result)) {
      return console.log('Error: ' + result.message);
    }

    result = discount(dis, result);
    if (isError(result)) {
      return console.log('Error: ' + result.message);
    }
    //показывает результат
    console.log('Total Price: ' + result);
  };

  let tShirt = { name: 't-shirt', price: 11 };
  let pant = { name: 't-shirt', price: '10 dollars' };
  let chips = { name: 't-shirt', price: 5 }; //less than 10 dollars error

  //   showTotalPrice(tShirt, 0.1, 0.01); // Сумма: 9,075
  //   showTotalPrice(pant, 0.2, 0.01); // Ошибка: цена должна быть числом
  //   showTotalPrice(chips, 0.4, 0.01); // Ошибка: скидка не применяется к цене ниже 10
}

const Either = require('ramda-fantasy').Either;
const Maybe = require('ramda-fantasy').Maybe;
const R = require('ramda');
const Left = Either.Left;
const Right = Either.Right;

{
  const tax = R.curry((tax, price) => {
    if (!isNumber(price)) return Left(new Error('Price must be numeric'));
    return Right(price + tax * price);
  });

  const discount = R.curry((dis, price) => {
    if (!isNumber(price)) return Left(new Error('Price must be numeric'));
    if (price < 10)
      return Left(
        new Error('discount cant be applied for items priced below 10')
      );
    return Right(price - price * dis);
  });

  const addCaliTax = tax(0.1); //налог 10 %

  const apply25PercDisc = discount(0.25); // скидка 25 %

  const getItemPrice = (item) => Right(item.price);

  const displayTotal = (total) => {
    console.log('Total Price: ' + total);
  };

  const logError = (error) => {
    console.log('Error: ' + error.message);
  };

  const eitherLogOrShow = Either.either(logError, displayTotal);

  //api
  const showTotalPrice = (item) =>
    eitherLogOrShow(
      getItemPrice(item).chain(apply25PercDisc).chain(addCaliTax)
    );

  let tShirt = { name: 't-shirt', price: 11 };
  let pant = { name: 't-shirt', price: '10 dollars' }; //error
  let chips = { name: 't-shirt', price: 5 }; //less than 10 dollars error

  //   showTotalPrice(tShirt); // Сумма: 9,075
  //   showTotalPrice(pant); // Ошибка: цена должна быть числом
  //   showTotalPrice(chips); // Ошибка: скидка не применяется к цене ниже 10
}

{
  const onSuccess = (v) => `success value: ${v}`;
  const onError = (msg) => `error message: ${msg}`;

  const add = R.curry((x, toAdd) => {
    if (!isNumber(x)) return Either.Left(new Error(`x is not number: ${x}`));
    if (!isNumber(toAdd))
      return Either.Left(new Error(`toAdd is not number: ${toAdd}`));

    console.log({ x, toAdd, isX: !isNumber(x), isY: !isNumber(toAdd) });
    return Either.Right(x + toAdd);
  });

  const addOne = add(1);

  const eitherErrOrSuccess = Either.either(onError, onSuccess);

  const chain = (x) => Either.Right(x).chain(addOne).chain(addOne);
  const runEitherChain = (x) => eitherErrOrSuccess(chain(x));
  //   console.log({ eitherChain: runEitherChain(10) });

  const map = (x) => Either.Right(x).map(addOne).map(addOne);
  const runEitherMap = (x) => eitherErrOrSuccess(map(x));
  //   console.log({ eitherMap: runEitherMap(10) });

  console.log({
    // eitherError: runEitherMap(Maybe.of(new Error(`hello world from maybe`))),
    // eitherError: runEitherMap(new Error(`hello world from error`)),
    // eitherError: runEitherMap(
    //   Either.Left(new Error(`hello world from either left`))
    // ),
  });
}

{
  const either = Either.either(
    (e) => `error: ${e}`,
    (v) => `success: ${v}`
  );

  const ten = Either.Right(10);
  const maybe = Maybe.of(10);
  const maybeTen = Maybe.of(ten);

  /**
   * @Erorr
   * @Input of Either.either - last param should be Either.Left of Either.Right only
   * @const response = [ten, maybe, maybeTen].map((x) => either(x));
   */

  const result = either(maybe);

  console.log({ result });
}
