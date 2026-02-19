'use client';

import { useState } from 'react';
import Sidenav from '@/components/admin/Sidenav';
import HeaderUser from '@/components/admin/HeaderUser';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function Layout({ children }: { children: React.ReactNode }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<ProtectedRoute>
			<main className='min-h-screen w-full bg-[#F5F7FF]'>
				{/* HEADER FULL WIDTH */}
				<HeaderUser isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

				{/* LAYOUT PRINCIPAL (SIDEBAR + BODY) */}
				<div className='flex w-full h-[calc(100vh-64px)]'>
					{/* SIDEBAR */}
					<Sidenav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

					{/* CONTENIDO DINÁMICO */}
					<section className='flex-1 overflow-y-auto py-6 px-8'>{children}</section>
				</div>
			</main>
		</ProtectedRoute>
	);
}