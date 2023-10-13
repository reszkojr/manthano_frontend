import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';

import Props from '../utils/Props';
import AuthService from '../services/AuthService';

interface Token {
	exp: number;
	iat: number;
	jti: string;
	token_type: string;
	user_id: number;
	username: string;
}

interface RefreshAuthResponse {
	token: string;
	refreshToken: string;
}

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

interface AuthContextData {
	username: string | null | undefined;
	login(userData: LoginUserData): Promise<AxiosResponse<unknown, unknown> | undefined>;
	logout(): void;
	register(userData: RegistrationUserData): Promise<AxiosResponse<unknown, unknown> | undefined>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
	const [username, setUsername] = useState<string | null>();

	useEffect(() => {
		const currentToken = localStorage.getItem('token') || '';
		const currentRefreshToken = localStorage.getItem('refreshToken') || '';

		const updateToken = async () => {
			try {
				const authResponse: RefreshAuthResponse | undefined = await AuthService.refreshAuth(currentToken, currentRefreshToken);

				if (authResponse) {
					const decodedToken: Token = jwt_decode(authResponse.token);
					const usernameFromToken = decodedToken.username;

					setUsername(usernameFromToken);
					storeTokens(authResponse.token, authResponse.refreshToken);
				}
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					setUsername(null);
					// Lida com outros erros
					console.error('Unknown error: sss', error);
				}
			}
		};

		updateToken();
	}, []);

	const login = async (userData: LoginUserData) => {
		try {
			const response = await AuthService.handleLogin(userData);
			if (response?.status == 200) {
				const token = response?.data.access;
				const refreshToken = response?.data.refresh;

				storeTokens(token, refreshToken);
			}
			return response;
		} catch (error: unknown) {
			// TODO: better error handling
			if (!axios.isAxiosError(error)) {
				console.error('Error:', error);
				return;
			}

			switch (error.response?.status) {
				case 401:
					console.error('Error:', error.response.data);
					break;
				case 500:
					console.error('Error:', error);
			}
		}
	};

	const register = async (userData: RegistrationUserData) => {
		try {
			const response = await AuthService.handleRegister(userData);
			if (response.status == 201) {
				// Login user after registration
				const { username, password } = userData;
				login({ username, password });
			}
			return response;
		} catch (error: unknown) {
			if (!axios.isAxiosError(error)) {
				console.error('Error:', error);
				return;
			}

			switch (error.response?.status) {
				case 500:
				// TODO: error handling
			}
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
	};

	const storeTokens = (token: string, refreshToken: string) => {
		localStorage.setItem('token', token);
		localStorage.setItem('refreshToken', refreshToken);
	};

	return (
		<AuthContext.Provider
			value={{
				username,
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
