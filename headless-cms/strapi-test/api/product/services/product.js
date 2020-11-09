'use strict';

const process = require('process')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  find(params, populate) {
    process.stdout.write('service gets called\n')
    return strapi.query('product').find(params, populate)
  }
};
