'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface GuestGuardProps {
	children: ReactNode;
	redirectTo?: string;
}

export default function GuestGuard({
	children,
	redirectTo = '/',
}: GuestGuardProps) {
	const router = useRouter();
	const { isAuthenticated, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			router.replace(redirectTo);
		}
	}, [isAuthenticated, isLoading, redirectTo, router]);

	if (isLoading) return null;
	if (isAuthenticated) return null;

	return <>{children}</>;
}