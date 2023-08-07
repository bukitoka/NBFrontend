import useAuthStore from '../store/authStore';
import authApiInstance from './authApi';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

export const login = async (email, password, rememberMe) => {
    try {
        const { data, status } = await authApiInstance.post('jwt/create/', {
            email,
            password,
        });
        if (status === 200) {
            setAuthUser(data.access, data.refresh, rememberMe);
        }
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'Something went wrong',
        };
    }
};

export const register = async (email, password, re_password) => {
    try {
        const { data } = await authApiInstance.post('users/', {
            email,
            password,
            re_password,
        });
        await login(email, password);
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response.data || 'Something went wrong',
        };
    }
};

export const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    useAuthStore.getState().setUser(null);
};

export const setUser = async () => {
    // ON PAGE LOAD
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    if (!accessToken || !refreshToken) {
        return;
    }
    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};

export const setAuthUser = (access_token, refresh_token, rememberMe) => {

    const accessExpirationMinutes = rememberMe ? 1 * 24 * 60 : 15; // 1 days if rememberMe, otherwise 15 minutes
    const AccessExpirationDate = dayjs().add(accessExpirationMinutes, 'minutes');
    Cookies.set('access_token', access_token, {
        expires: AccessExpirationDate.toDate(),
        secure: true,
    });

    const RefreshExpirationMinutes = rememberMe ? 3 : 1; // 3 days if rememberMe, otherwise 1 day
    const RefreshExpirationDate = dayjs().add(RefreshExpirationMinutes, 'days');
    Cookies.set('refresh_token', refresh_token, {
        expires: RefreshExpirationDate.toDate(),
        secure: true,
    });

    const user = jwt_decode(access_token) ?? null;

    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
    const refresh_token = Cookies.get('refresh_token');
    const response = await authApiInstance.post('jwt/refresh/', {
        refresh: refresh_token,
    });
    return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken);
        const expirationTime = dayjs.unix(decodedToken.exp);
        return dayjs().isAfter(expirationTime); // Check if current time is after token's expiration time
    } catch (err) {
        return true; // Token is invalid or expired
    }
};