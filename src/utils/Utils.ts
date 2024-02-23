import { Token } from "../types/Types";
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