const redis = require('./');
const {
    getDiseaseByName,
    getDrugsForDisease,
} = require('api/disease');

function setExpirationForKey(key) {
    redis.expire(key, 60 * 60);
}

class DiseaseService {
    generateKeyForDisease(key) {
        return `diseases:${key}:name`;
    }

    generateKeyForDrugs(key) {
        return `diseases:${key}:drugs`;
    }

    async setDisease(key, disease) {
        const k = this.generateKeyForDisease(key);
        await redis.hmset(k, disease);
        setExpirationForKey(k);
    }

    async getDisease(key) {
        const k = this.generateKeyForDisease(key);
        setExpirationForKey(k);
        return await redis.hgetall(k);
    }

    async setDrugsForDisease(key, drugs) {
        const k = this.generateKeyForDrugs(key);
        await redis.sadd(k, drugs);
        setExpirationForKey(k);
    }

    async getDrugsForDisease(key) {
        const k = this.generateKeyForDrugs(key);
        setExpirationForKey(k);
        return await redis.smembers(k);
    }

    async refreshAllDiseasesData() {
        const keys = await redis.keys(this.generateKeyForDisease('*'));
        keys.forEach(async (key) => {
            const ss = key.split(':');
            const name = ss[1];

            const { data } = await getDiseaseByName(name);

            this.setDisease(name, data.disease);
        });
    }

    async refreshAllDiseaseDrugs() {
        const keys = await redis.keys(this.generateKeyForDrugs('*'));
        keys.forEach(async (key) => {
            const ss = key.split(':');
            const name = ss[1];

            const { data } = await getDrugsForDisease(name);

            this.setDrugsForDisease(name, data);
        });
    }
}

const diseaseService = new DiseaseService();
module.exports = diseaseService; //Singleton
