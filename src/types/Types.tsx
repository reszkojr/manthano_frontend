import React from "react";

export interface RefreshAuthResponse {
	token: string;
	refreshToken: string;
}

export interface Token {
	exp: number;
	iat: number;
	jti: string;
	token_type: string;
	user: number;
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
	email: string;
	token: string;
	refreshToken: string;
	user: number;
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
	users: UserClassroom[];
	jitsi_channels: JitsiChannel[];
	activeChannel: Channel | JitsiChannel | undefined | null;
}

export interface UserClassroom {
	id: number;
	role: 'student' | 'professor';
	first_name: string;
	last_name: string;
	username: string;
	profile_picture: string | undefined;
	profile_background: string | undefined;
}

export interface Student {
	enrollment: string;
}

export interface Professor {
	academic_rank: string;
	subjects: string[];
}

export interface Schedule {}

export interface Channel {
	id: number;
	name: string;
}

export interface JitsiChannel {
	id: number;
	name: string;
	room_name: string;
}

export interface Message {
	text: string;
	user?: number;
	username?: string;
	date?: Date;
	id?: number;
	avatar?: string;
	edited?: boolean;
}

export interface ContextMenuOption {
	icon?: React.ReactElement;
	label: string;
	onClick: (context: unknown) => void;
}
