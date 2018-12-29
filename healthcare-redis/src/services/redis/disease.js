const redis = require('./');

class DiseaseService {
    generateKeyForDisease(key) {
        return `diseases:${key}:object`;
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
}

const diseaseService = new DiseaseService();
module.exports = diseaseService; //Singleton
