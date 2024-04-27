import axios from 'axios';
import config from '../config.js';
import { getToken } from './services/authSevice.js';

const apiClient = axios.create({
  baseURL: config.url,
  maxBodyLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
    appkey: config.appKey,
    appsecret: config.appSecret,
  },
});

apiClient.interceptors.request.use(
  async (config) => {

    config.headers["authorization"] = await getToken();
    return config;
  }
);

export default apiClient;
