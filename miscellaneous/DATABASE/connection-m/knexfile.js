const getConfig = () => {
    require('dotenv').config();

    return {
        development: {
            client: 'mysql2',
            connection: {
              port: process.env.DB_PORT || 3306,
              host: process.env.DB_SERVER || 'localhost',
              database: process.env.DB_SELECT || 'medmo',
              user: process.env.DB_USERNAME || 'medmo',
              password: process.env.DB_PASSWORD || 'medmo',
            },
            migrations: {
                directory: './db/knex-migrations',
            },
            seeds: {
                directory: './db/knex-seeds',
            },
            debug: true,
        },

        production: {
            client: 'mysql2',
            connection: {
                host: process.env.DB_SERVER,
                database: process.env.DB_SELECT,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
            },
            pool: {
                min: 2,
                max: 10,
            },
            migrations: {
                directory: './db/knex-migrations',
            },
            debug: true,
        },
    };
};

module.exports = getConfig;
