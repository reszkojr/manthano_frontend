import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import Props from '../utils/Props';
import AuthService from '../services/AuthService';

import { LoginUserData, RegistrationUserData, RefreshAuthResponse, Token } from '../types/Types';

interface AuthContextData {
	username: string | null | undefined;
	token: string | null | undefined;
	login(userData: LoginUserData): Promise<boolean>;
	logout(): void;
	register(userData: RegistrationUserData): Promise<boolean>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
	const [username, setUsername] = useState<string | null>();
	const [token, setToken] = useState<string | null>();
	const [loading, setLoading] = useState<boolean>(true);

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
					removeTokens();
				}
			}
			setLoading(false);
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
				return true;
			}
			return false;
		} catch (error: unknown) {
			// TODO: better error handling
			if (!axios.isAxiosError(error)) {
				console.error('Error:', error);
				return false;
			}

			switch (error.response?.status) {
				case 401:
					console.error('Error:', error.response.data);
					break;
				case 500:
					console.error('Error:', error);
			}
			return false;
		}
	};

	const register = async (userData: RegistrationUserData) => {
		try {
			const response = await AuthService.handleRegister(userData);
			if (response.status == 201) {
				// Login user after registration
				const { email, password } = userData;
				login({ email, password });
				return true;
			}
			return false;
		} catch (error: unknown) {
			if (!axios.isAxiosError(error)) {
				console.error('Error:', error);
				return false;
			}

			switch (error.response?.status) {
				case 500:
				// TODO: error handling
			}
			return false;
		}
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

	const removeTokens = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
	};

	if (loading) {
		return;
	}

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
