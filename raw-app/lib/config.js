const environments = {}

environments.stagging = {
  'http_port': 3000,
  'https_port': 3001,
  'env_name': 'stagging'
}

environments.production = {
  'http_port': 5000,
  'https_port': 5001,
  'env_name': 'production'
}

const current_environment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'stagging'
const environment_to_export = typeof(environments[current_environment]) === 'object' ? environments[current_environment] : 'production'

module.exports = environment_to_export
