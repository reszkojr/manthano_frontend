import { Token } from '../types/Types';
import jwt_decode from 'jwt-decode';

export const storeTokens = (token: string, refreshToken: string) => {
	localStorage.setItem('token', token);
	localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('refreshToken');
};

export const usernameFromToken = (token: string) => {
	const decodedToken: Token = jwt_decode(token);
	return decodedToken.username;
};

export const userIdFromToken = (token: string) => {
	const decodedToken: Token = jwt_decode(token);
	return decodedToken.user;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isJitsiChannel = (channel: any) => {
	return 'room_name' in channel;
};
