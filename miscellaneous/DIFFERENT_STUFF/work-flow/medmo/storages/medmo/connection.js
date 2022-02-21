const fs = require('fs');
const { Model } = require('objection');
const knex = require('knex');

const {
  dbServer,
  dbPort,
  dbSelect,
  dbUsername,
  dbPassword,
  dbClient,
  migrationDir,
  seedsDir,
  knexDebug
} = require('../../config/cfg');

const config = {
  client: dbClient,
  connection: {
    port: dbPort,
    host: dbServer,
    database: dbSelect,
    user: dbUsername,
    password: dbPassword,
    // ssl: {
    //   ca: fs.readFileSync(__dirname + '/../../certs/us-east-2-bundle.pem')
    // }
  },
  migrations: {
    directory: migrationDir
  },
  seeds: {
    directory: seedsDir
  },
  debug: knexDebug
};

const connect = async () => {
  console.log('medmo - config');
  console.log(config);
  Model.knex(knex(config));
  return knex;
};

module.exports = { connect };
