const redisFacade = require('./');
const {
    getDiseaseByName,
    getDrugsForDisease,
} = require('api/disease');

class DiseaseService {
    constructor() {
        this.keyDuration = 60;
    }

    generateKeyForDisease(key) {
        return `diseases:${key}:name`;
    }

    generateKeyForDrugs(key) {
        return `diseases:${key}:drugs`;
    }

    async setDisease(key, disease) {
        const k = this.generateKeyForDisease(key);

        await redisFacade.setHashValue(k, disease, this.keyDuration);
    }

    async getDisease(key) {
        const k = this.generateKeyForDisease(key);

        return await redisFacade.getHashValue(k, this.keyDuration);
    }

    async setDrugsForDisease(key, drugs) {
        const k = this.generateKeyForDrugs(key);

        await redisFacade.addMembersToSet(k, drugs, this.keyDuration);
    }

    async getDrugsForDisease(key) {
        const k = this.generateKeyForDrugs(key);

        return await redisFacade.getAllSetMembers(k, this.keyDuration);
    }

    async refreshAllDiseasesData() {
        const names = await redisFacade.getAllKeysByKey(this.generateKeyForDisease('*'));
        names.forEach(async (name) => {
            const { data } = await getDiseaseByName(name);

            this.setDisease(name, data);
        });
    }

    async refreshAllDiseaseDrugs() {
        const names = await redisFacade.getAllKeysByKey(this.generateKeyForDrugs('*'));
        names.forEach(async (name) => {
            const { data } = await getDrugsForDisease(name);

            this.setDrugsForDisease(name, data);
        });
    }
}

const diseaseService = new DiseaseService();
module.exports = diseaseService; //Singleton
