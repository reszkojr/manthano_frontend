import { createContext, useEffect, useState } from 'react';
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
	const [username, setUsername] = useState<string>();
	const [token, setToken] = useState<string>();

	useEffect(() => {
		// Force Axios API to send a request after each component mount.
		const storageToken = localStorage.getItem('token');
		if (storageToken) {
			setToken(storageToken);
		}
		AuthService.loginCheck(token);
	}, [token]);

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
			await AuthService.handleRegister(userData);

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
			return {
				message: ['An error ocurred. We are sorry for the inconvenience.'],
				error: true,
				status: 400,
			};
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
