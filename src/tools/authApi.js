import axios from 'axios';
import { API_BASE_URL } from './constants';

const authApiInstance = axios.create({
    baseURL: API_BASE_URL + 'auth/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default authApiInstance;