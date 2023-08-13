import axios from 'axios';
import { API_BASE_URL } from './constants';
import Cookies from 'js-cookie';

const apigoogle = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
        // Accept: 'application/json',
    },
});

apigoogle.interceptors.request.use((config) => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

export default apigoogle;




