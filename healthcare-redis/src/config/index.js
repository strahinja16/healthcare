require('dotenv').config();

const {
  NODE_ENV,
  REDIS_HOST,
  API_URL,
} = process.env;

module.exports = {
  nodeEnv: NODE_ENV,
  apiUrl: API_URL,
  redis: {
    host: REDIS_HOST,
  },
};
