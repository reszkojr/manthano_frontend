import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import jwt_decode, { InvalidTokenError } from 'jwt-decode';
import axios, { Axios } from 'axios';

import Props from '../utils/Props';
import AuthService from '../services/AuthService';

import { Classroom, LoginUserData, RegistrationUserData, ResponseData, User } from '../types/Types';
import useApi from '../hooks/useApi';
import { removeTokens, storeTokens, userIdFromToken, usernameFromToken } from '../utils/Utils';

interface AuthContextData {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	login(userData: LoginUserData): Promise<ResponseData>;
	logout(): void;
	getClassroom(newApi: Axios): Promise<Classroom | null>;
	register(userData: RegistrationUserData): Promise<ResponseData>;
	tokenCheck(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const api = useApi();

	useEffect(() => {
		const storageToken = localStorage.getItem('token');
		const refreshToken = localStorage.getItem('refreshToken');
		if (!storageToken || !refreshToken) {
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
			refreshToken: refreshToken,
			user_id,
			avatar: '', // TODO
		});
		setLoading(false);
	}, []);

	const login = async (userData: LoginUserData): Promise<ResponseData> => {
		return await AuthService.handleLogin(userData, api)
			.then((response) => {
				const token = response?.data.access;
				const refreshToken = response?.data.refresh;

				const username = usernameFromToken(token);
				const user_id = userIdFromToken(token);
				setUser({
					username,
					token,
					refreshToken,
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
		return await AuthService.handleRegister(userData, api)
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

	const getClassroom = async (api: Axios) => {
		return await api
			.get('/classroom/user')
			.then((response) => response.data)
			.catch(() => null);
	};

	const tokenCheck = async () => {
		if (!user) return;
		await AuthService.loginCheck(user.token, api);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
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
