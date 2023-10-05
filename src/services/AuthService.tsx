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

	public checkAuthStatus = async (token: string) => {
		const authHeader = {
			Authorization: `Bearer ${token}`,
		};
        var userData = null
		try {
			const response = await axios.post(`${AuthService.url}/auth/token/check`, token, { headers: authHeader });

			if (response.status === 200) {
				userData = response.data;
			}
			return userData;
		} catch (error: unknown) {
            return null;
        }
	};
}

export default new AuthService();
