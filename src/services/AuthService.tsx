import axios from 'axios';

import { api } from '../config';

type LoginUserData = {
	username: string;
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

	public refreshAuth = async (token: string, refreshToken: string) => {
		const authHeader = {
			Authorization: `Bearer ${token}`,
		};
		try {
			var response = await axios.post(`${AuthService.url}/auth/token/check`, { token: token }, { headers: authHeader });
			if (response.status === 200) {
				return response;
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					const response = await axios.post(`${AuthService.url}/auth/token/refresh`, { refresh: refreshToken }, { headers: authHeader });
					if (response.status === 200) {
						return response;
					}
				}
			}
		}
	};
}

export default new AuthService();
