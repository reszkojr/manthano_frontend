import { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import Props from '../utils/Props';
import AuthService from '../services/AuthService';

import { LoginUserData, RegistrationUserData, Token, ResponseData } from '../types/Types';

interface AuthContextData {
	username: string | null | undefined;
	token: string | null | undefined;
	login(userData: LoginUserData): Promise<ResponseData>;
	logout(): void;
	register(userData: RegistrationUserData): Promise<ResponseData>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
	const [username, setUsername] = useState<string | null>();
	const [token, setToken] = useState<string | null>();
	// const [loading, setLoading] = useState<boolean>(true);

	// useEffect(() => {
	// 	const currentToken = localStorage.getItem('token') || '';
	// 	const currentRefreshToken = localStorage.getItem('refreshToken') || '';

	// 	const updateToken = async () => {
	// 		try {
	// 			const tokenCheckResponse = await api.post('/auth/token/check', {token: currentToken})
	// 			const refreshTokenCheckResponse = await api.post('/auth/token/check', {token: currentRefreshToken})

	// 			if (tokenCheckResponse.status !== 200)

	// 		} catch (error: unknown) {
	// 			if (axios.isAxiosError(error)) {
	// 				setUsername(null);
	// 				removeTokens();
	// 			}
	// 		}
	// 		setLoading(false);
	// 	};

	// 	updateToken();
	// }, []);

	const login = async (userData: LoginUserData) => {
		try {
			const response = await AuthService.handleLogin(userData);

			const token = response?.data.access;
			const refreshToken = response?.data.refresh;
			storeTokens(token, refreshToken);

			const decodedToken: Token = jwt_decode(token);
			const usernameFromToken = decodedToken.username;
			setUsername(usernameFromToken);
			return {
				message: 'Successfully logged in.',
				error: false,
				status: 200,
			};
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				return {
					message: error.response?.data,
					error: true,
					status: 400,
				};
			}
		}
		return {} as ResponseData;
	};

	const register = async (userData: RegistrationUserData) => {
		try {
			const response = await AuthService.handleRegister(userData);

			if (response.status !== 201) {
				return {
					message: 'Something wrong happened.',
					error: true,
					status: 400,
				};
			}

			// Login user after registration
			const { email, password } = userData;
			login({ email, password });

			return {
				message: 'Your account was successfully created!',
				error: false,
				status: 200,
			};
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				return {
					message: error.response?.data,
					error: true,
					status: 400,
				};
			}
		}
		return {} as ResponseData;
	};

	const logout = () => {
		localStorage.removeItem('token');
		return true;
	};

	const storeTokens = (token: string, refreshToken: string) => {
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('refreshToken', refreshToken);
	};

	// if (loading) {
	// 	return;
	// }

	return (
		<AuthContext.Provider
			value={{
				username,
				token,
				login,
				logout,
				register,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
