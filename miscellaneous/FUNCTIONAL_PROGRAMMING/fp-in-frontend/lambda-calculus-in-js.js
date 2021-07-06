'use strict'

const imperativeStyle = (a, b) => {
  if (a > b) {
    return a * 3
  }
  return a + b
}

const declarativeStyle = (a, b) => a > b && a * 3 || a + b

const imperativeResult = imperativeStyle(4, 2)
const declarativeResult = declarativeStyle(4, 2)
