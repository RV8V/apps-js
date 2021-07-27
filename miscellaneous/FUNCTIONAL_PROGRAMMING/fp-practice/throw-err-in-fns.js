/**
 * @Handling if-else condition. Either
 * @: Working with functions throwing an error and exiting at once after error appearance(fast-failure)
 */

/** @Imperative Style */

const isNumber = x => Object.prototype.toString.call(x) === '[object Number]';

const tax = (tax, price) => {
  if (!isNumber(price)) return new Error('price must be number')
  return price + (tax * price)
}

const discount = (dis, price) => {
  if (!isNumber(price)) return new Error('price must be number')
  if (price < 10) return new Error('discount can not be applyed to price below 10')
  return price - (price * dis)
}

const isError = err => err && err.name === 'Error'
const getItemPrice = item => item.price

const showTotalPrice = (item, taxPercentage, dis) => {
  const price = getItemPrice(item)
  const result = tax(taxPercentage, price)
  if (isError(result)) {
    return console.log(`Error: ${result.message}`)
  }
  const resultWithDiscount = discount(dis, result)
  if (isError(resultWithDiscount)) {
    return console.log(`Error: ${resultWithDiscount.message}`)
  }
  return console.log(`Total price: ${resultWithDiscount}`)
}

const tShirt = { name: 't-shirt', price: 11 }
const pant = { name: 'pant', price: '10 dollars' }
const chips = { name: 'chips', price: 5 };

[tShirt, pant, chips].forEach(item => showTotalPrice(item, 0.1, 0.25))

/** @Declarative Style */

const Either = require('ramda-fantasy').Either
const Right = Either.Right
const Left = Either.Left

const R = require('ramda')

const taxDeclarative = R.curry((tax, price) => {
  if (!isNumber(price)) return Left(new Error('price must be a number'))
  return Right(price + (price * tax))
})

const discountDeclarative = R.curry((discount, price) => {
  if (!isNumber(price)) return Left(new Error('price must be a number'))
  if (price < 10) return Left(new Error('discount can not be applyed to price below 10'))
  return Right(price - (discount * price))
})

const getItemPriceDeclarative = item => Right(item.price)

const addCaliTax = taxDeclarative(0.1)
const apply25PercDisc = discountDeclarative(0.25)

const displayTotalDeclarative = total => console.log(`Total price: ${total}`)
const logError = err => console.log(`Error: ${err.message}`)

const eitherLogOrShow = Either.either(logError, displayTotalDeclarative)

const showTotalPriceDeclarative = item => eitherLogOrShow(
  getItemPriceDeclarative(item)
    .chain(apply25PercDisc)
    .chain(addCaliTax)
)

const tShirtDec = { name: 't-shirt', price: 11 }
const pantDec = { name: 'pant', price: '10 dollars' }
const chipsDec = { name: 'chips', price: 5 };

[tShirtDec, pantDec, chipsDec].forEach(item => showTotalPriceDeclarative(item, 0.1, 0.25))

/********************************************/

console.log({
  getItemPriceDeclarative: getItemPriceDeclarative({ price: 11 }),
  result: tax(0.1, discount(0.25, getItemPrice({ price: 11 }))),
  total: showTotalPrice({ price: 11 }, 0.1, 0.2)
})

/********************************************/

console.log({
  a: Object.prototype.toString(1),
  isNumberNumber: isNumber('10')
})
