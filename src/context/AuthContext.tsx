import { createContext, useState, useEffect, FormEvent } from 'react';
import Props from '../utils/Props';
import axios, { AxiosPromise, AxiosResponse } from 'axios';

const AuthContext = createContext({
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
				case 201:
					console.log('Account succesfully created! Welcome to Manthano!');
					break;
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
		loginUser: loginUser,
	};

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
