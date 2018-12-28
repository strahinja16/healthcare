const { ServiceBroker } = require('moleculer');
const { redis } = require('config');
const events = require('./events');
const actions = require('./actions');

const initBroker = () => {
  const broker = new ServiceBroker({
    nodeID: 'redis-micro-1',
    logger: process.env.NODE_ENV === 'development',
    logLevel: 'info',
    transporter: {
      type: 'Redis',
      options: {
        host: redis.host,
      },
    },
  });

  broker.createService({
    name: 'medicine',
    events,
    actions,
  });

  return broker;
};

module.exports = initBroker;
