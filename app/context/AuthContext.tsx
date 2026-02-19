'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService } from '@/lib/services/authService';
import { UserModel } from '@/data/user.model';

interface AuthContextType {
	user: UserModel | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserModel | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (error) {
				console.error('Error parsing stored user', error);
				localStorage.removeItem('user');
			}
		}
		setIsLoading(false);
	}, []);

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			const response = await loginService({ email, password });
			if (response.ok) {
				const data = await response.json();
				// Crear objeto user compatible
				const userData = {
					...data.data.user,
					fullName: `${data.data.user.nombres} ${data.data.user.apellidos}`.trim()
				};
				setUser(userData);
				localStorage.setItem('user', JSON.stringify(userData));
				localStorage.setItem('token', data.data.token);
				localStorage.setItem('refreshToken', data.data.refreshToken);
				localStorage.setItem('modulos', JSON.stringify(data.data.modulos));
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Login error:', error);
			return false;
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				login,
				logout,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
