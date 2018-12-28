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
};
