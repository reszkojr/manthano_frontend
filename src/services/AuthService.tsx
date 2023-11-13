import { Axios } from 'axios';
import { LoginUserData, RegistrationUserData } from '../types/Types';

class AuthService {
	private static jsonHeaders = {
		'Content-Type': 'application/json',
	};

	public handleLogin = async (userData: LoginUserData, api: Axios) => {
		const response = await api.post('/auth/token/', userData, { headers: AuthService.jsonHeaders });
		return response;
	};

	public handleRegister = async (userData: RegistrationUserData, api: Axios) => {
		const response = await api.post('/auth/register/', userData, { headers: AuthService.jsonHeaders });
		return response;
	};

	public loginCheck = async (token: string | undefined, api: Axios) => {
		if (!token) return false;
		await api.post('/auth/token/check', { token: token });
	};
}

export default new AuthService();
