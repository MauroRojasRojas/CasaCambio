import { Suspense } from 'react';
import Login from '@/components/Login';

export default function Page() {
	return (
		<Suspense fallback={<div>Cargando...</div>}>
			<Login />
		</Suspense>
	);
}
