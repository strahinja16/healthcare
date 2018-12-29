const redis = require('./');

class DrugService {
    generateKey(key) {
        return `drugs:${key}:side-effects`;
    }

    async setSideEffectsForDrug(key, drugs) {
        return await redis.sadd(this.generateKey(key), drugs);
    }

    async getSideEffectsForDrug(key) {
        return await redis.smembers(this.generateKey(key));
    }
}

const drugService = new DrugService();
module.exports = drugService; //Singleton
