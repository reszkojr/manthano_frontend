import IconType from 'react-icon';

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
	id: number;
	name: string;
	code: string;
	description: string;
	schedule: Schedule | null;
	created_at: Date;
	updated_at: Date;
	channels: Channel[];
	activeChannel: Channel | undefined | null;
}

export interface Schedule {}

export interface Channel {
	id: number;
	name: string;
}

export interface Message {
	text: string;
	user_id?: number;
	username?: string;
	date?: Date;
	id?: number;
	avatar?: string;
	edited?: boolean;
}

export interface ContextMenuOption {
	icon?: IconType;
	label: string;
	onClick: (context: unknown) => void;
}
