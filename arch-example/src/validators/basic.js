const validate = require('validate.js')

validate.validators.array = function(value, options) {
  if (!value) {
    return
  }

  if (!Array.isArray(value)) {
    return 'is not an array'
  }

  if (options.type) {
    if (!values.every(element => {
      return typeof element === options.type
    })) {
      return 'is not an array of ' + options.type
    }
  }
}

module.exports = {
  offset: {
    numbers: {
      onlyIntegers: true,
      greaterOrEqual: false
    }
  },
  limit: {
    numbers: {
      onlyIntegers: true,
      greaterOrEqual: false
    }
  }
}
