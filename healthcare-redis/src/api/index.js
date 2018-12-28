
const axios = require('axios');
const { apiUrl, nodeEnv } = require('config');

const development = nodeEnv === 'development';

const instance = axios.create({
    baseURL: `${apiUrl}/api/`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    async (config) => {
        if (development) {
            console.log(`[${config.method}]: ${config.url}`);
            if (config.data) {
                console.log('Data: ', config.data);
            }
        }

        return config;
    },
    (error) => {
        if (development) {
            console.error(error);
        }
        return Promise.reject(error);
    },
);

module.exports = instance;
