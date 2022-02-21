const { environment } = require('../../config/cfg');
const config = require('./knexfile')()[environment];
const knex = require('knex')(config);

const connect = async () => {
  knex.raw(`select 'connection to datica.' as status`).then(() => {
    console.info('Datica connect.');
  });
  return knex;
};

module.exports = {
  connect,
  knex
};
