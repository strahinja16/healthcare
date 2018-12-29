const redis = require('./');
const { getSideEffectsByDrugName } = require('api/drug');

function setExpirationForKey(key) {
    redis.expire(key, 60 * 60);
}

class DrugService {
    generateKey(key) {
        return `drugs:${key}:side-effects`;
    }

    async setSideEffectsForDrug(key, drugs) {
        const k = this.generateKey(key);
        await redis.sadd(k, drugs);
        setExpirationForKey(k);
    }

    async getSideEffectsForDrug(key) {
        const k = this.generateKey(key);
        setExpirationForKey(k);
        return await redis.smembers(k);
    }

    async refreshAllDrugSideEffects() {
        const keys = await redis.keys(this.generateKey('*'));
        keys.forEach(async (key) => {
            const ss = key.split(':');
            const drugName = ss[1];

            const { data } = await getSideEffectsByDrugName(drugName);

            this.setSideEffectsForDrug(drugName, data);
        });
    }
}

const drugService = new DrugService();
module.exports = drugService; //Singleton
