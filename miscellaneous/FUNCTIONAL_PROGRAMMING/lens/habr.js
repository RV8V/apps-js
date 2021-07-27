/*
 * зачем же нужны линзы.
 *
 * В функциональном программировании широко используются неизменяемые структуры данных.
 * Работа с ними значительно отличается по сравнению с изменяемыми данными.
 *
 * В основе этого лежит тот факт, что при изменении какой-либо части неизменяемой структуры данных создается ее копия, отличающаяся от оригинала этой самой измененной частью.
 * Полное копирование всей исходной структуры не эффективно, поэтому новая структура как правило использует ссылки на неизмененные части из оригинала.
 */

const user = {
  name: 'Имя пользователя',
 	address: {
 		city: 'Город',
 		street: 'Улица',
 		house: 'Дом'
 	}
};

const setUserName = (name, user) => ({ ...user, name })

console.log({
  user,
  user1: setUserName('1n', user),
  user2: user
})

function get(prop) {
  return function(item) {
    return item[prop]
  }
}

function setMutable(prop) {
  return function(val, item) {
    item[prop] = val
    return item
  }
}

function properties(item) {
  const keys = []
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  return keys
}

function setImmutable(prop) {
  return function(val, item) {
    const keys = properties(item)
    return {
      ...keys.reduce((acc, key) => {
        acc[key] = item[key]
        return acc
      }, {}),
      [prop]: val
    }
  }
}

function compose(f1, f2) {
  return function() {
    return f1(f2.apply(null, arguments))
  }
}

const getCity = get('city')
const getAddress = get('address')

const getCityAddress = compose(getCity, getAddress)

console.log({
  properties: properties({ 1: '1n', [Symbol(1)]: 's1', hl: '1' }),
  setImmutable: setImmutable('name')('2x', user),
  address: getAddress(user),
  city: getCity(getAddress(user)),
  // getCityAddress: getCityAddress(
  //   getCity(getAddress(user))
  // )
})

function Lens(getter, setter) {
  return {
    compose: function(lens) {
      return Lens(get2, set2)

      function get2(item) {
        return lens.get(getter(item))
      }

      function set2(value, item) {
        const innerValue = lens.set(value, getter(item))
        return setter(innerValue, item)
      }
    },
    get: getter,
    set: setter
  }
}

var setAddress = setImmutable('address'),
    setCity = setImmutable('city');

var addressLens = Lens(getAddress, setAddress),      //строим линзу для адреса
    cityLens = Lens(getCity, setCity),               //строим линзу для города
    addressCityLens = addressLens.compose(cityLens); //компонуем две линзы вместе

var result = addressCityLens.set('новый city', user);

console.log({
  lens: Lens(
    () => {},
    () => {}
  ),
  user,
  result
})
