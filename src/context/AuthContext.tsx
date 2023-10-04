import { createContext, useState, useEffect, FormEvent } from 'react';
import axios, {  AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import Props from '../utils/Props';

import { config } from "../config";

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
	loginUser: async (e) => Promise<void>, // Função sem parâmetros
});

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		// If there already is a token available, set it to be state's token and user.
		const storedToken = localStorage.getItem('token');

		if (storedToken) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			setToken(storedToken);

			setUser(jwt_decode(storedToken));
			return;
		}
		delete axios.defaults.headers.common['Authorization'];
		localStorage.removeItem('token');
	}, [token]);

	const loginUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
		try {
			const userData = {
				username: e.currentTarget.username.value,
				password: e.currentTarget.password.value,
			};

			let headers = { 'Content-Type': 'application/json' };
			let url = `${config.url}/auth/token/`
			const response = await axios.post(url, userData, { headers: headers });
	
			handleAuthenticationResponse(response);
		} catch (error: unknown) {
			handleAuthenticationError(error);
		}
	};

	const handleAuthenticationResponse = (response: AxiosResponse) => {
		switch (response.status) {
			case 200:
				alert('Welcome to Manthano!');

				setToken(response.data);
				setUser(jwt_decode(response.data.access));

				localStorage.setItem('token', response.data.access);
				navigate('/');
				break;
			default:
				console.log('Something wrong is definetely not right.');
		}
	};

	const handleAuthenticationError = (error: unknown) => {
		if (!axios.isAxiosError(error)) {
			console.error('Error:', error);
			return;
		}

		switch (error.response?.status) {
			case 500:
		}
	};

	let contextData = {
		user: user,
		loginUser: loginUser,
	};

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
