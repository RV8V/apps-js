/**
 * @Assign value to null objects
 * @Use Applicative Functor
 */

const clone = value => JSON.parse(JSON.stringify(value))

/** @Imperative Style */
/** @Error if userClone is null, or discount is null */

const applyDiscount = (user, discount) => {
  const userClone = clone(user)
  userClone.discount = discount.code
  return userClone
}

/** @Declarative Style */

const Maybe = require('ramda-fantasy').Maybe
const R = require('ramda')

const user = { name: '1n' }
const discount = { code: '1c' }

const maybeUser = Maybe(user)
const maybeDiscount = Maybe(discount)

const applyDiscountCurry = R.curry((user, discount) => {
  user.discount = discount.code
  return user
})

const maybeApplyDiscountFunction = maybeUser.map(applyDiscountCurry)

/** @Map does not know how to work with function wrapped into Maybe */
/** @maybeDiscount.map(maybeApplyDiscountFunction) */

/** @Parameter inside .ap method should contains value which is a not function */

const applyedApMethodResult = maybeApplyDiscountFunction.ap(maybeDiscount)

console.log({
  maybeApplyDiscountFunction,
  applyedApMethodResult
})

/********************************************/

const car = { name: '1n', building: 1 }

const buildings = [
  { buildingIndex: 1, buildingName: '1b' },
  { buildingIndex: 2, buildingName: '2b' },
  { buildingIndex: 3, buildingName: '3b' },
]

const maybeCar = Maybe(car)
const maybeBuildings = Maybe(buildings)

const findCarBuildingCurry = R.curry((car, buildings) => {
  return buildings.find(building => building.buildingIndex === car.building)
})

const maybeFindCarBuildingFunction = maybeCar.map(findCarBuildingCurry)
const foundCarBuilding = maybeFindCarBuildingFunction.ap(maybeBuildings)

console.log({
  maybeFindCarBuildingFunction,
  foundCarBuilding,
  theSame:
    maybeCar.map(findCarBuildingCurry)
      .ap(maybeBuildings)
})
