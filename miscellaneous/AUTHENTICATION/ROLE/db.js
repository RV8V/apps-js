const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true
};

const url = `mongodb://${MONGO_HOSTNAME}/${MONGO_DB}`

const connect = async () => {
  await mongoose.connect(url, options).catch(err => {
    console.log(err)
  })
  console.log('MongoDB is connected');
}

module.exports = connect
