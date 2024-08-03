import axios from 'axios';
import { useAuth } from '../components/hooks/UseAuth';
import { removeTokens, storeTokens } from '../utils/Utils';

const useApi = () => {
	const { user, setUser } = useAuth();

	const instance = axios.create({
		baseURL: `http://${import.meta.env.VITE_REACT_APP_API}`,
	});

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

	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (!error.response) return;
			const originalRequest = error.config;

			if (!user?.token || !user?.refreshToken) return Promise.reject(error);
			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				return await instance.post('/auth/token/refresh', { refresh: user.refreshToken })
					.then(response => {
						const newToken = response.data.access;

						setUser({ ...user, token: newToken });
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
			return Promise.reject(error);
		}
	);

	return instance;
};

export default useApi;
