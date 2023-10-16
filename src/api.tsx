import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// If the error status is 401 and there is no originalRequest._retry flag,
		// it means the token has expired and we need to refresh it
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
		}

		try {
			const refreshToken = localStorage.getItem('refreshToken');
			const response = await api.post('/auth/token/refresh', { refresh: refreshToken });
			const token = response.data.access;

			localStorage.setItem('token', token);

			originalRequest.headers.Authorization = `Bearer ${token}`;
			return axios(originalRequest);
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				localStorage.removeItem('refreshToken');
				localStorage.removeItem('token');
			}
		}
	}
);

export default api;
