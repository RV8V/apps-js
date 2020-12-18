'use strict'
// @flow

import { verify, make, type Payment, type VerifiedPayment } from './12_opaque'

const payment = { from: '1', to: '2', amount: 10, /*varified: true*/ }

//verify(payment).then(make)
//make(payment)

//make(payment) // because there we want to be type Payment --- but it expects type VarifiedPayment

verify(payment).then(p => {
  //const r = { ...p, varified: false } // 2.
  console.log(p.from)
})
