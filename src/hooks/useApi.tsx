import axios from 'axios';
import jwtDecode from "jwt-decode";
import {useEffect} from "react";
import {useAuth} from '../components/hooks/UseAuth';
import {Token} from "../types/Types.tsx";
import {removeTokens, storeTokens} from '../utils/Utils';

const useApi = () => {
    const {user, setUser} = useAuth();

    const instance = axios.create({
        baseURL: `http://${import.meta.env.VITE_REACT_APP_API}`,
    });

    const isTokenExpired = (token: string) => {
        if (!token) return true;
        try {
            const decodedToken: Token = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.log('Error decoding token:', error)
            return true;
        }
    }

    useEffect(() => {
        instance.interceptors.request.use(
            (config) => {
                if (user?.token) {
                    config.headers['Authorization'] = `Bearer ${user.token}`;
                    config.headers['Accept'] = 'application/json';
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                } else {
                    delete config.headers['Authorization'];
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }, [user]);

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (!error.response) return;
            const originalRequest = error.config;

            if (!user?.token || !user?.refreshToken) return Promise.reject(error);

            if (isTokenExpired(user.token)) {
                setUser(null)
                return Promise.reject(error);
            }
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                return await instance.post('/auth/token/refresh', {refresh: user.refreshToken})
                    .then(response => {
                        const newToken = response.data.access;

                        setUser({...user, token: newToken});
                        storeTokens(newToken, user?.refreshToken);

                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return axios(originalRequest);
                    })
                    .catch(() => {
                        removeTokens();
                        setUser(null);
                        return axios(originalRequest);
                    })
            }
            setUser(null);
            return Promise.reject(error)
        }
    );

    return instance;
};

export default useApi;
