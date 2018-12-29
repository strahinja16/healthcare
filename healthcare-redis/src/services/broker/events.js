const logger = require('services/logger');
const axios = require('api');
const drugService = require('services/redis/drug');
const { getSideEffectsByDrugName } = require('api/drug');

module.exports = {
  'drug.prescribed': async (data, sender) => {
    try {
        const { drugName } = data;
        const { data: sideEffects } = await getSideEffectsByDrugName(drugName);

        const se = await drugService.getSideEffectsForDrug(drugName);

        if(se.length === 0) {
            await drugService.setSideEffectsForDrug(drugName, sideEffects);
        }
    } catch (ex) {
      logger.error(ex);
    }
  },
};
