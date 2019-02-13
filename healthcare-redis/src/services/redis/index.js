const Redis = require('ioredis');
const { redis: { host } } = require('config');

class RedisFacade {
    constructor() {
        this.redisClient = new Redis(host);
    }

    /**
     * Sets expiration time in minutes for the sent key
     * @param key
     * @param minutes
     */
    setExpirationForKey(key, minutes) {
        this.redisClient.expire(key, minutes * 60);
    }

    /**
     * Adds one or more members to a set and sets expiration time
     * @param key
     * @param values
     * @param duration
     * @returns {Promise<void>}
     */
    async addMembersToSet(key, values, duration) {
        await this.redisClient.sadd(key, values);
        this.setExpirationForKey(key, duration);
    }

    /**
     * Get all set members and refresh the expiration time
     * @param key
     * @param duration
     * @returns {Promise<[]>}
     */
    async getAllSetMembers(key, duration = -1) {
        this.setExpirationForKey(key, duration);
        return await this.redisClient.smembers(key);
    }

    /**
     * Sets object to a hash set and sets expiration time
     * @param key
     * @param object
     * @param duration
     * @returns {Promise<void>}
     */
    async setHashValue(key, object, duration = -1) {
        await this.redisClient.hmset(key, object);
        this.setExpirationForKey(key, duration);
    }

    /**
     *
     * @param key
     * @param duration
     * @returns {Promise<object>}
     */
    async getHashValue(key, duration = -1) {
        this.setExpirationForKey(key, duration);
        return await this.redisClient.hgetall(key);
    }

    /**
     * Gets all key names
     * @param key
     * @returns {Promise<[]>}
     */
    async getAllKeysByKey(key) {
        const keys = await redis.keys(key);

        return keys.map(key => key.split(':')[1]);
    }
}

const redisFacade = new RedisFacade();
module.exports = redisFacade;
