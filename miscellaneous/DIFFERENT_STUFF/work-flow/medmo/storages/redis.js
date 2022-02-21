const redis = require('redis');

const {
  redisHost,
  redisPort,
  redisDb,
  redisUser,
  redisPassword,
} = require('../config/cfg');

const config = {
  port: redisPort,
  host: redisHost,
  database: redisDb,
  user: redisUser,
  password: redisPassword,
};

const connect = () => {
  return redis.createClient(config);
};

module.exports = connect;
