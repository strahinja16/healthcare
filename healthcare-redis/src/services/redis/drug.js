const redisFacade = require('./');
const { getSideEffectsByDrugName } = require('api/drug');

class DrugService {
    constructor() {
        this.keyDuration = 60;
    }

    generateKey(key) {
        return `drugs:${key}:side-effects`;
    }

    async setSideEffectsForDrug(key, drugs) {
        const k = this.generateKey(key);

        await redisFacade.addMembersToSet(k, drugs, this.keyDuration);
    }

    async getSideEffectsForDrug(key) {
        const k = this.generateKey(key);

        return await redisFacade.getAllSetMembers(k, this.keyDuration);
    }

    async refreshAllDrugSideEffects() {
        const drugNames = await redisFacade.getAllKeysByKey(this.generateKey('*'));
        drugNames.forEach(async (drugName) => {
            const { data } = await getSideEffectsByDrugName(drugName);

            this.setSideEffectsForDrug(drugName, data);
        });
    }
}

const drugService = new DrugService();
module.exports = drugService; //Singleton
