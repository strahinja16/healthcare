const axios = require('api');

module.exports = {
  async getDiseaseByName(ctx) {
    const { name } = ctx.params;

    try {
        return await axios.get(`/diseases/${name}`);
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
