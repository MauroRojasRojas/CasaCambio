import { API_BASE_URL } from './constants';

export async function apiRequest(url: string, options: RequestInit = {}): Promise<Response> {
	const token = localStorage.getItem('token'); // Asumiendo que el token está en 'token'

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (options.headers) {
		Object.assign(headers, options.headers as Record<string, string>);
	}

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const config: RequestInit = {
		...options,
		headers,
	};

	try {
		const response = await fetch(`${API_BASE_URL}${url}`, config);
		if (response.status === 401) {
			try {
				const data = await response.clone().json();
				if (data.code === 'AUTH_SESSION_EXPIRED') {
					// Redirect to login with expired flag
					window.location.href = '/login?expired=true';
					return response; // Still return the response for consistency
				}
			} catch (e) {
				// If parsing fails, continue
			}
		}
		return response;
	} catch (error) {
		console.error('Error en apiRequest:', error);
		throw error;
	}
}