const axios = require('.');

function getDiseaseByName(name) {
    return axios.get(`/diseases/${name}`);
}

function getDiseasesNameLike(name) {
    return axios.get(`/diseases/search/${name}`);
}

function getDrugsForDisease(name) {
    return axios.get(`/diseases/${name}/medications`);
}

module.exports = {
    getDiseaseByName,
    getDiseasesNameLike,
    getDrugsForDisease,
};
