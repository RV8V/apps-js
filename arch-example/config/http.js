const process = require('process')

module.exports = {
  production: {
    port: process.env.PORT || 3030,
    authUrl: 'https://auth.testing.product.com',
    authInnnerUrl: 'https://' + (process.env.DEV ? 'dev-' : '') + 'hello.com',
    frontUrl: 'https://' + (process.env.DEV ? 'dev-' : '') + 'application.hello.com',
    timeout: 100000
  },
  development: {
    port: process.env.PORT || 3030,
    authUrl: 'https://localhost:3000',
    authInnnerUrl: 'https://' + (process.env.DEV ? 'dev-' : '') + 'hello.com',
    frontUrl: 'https://' + (process.env.DEV ? 'dev-' : '') + 'application.hello.com',
    timeout: 100000
  },
  testing: {
    port: process.env.PORT || 3030,
    authUrl: 'https://localhost:3000',
    authInnnerUrl: 'https://' + (process.env.DEV ? 'dev-' : '') + 'hello.com',
    frontUrl: 'https://' + (process.env.DEV ? 'dev-' : '') + 'application.hello.com',
    timeout: 100000
  }
}
