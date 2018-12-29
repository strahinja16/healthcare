const redis = require('./');
const { getSideEffectsByDrugName } = require('api/drug');

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
