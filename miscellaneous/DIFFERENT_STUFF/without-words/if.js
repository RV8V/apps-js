'use strict'

{
  const age = 10

  const checkAge = function(age) {
    let value
    if (age > 8) {
      value = age * age
    } else {
      value = 0
    }
    return value
  }

  console.log({ plus: checkAge(age), minus: checkAge(age - 4) })
}

{
  const age = 10

  const checkAge = function(age) {
    return age > 8 && age * age || 0
  }

  console.log({ plus: checkAge(age), minus: checkAge(age - 4) })
}

{
  const checkAge = age => age > 8 && age * age || 0
  console.log({ plus: checkAge(10), minus: checkAge(10 - 4) })
}

{
  const checkAge = age => age > 8 ? age * age : 0
  console.log({ plus: checkAge(10), minus: checkAge(10 - 4) })
}

{
  const check = function(config) {
    if (config && config.database) {
      console.log('connection to database established')
    }

    if (config && config.network) {
      console.log('making request to server')
    }

    if (config) {
      if (config.docker) {
        console.log('docker')
      } else {
        console.log('config')
      }
    } else {
      console.log('error')
    }
    console.log('behaviour is not clear\n')
  }

  check({
    database: {},
    network: {},
    docker: {}
  })
}

{
  const check = function(config) {
    config && config.database ? console.log('connection to database established') : ''
    config && config.network ? console.log('making request to server') : ''

    config
      ? config.docker ? console.log('docker') : console.log('config')
      : console.log('error')

    console.log('behaviour is not clear\n')
  }

  check({
    database: {},
    network: {},
    docker: {}
  })
}

{
  const check = function(config) {
    config && config.database && console.log('connection to database established')
    config && config.network && console.log('making request to server')

    config
      && config.docker && (console.log('docker'), 1) || console.log('config')
      || console.log('error')

    console.log('behaviour is not clear')
  }

  check({
    database: {},
    network: {},
    docker: {}
  })
}

{
  /**
   * logic not correct because in case with && left side should be 'boolean true'
   */

  8 && console.log('one') || console.log('two')
  const r = 8 && console.log('r')
  const t = 8 && undefined
  console.log({ r, t })
}

{
  /**
   * + (..., 1) as true for &&
   */

  8 && (console.log('one'), 1) || console.log('two')
  const r = 8 && console.log('r')
  const t = 8 && undefined
  console.log({ r, t })
  console.log('\n')
}

{
  8 ? console.log('one') : console.log('two')
  8 && (console.log('one'), 1) || console.log('two')
  if (8) console.log('one'); else console.log('two')

  console.log(8 ? 'one' : 'two')
  console.log(8 && 'one' || 'two')

  const r = JSON.stringify({ if: { 'one': 'two' }, value: 8 })
  const p = JSON.parse(r)
  console.log(p.value ? Object.keys(p.if).pop() : p.if.one)
}
