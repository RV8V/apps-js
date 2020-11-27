'use strict'
// @flow

type User = {
  name: string,
  age: number,
  wallet: {
    amount: number,
    currency: 'USA' | 'EUR' | 'UAN'
  }
}

type WalletField = 'wallet'
type Wallet = $PropertyType<User, /*WalletField*/'wallet'> // extract field 'wallet' in user --- don not work --> only string literal
type Currency = $PropertyType<$PropertyType<User, 'wallet'>, 'currency'>

//const r: Wallet = { amount: 100, currency: 'USA' }
const w: Currency = 'UAN'
/*
function getField<O: *, S: string>(o: O, field: S): $/*PropertyType*///ElementType<O, S> {
  //return o[field]
//}

function getField<O: { +[string]: mixed }, S: string>(o: O, field: S): $ElementType<O, S> {
  // '+' because we could write like that ---- o[field] = null;
  //                                           return o[field]
  return o[field]
}

const d: Wallet = { amount: 10, currency: 'USA' }
const p = getField(d, 'currency')

type Coords = [number, number, string]
type CoordType = $ElementType<Coords, 2>

const g: CoordType = '22' // 22 -- not

// next

const getConfig = (name: string | number) => {
  return {
    name,
    data: { total: 0, page: 0 }
  }
}

type ConfigType = $Call<typeof getConfig, string>
let t: ?ConfigType = { name: 'str', data: { total: 20, page: 40 } }

// next

class Foo_ {
  static wallet: { amount: 10, currency: 'usa' }
}

//type Wallet = $PropertyType<Foo, 'wallet'> // do not work
type Wallet_Class = $PropertyType<Class<Foo_>, 'wallet'>
//const l: Wallet_Class = { amount: 30, currency: 'eur' }
