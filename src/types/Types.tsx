export interface RefreshAuthResponse {
	token: string;
	refreshToken: string;
}

export interface Token {
	exp: number;
	iat: number;
	jti: string;
	token_type: string;
	user_id: number;
	username: string;
}

export type LoginUserData = {
	email: string;
	password: string;
};

export type RegistrationUserData = {
	username: string;
	email: string;
	password: string;
	password2: string;
	first_name: string;
	last_name: string;
};

export interface ResponseData {
	message: string;
	error: boolean;
}

export interface User {
	username: string;
	token: string;
	refreshToken: string;
	user_id: number;
	avatar: string;
}

export interface Classroom {
	name: string;
	code: string;
	channels: Channel[];
	activeChannel: Channel | undefined;
}

export interface Channel {
	id: number;
	name: string;
}

export interface Message {
	text: string;
	user?: User;
	date?: Date;
	id?: number;
	avatar?: string;
}
