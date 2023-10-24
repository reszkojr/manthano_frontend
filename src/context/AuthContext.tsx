import { createContext, useEffect, useState } from 'react';
import jwt_decode, { InvalidTokenError } from 'jwt-decode';
import axios from 'axios';

import Props from '../utils/Props';
import AuthService from '../services/AuthService';

import { LoginUserData, RegistrationUserData, ResponseData, Token, User } from '../types/Types';
import api from '../api';

interface AuthContextData {
	user: User | null;
	login(userData: LoginUserData): Promise<ResponseData>;
	logout(): void;
	getClassroom(): Promise<string | null>;
	register(userData: RegistrationUserData): Promise<ResponseData>;
	tokenCheck(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const storageToken = localStorage.getItem('token');
		if (storageToken === undefined || storageToken === null) {
			setUser(null);
			setLoading(false);
			return;
		}
		try {
			jwt_decode(storageToken);
		} catch (error) {
			if (error instanceof InvalidTokenError) {
				setUser(null);
				removeTokens();
			}
		}

		const username = usernameFromToken(storageToken);
		const user_id = userIdFromToken(storageToken);

		setUser({
			username,
			token: storageToken,
			user_id,
			avatar: '', // TODO
		});
		(async () => {
			await tokenCheck();
		})();
		setLoading(false);
	}, []);

	const login = async (userData: LoginUserData): Promise<ResponseData> => {
		return await AuthService.handleLogin(userData)
			.then((response) => {
				const token = response?.data.access;
				const refreshToken = response?.data.refresh;

				const username = usernameFromToken(token);
				const user_id = userIdFromToken(token);
				setUser({
					username,
					token,
					user_id,
					avatar: '', // TODO
				});
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

	const getClassroom = async () => {
		return await api
			.get('/classroom/user')
			.then((response) => response.data.classroom_code)
			.catch(() => null);
	};

	const tokenCheck = async () => {
		if (!user) return
		await AuthService.loginCheck(user.token);
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

	const userIdFromToken = (token: string) => {
		const decodedToken: Token = jwt_decode(token);
		return decodedToken.user_id;
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				getClassroom,
				register,
				tokenCheck,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
