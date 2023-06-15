require('dotenv').config();

const {
  baseMongoUrl = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  baseMongoUrl,
  JWT_SECRET,
  NODE_ENV,
};
