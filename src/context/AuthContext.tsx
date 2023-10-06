import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';

import Props from '../utils/Props';
import AuthService from '../services/AuthService';

type User = {
	exp: number;
	iat: number;
	jti: string;
	token_type: string;
	user_id: number;
	username: string;
};

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
	user: User | null;
	login(userData: LoginUserData): Promise<AxiosResponse<any, any> | undefined>;
	logout(): void;
	register(userData: RegistrationUserData): Promise<AxiosResponse<any, any> | undefined>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState('');

	useEffect(() => {
		checkAuthStatus(token);
	}, []);

	const login = async (userData: LoginUserData) => {
		try {
			const response = await AuthService.handleLogin(userData);
			if (response?.status == 200) {
				const token = response.data.access;
				const user = response.data.user;

				createStorageItem('token', jwt_decode(token));

				setToken(token);
				setUser(user);
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
		removeLocalStorageItem('token');
		removeLocalStorageItem('user');
	};

	const createStorageItem = (item: string, value: string) => {
		localStorage.setItem(item, value);
	};

	const removeLocalStorageItem = (item: string) => {
		localStorage.removeItem(item);
	};

	const checkAuthStatus = async (token: string) => {
		try {
			const userData = await AuthService.checkAuthStatus(token);
			if (userData) {
				setUser(user);
			}
		} catch (error) {
			setUser(null);
		}
	};

	const contextData = {
		user,
		login,
		logout,
		register,
	};

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
