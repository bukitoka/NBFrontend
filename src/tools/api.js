import axios from 'axios';
import { API_BASE_URL } from './constants';
import Cookies from 'js-cookie';
// import { createAction } from "@reduxjs/toolkit/query/react";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

export default api;
