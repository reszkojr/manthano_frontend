export interface Question {
	description: string;
	center: boolean;
	size: string;
	options: Option[];
}

export interface Option {
	icon: React.ReactElement;
	title: string;
	data: string;
}
