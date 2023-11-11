import axios from 'axios';
import { useAuth } from '../components/hooks/UseAuth';

const useApi = () => {
	const { user, setUser } = useAuth();

	const instance = axios.create({
		baseURL: import.meta.env.VITE_REACT_APP_API,
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
			const originalRequest = error.config;

			if (!user?.token || !user?.refreshToken) return axios(originalRequest);

			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
			}

			try {
				const response = await instance.post('/auth/token/refresh', { refresh: user.refreshToken });
				const newToken = response.data.access;

				// Atualiza o token no contexto
				localStorage.removeItem('token');
				localStorage.removeItem('refreshToken');
				setUser(null);
				// setUser({ ...user, token: newToken });

				// localStorage.setItem('token', newToken);
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return axios(originalRequest);
			} catch (refreshError) {
				// Limpa os tokens em caso de erro no refresh
				localStorage.removeItem('token');
				localStorage.removeItem('refreshToken');
				window.location.reload();
				return axios(originalRequest);
			}
		}
	);

	return instance;
};

export default useApi;
