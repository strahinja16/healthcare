const {
    getDiseaseByName,
    getDiseasesNameLike,
    getDrugsForDisease,
} = require('api/disease');
const { getSideEffectsByDrugName } = require('api/drug');
const diseaseService = require('services/redis/disease');
const drugService = require('services/redis/drug');

module.exports = {
  async getDiseaseByName(ctx) {
    const { name } = ctx.params;

    try {
        const disease = await diseaseService.getDisease(name);

        if(Object.keys(disease).length) {
            return { disease };
        }

        const { data } = await getDiseaseByName(name);

        diseaseService.setDisease(name, data.disease);

        return data;
    } catch (e) {
        return null;
    }
  },

  async getSideEffectsByDrugName(ctx) {
    const { drugName } = ctx.params;

    try {
      const sideEffects = await drugService.getSideEffectsForDrug(drugName);

      if(sideEffects.length) {
          return sideEffects;
      }

      const { data } = await getSideEffectsByDrugName(drugName);

      if(data.length !== 0) {
          drugService.setSideEffectsForDrug(drugName, data);
      }

      return data;
  } catch (e) {
      return null;
  }
},

  async getDiseasesNameLike(ctx) {
    const { name } = ctx.params;

    try {
      const { data } = await getDiseasesNameLike(name);
      return data;
    } catch (e) {
      return null;
    }
  },

  async getMedicationsForDisease(ctx) {
    const { name } = ctx.params;

    try {
      const medications = await diseaseService.getDrugsForDisease(name);

      if(medications.length) {
          return medications;
      }

      const { data } = await getDrugsForDisease(name);

      if(data.length !== 0) {
          await diseaseService.setDrugsForDisease(name, data);
      }

      return data;
    } catch (e) {
      return null;
    }
  },
};
