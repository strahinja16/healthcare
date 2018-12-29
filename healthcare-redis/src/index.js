const initBroker = require('services/broker');
require('services/cron')();
const redis = require('services/redis');

module.exports = () => {
  const broker = initBroker();
  broker.start();

  // redis.hmset('probaexp', { name: 1, desc: 'asd' });
  // redis.expire('probaexp', 100);
    redis.expire('probaexp', 100);
};
