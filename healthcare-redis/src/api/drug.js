const axios = require('.');

function getSideEffectsByDrugName(drugName) {
    return axios.get(`/side-effects/${drugName}`);
}

module.exports = { getSideEffectsByDrugName };
