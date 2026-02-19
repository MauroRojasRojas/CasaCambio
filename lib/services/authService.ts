import { apiRequest } from '../utils/apiHelper';

export interface LoginData {
	email: string;
	password: string;
}

export interface ChangePasswordData {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export async function login(data: LoginData): Promise<Response> {
	return apiRequest('/auth/login', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}

export async function changePassword(data: ChangePasswordData): Promise<Response> {
	return apiRequest('/user/change-password', {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
}