const dotenv = require('dotenv')

class ConfigService {
  constructor() {
    this.environment = process.env.NODE_ENV

    const { error } = dotenv.config({ path: `.env.${this.environment}` })
    if (error) throw error
  }

  checkMode(mode) {
    return this.environment === mode
  }

  get(key) {
    const variable = process.env[key]
    if (!variable) throw new Error(`The ${key} can not be undefined`)
    return variable
  }
}

const configService = new ConfigService()
const version = configService.get('NODE_VERSION')

console.log({ configService, version });

/*****************************************************/

const errorConstructor = message => new Error(message);

const _configService = () => (() => {
  const config = dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

  return config.error || {
    checkMode: mode => mode === process.env.NODE_ENV,
    getValue: key => process.env[key]
  }
})()

const _cService = _configService()
const _version = _cService.getValue('NODE_VERSION')

console.log({ _cService, _version })
