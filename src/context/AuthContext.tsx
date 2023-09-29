import { createContext, useState, useEffect, FormEvent } from 'react';
import Props from '../utils/Props';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';

type User = {
	exp: number;
	iat: number;
	jti: string;
	token_type: string;
	user_id: 4;
	username: string;
};

const AuthContext = createContext({
	user: {} as User | null,
	loginUser: async (e: FormEvent<HTMLFormElement>) => {},
});

export default AuthContext;

export const AuthProvider = ({ children }: Props) => {
	let [user, setUser] = useState(null);
	let [authTokens, setAuthTokens] = useState(null);

	const loginUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			let response = await axios.post(
				'http://localhost:8000/auth/token/',
				{
					username: e.currentTarget.username.value,
					password: e.currentTarget.password.value,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			switch (response.status) {
				case 200:
					alert('Welcome to Manthano!');
					setAuthTokens(response.data);
					setUser(jwt_decode(response.data.access));
					break;
				default:
					alert('Something wrong is not right.');
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				switch (error.response?.status) {
					case 400:
						console.log(error.response?.data);
						break;
					case 500:
						break;
				}
				return;
			}
			console.error('Error:', error);
		}
	};

	let contextData = {
		user: user,
		loginUser: loginUser,
	};

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
