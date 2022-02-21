const fs = require('fs');

const {
  daticaDbServer,
  daticaDbPort,
  daticaDbSelect,
  daticaDbUsername,
  daticaDbPassword,
  daticaMigrationDir,
  daticaSeedsDir,
  dbClient
} = require('../../config/cfg');

console.log({
  daticaDbServer,
  daticaDbPort,
  daticaDbSelect,
  daticaDbUsername,
  daticaDbPassword,
})

const getConfig = () => {
  return {
    local: {
      client: dbClient,
      connection: {
        port: daticaDbPort,
        host: daticaDbServer,
        database: daticaDbSelect,
        user: daticaDbUsername,
        password: daticaDbPassword,
        // ssl: {
        //   ca: fs.readFileSync(__dirname + '/../../certs/us-east-2-bundle.pem')
        // }
      },
      migrations: {
        directory: daticaMigrationDir
      },
      seeds: {
        directory: daticaSeedsDir
      },
      debug: true
    },

    production: {
      client: dbClient,
      connection: {
        host: daticaDbServer,
        port: daticaDbPort,
        database: daticaDbSelect,
        user: daticaDbUsername,
        password: daticaDbPassword,
        ssl: {
          //src/storages/us-east-2-bundle.pem
          ca: fs.readFileSync(__dirname + '/../../certs/us-east-2-bundle.pem')
        }
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: daticaMigrationDir
      },
      debug: true
    }
  };
};

module.exports = getConfig;
