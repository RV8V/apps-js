'use strict'

const validate = data => {
  return Object.entries(data).reduce((acc, [currency, info]) => {
    if (Object.keys(acc).indexOf(currency) != -1) {
      acc[currency] = info
    } else {
      acc[currency] = [acc[currency], info]
    }
    return acc
  }, {})
}

const data = {
  "THB": {
    "amount": 100,
    "percent": 2,
    "maxAmount": 1000,
    "minAmount": 50
  },
}

const res = validate(data)
console.log({ res })
