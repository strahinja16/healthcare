
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const API_URL = 'http://10.0.2.2:3000/';

const development = process.env.NODE_ENV === 'development';

const instance = axios.create({
  baseURL: `${API_URL}/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem('_token');

    if (authToken) {
      config.headers.Authorization = authToken;
    }

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

export default instance;
