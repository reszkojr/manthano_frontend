import axios, { AxiosResponse } from 'axios';

import { api } from '../config'

type LoginUserData = {
    username: string,
    password: string,
}

type RegistrationUserData = {
    username: string,
    email: string,
    password: string,
    password2: string,
    first_name: string,
    last_name: string,
}

class AuthService {
    private static url = `${api.url}/auth/token`;


    public handleLogin = async (userData: LoginUserData) => {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await axios.post(AuthService.url, userData, { headers: headers });
            if (response.status == 200) {
                this.createToken(response);
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
    }

    handleRegister = async(userData: RegistrationUserData) => {
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await axios.post(AuthService.url, userData, { headers: headers });
            if (response.status == 200) {
                // Login user after registration
                const { username, password } = userData;
                this.handleLogin({ username, password });
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
    }

    handleLogout = () => {
        this.removeToken();
    }

    createToken = (response: AxiosResponse<any, any>) => {
        localStorage.setItem('token', response.data.access);
    }

    removeToken = () => {
        localStorage.removeItem('token');
    }
}

export default new AuthService();