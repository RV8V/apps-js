const VERIFIED_AMOUNT = 1000
const CREDIT_HISTORY_CONFIRMED = true
const BALANCE_EXISTANCE = true
const USER_NAME = 'username'

class Bank {
  verify(amount) {
    return amount < VERIFIED_AMOUNT
  }
}

class CreditHistory {
  check(name) {
    return CREDIT_HISTORY_CONFIRMED
  }
}

class Balance {
  check(name) {
    return BALANCE_EXISTANCE
  }
}

class CreditFacade {
  constructor(name) {
    Object.assign(this, { name })
  }

  apply(amount) {
    const bank = new Bank()
    const creditHistory = new CreditHistory()
    const balance = new Balance()
    const approved = bank.verify(amount)
    const historyApproved = creditHistory.check(this.name)
    const balanceCheck = balance.check(this.name)
    return approved && historyApproved && balanceCheck
  }
}

const credit = new CreditFacade(USER_NAME)

console.log({ apply: credit.apply(VERIFIED_AMOUNT / VERIFIED_AMOUNT) })
