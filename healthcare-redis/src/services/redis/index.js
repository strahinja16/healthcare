const Redis = require('ioredis');
const { redis: { host } } = require('config');

const redis = new Redis(host);

module.exports = redis;
