import { Suspense } from 'react';
import Login from '@/components/Login';
import GuestGuard from '@/components/GuestGuard';

export default function Page() {
	return (
		<GuestGuard redirectTo='/'>
			<Suspense fallback={<div>Cargando...</div>}>
				<Login />
			</Suspense>
		</GuestGuard>
	);
}