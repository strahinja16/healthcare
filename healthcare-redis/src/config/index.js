require('dotenv').config();

const {
  REDIS_HOST,
} = process.env;

module.exports = {
  redis: {
    host: REDIS_HOST,
  },
};
