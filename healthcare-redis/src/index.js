const initBroker = require('services/broker');
require('services/cron')();

module.exports = () => {
  const broker = initBroker();
  broker.start();
};
