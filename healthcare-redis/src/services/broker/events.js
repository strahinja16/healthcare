const logger = require('services/logger');

module.exports = {
  'redis.event': async (data, sender) => {
    try {

    } catch (ex) {
      logger.error(ex);
    }
  },
};
