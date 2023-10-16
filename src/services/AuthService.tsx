import api from '../api';

import { LoginUserData, RegistrationUserData } from '../types/Types';

class AuthService {
	private static jsonHeaders = {
		'Content-Type': 'application/json',
	};

	public handleLogin = async (userData: LoginUserData) => {
		const response = await api.post(`/auth/token/`, userData, { headers: AuthService.jsonHeaders });
		const { access } = response.data;
		api.defaults.headers.common['Authorization'] = 'Bearer ' + access;
		return response;
	};

	public handleRegister = async (userData: RegistrationUserData) => {
		const response = await api.post(`/auth/register/`, userData, { headers: AuthService.jsonHeaders });
		return response;
	};

	// public async refreshAuth(token: string, refreshToken: string): Promise<RefreshAuthResponse | undefined> {
	// 	try {
	// 		const tokenCheckResponse = await api.post(`/auth/token/check`, { token });

	// 		if (tokenCheckResponse.status === 200) {
	// 			// Token hasn't expired yet
	// 			return { token, refreshToken };
	// 		}
	// 	} catch (error) {
	// 		if (axios.isAxiosError(error)) {
	// 			if (error.response?.status === 401) {
	// 				// Token has expired and the refresh token will be used
	// 				try {
	// 					const refreshResponse = await api.post(`/auth/token/refresh/`, { refresh: refreshToken });

	// 					if (refreshResponse.status === 200) {
	// 						const newToken = refreshResponse.data.access;
	// 						const newRefreshToken = refreshResponse.data.refresh;
	// 						return { token: newToken, refreshToken: newRefreshToken };
	// 					} else {
	// 						throw new Error('There was en error while trying to refresh the token.');
	// 					}
	// 				} catch (refreshError) {
	// 					throw new Error('There was en error while trying to refresh the token.');
	// 				}
	// 			} else {
	// 				throw new Error('Error parsing token.');
	// 			}
	// 		}
	// 		return undefined;
	// 	}
	// }
}

export default new AuthService();
