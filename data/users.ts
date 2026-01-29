export interface User {
	id: string;
	email: string;
	password: string;
	fullName: string;
}

export const staticUsers: User[] = [
	{
		id: '1',
		email: 'luis@gmail.com',
		password: 'password123',
		fullName: 'Luis Marco',
	},
];
