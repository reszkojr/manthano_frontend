import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios, { Axios, AxiosResponse } from 'axios';

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

interface UserData {
	username: string;
	token: string;
	refreshToken: string;
}

interface AuthContextData {
	userData: UserData;
	login(userData: LoginUserData): Promise<AxiosResponse<any, any> | undefined>;
	logout(): void;
	register(userData: RegistrationUserData): Promise<AxiosResponse<any, any> | undefined>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
	const [userData, setUserData] = useState({} as UserData);

	useEffect(() => {
		refreshAuth(localStorage.getItem('token'), localStorage.getItem('refreshToken'));
	}, []);

	const login = async (userData: LoginUserData) => {
		try {
			const response = await AuthService.handleLogin(userData);
			if (response?.status == 200) {
				const username: string = jwt_decode(response?.data.access);
				const token = response?.data.access;
				const refreshToken = response?.data.refresh;

				storeAuthData(username, token, refreshToken);
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

	const storeAuthData = (username: string, token: string, refreshToken: string) => {
		setUserData({ username, token, refreshToken });

		localStorage.setItem('token', token);
		localStorage.setItem('refreshToken', refreshToken);
	};

	const refreshAuth = async (token: string | null, refreshToken: string | null) => {
		try {
			if (!token || !refreshToken) {
				return;
			}
			const response = await AuthService.refreshAuth(token, refreshToken);

			if (response?.status === 200) {
				const decodedToken: Token = jwt_decode(response?.data.access);
				const username: string = decodedToken.username;

				storeAuthData(username, token, refreshToken);
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					const data = error.response?.data;

					const newToken = data.access;
					const newRefreshToken = data.refresh;
					setUserData((prev) => {
						prev.token = newToken;
						prev.refreshToken = newRefreshToken;
						return prev;
					});
				}
			}
		}
	};
	return (
		<AuthContext.Provider
			value={{
				userData,
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
