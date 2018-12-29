const redis = require('./');
const {
    getDiseaseByName,
    getDrugsForDisease,
} = require('api/disease');

class DiseaseService {
    generateKeyForDisease(key) {
        return `diseases:${key}:name`;
    }

    generateKeyForDrugs(key) {
        return `diseases:${key}:drugs`;
    }

    async setDisease(key, disease) {
        return await redis.hmset(this.generateKeyForDisease(key), disease);
    }

    async getDisease(key) {
        return await redis.hgetall(this.generateKeyForDisease(key));
    }

    async setDrugsForDisease(key, drugs) {
        return await redis.sadd(this.generateKeyForDrugs(key), drugs);
    }

    async getDrugsForDisease(key) {
        return await redis.smembers(this.generateKeyForDrugs(key));
    }

    async getProba() {
        return redis.keys('diseases:*:name');
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
