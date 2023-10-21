import { createContext, useEffect, useState } from 'react';
import jwt_decode, { InvalidTokenError } from 'jwt-decode';
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
	const [token, setToken] = useState<string | null>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const storageToken = localStorage.getItem('token');
		if (storageToken === undefined || storageToken === null) {
			setToken(null);
			setLoading(false);
			return;
		}
		try {
			jwt_decode(storageToken);
		} catch (error) {
			if (error instanceof InvalidTokenError) {
				setToken(null);
				removeTokens();
			}
		}
		setToken(storageToken);
		setUsername(usernameFromToken(storageToken));
		setLoading(false);
	}, [token]);

	const login = async (userData: LoginUserData): Promise<ResponseData> => {
		return await AuthService.handleLogin(userData)
			.then((response) => {
				const token = response?.data.access;
				const refreshToken = response?.data.refresh;
				setToken(token);
				storeTokens(token, refreshToken);
				return {
					message: 'Successfully logged in.',
					error: false,
				};
			})
			.catch((error) => {
				return {
					message: error.response.data,
					error: true,
				};
			});
	};

	const register = async (userData: RegistrationUserData) => {
		return await AuthService.handleRegister(userData)
			.then(() => {
				return {
					message: 'Your account was successfully created!',
					error: false,
				};
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					return {
						message: error.response?.data,
						error: true,
					};
				}
				return {
					message: ['Something bad happened.'],
					error: true,
				};
			});
	};

	const logout = () => {
		localStorage.removeItem('token');
		return true;
	};

	const storeTokens = (token: string, refreshToken: string) => {
		localStorage.setItem('token', token);
		localStorage.setItem('refreshToken', refreshToken);
	};

	const removeTokens = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
	};

	const usernameFromToken = (token: string) => {
		const decodedToken: Token = jwt_decode(token);
		return decodedToken.username;
	};

	if (loading) {
		return <div>Loading...</div>;
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
