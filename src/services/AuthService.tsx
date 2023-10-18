import api from '../api';

import { LoginUserData, RegistrationUserData } from '../types/Types';

class AuthService {
	private static jsonHeaders = {
		'Content-Type': 'application/json',
	};

	public handleLogin = async (userData: LoginUserData) => {
		const response = await api.post('/auth/token/', userData, { headers: AuthService.jsonHeaders });
		return response;
	};

	public handleRegister = async (userData: RegistrationUserData) => {
		const response = await api.post('/auth/register/', userData, { headers: AuthService.jsonHeaders });
		return response;
	};

	public loginCheck = async (token: string | undefined) => {
		if (!token) return false;

		const response = await api.post('/auth/token/check', { token: token });
		return response.status === 200;
	};
}

export default new AuthService();
