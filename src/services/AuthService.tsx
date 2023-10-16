import axios from 'axios';

import { api } from '../config';

type LoginUserData = {
	email: string;
	password: string;
};

type RegistrationUserData = {
	username: string;
	email: string;
	password: string;
	password2: string;
	first_name: string;
	last_name: string;
};

interface RefreshAuthResponse {
	token: string;
	refreshToken: string;
}

class AuthService {
	private static url = `${api.url}`;
	private static jsonHeaders = {
		'Content-Type': 'application/json',
	};

	public handleLogin = async (userData: LoginUserData) => {
		const response = await axios.post(`${AuthService.url}/auth/token/`, userData, { headers: AuthService.jsonHeaders });
		return response;
	};

	public handleRegister = async (userData: RegistrationUserData) => {
		const response = await axios.post(`${AuthService.url}/auth/register/`, userData, { headers: AuthService.jsonHeaders });
		return response;
	};

	public async refreshAuth(token: string, refreshToken: string): Promise<RefreshAuthResponse | undefined> {
		try {
			const tokenCheckResponse = await axios.post(`${AuthService.url}/auth/token/check`, { token });

			if (tokenCheckResponse.status === 200) {
				// Token hasn't expired yet
				return { token, refreshToken };
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					// Token has expired and the refresh token will be used
					try {
						const refreshResponse = await axios.post(`${AuthService.url}/auth/token/refresh`, { refresh: refreshToken });

						if (refreshResponse.status === 200) {
							const newToken = refreshResponse.data.access;
							const newRefreshToken = refreshResponse.data.refresh;
							return { token: newToken, refreshToken: newRefreshToken };
						} else {
							throw new Error('There was en error while trying to refresh the token.');
						}
					} catch (refreshError) {
						throw new Error('There was en error while trying to refresh the token.');
					}
				} else {
					throw new Error('Error parsing token.');
				}
			}
			return undefined;
		}
	}
}

export default new AuthService();
