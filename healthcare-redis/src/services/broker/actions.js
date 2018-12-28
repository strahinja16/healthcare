const axios = require('api');

module.exports = {
  async getDiseaseByName(ctx) {
    const { name } = ctx.params;

    try {
        const { data } = await axios.get(`/diseases/${name}`);
        return data;
    } catch (e) {
        return null;
    }
  },

  async getSideEffectsByDrugName(ctx) {
    const { drugName } = ctx.params;

    try {
      const { data } = await axios.get(`/side-effects/${drugName}`);
      return data;
  } catch (e) {
      return null;
  }
},

  async getDiseasesNameLike(ctx) {
    const { name } = ctx.params;

    try {
      const { data } = await axios.get(`/diseases/search/${name}`);
      return data;
    } catch (e) {
      return null;
    }
  },

  async getMedicationsForDisease(ctx) {
    const { name } = ctx.params;

    try {
      const { data } = await  axios.get(`/diseases/${name}/medications`);
      return data;
    } catch (e) {
      return null;
    }
  },
};
