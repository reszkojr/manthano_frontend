import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
			config.headers['Accept'] = 'application/json';
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response.config.url.includes('/auth/login') || error.response.config.url.includes('/auth/register')) {
			return Promise.reject(error);
		}
		const originalRequest = error.config;

		// If the error status is 401 and there is no originalRequest._retry flag,
		// it means the token has expired and we need to refresh it
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
		}

		const refreshToken = localStorage.getItem('refreshToken');
		if (!refreshToken) return;

		const response = await api.post('/auth/token/refresh', { refresh: refreshToken });
		const token = response.data.access;

		localStorage.setItem('token', token);

		return axios(originalRequest);
	}
);

export default api;
