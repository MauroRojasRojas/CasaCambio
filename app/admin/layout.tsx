'use client';

import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidenav from '@/components/admin/Sidenav';
import HeaderUser from '@/components/admin/HeaderUser';
import { ProtectedRoute } from '@/components/ProtectedRoute';
//import { AdminRoute } from '@/components/AdminRoute';
export default function Layout({ children }: { children: React.ReactNode }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

	return (
		<ProtectedRoute>
			<Head>
				<meta name='robots' content='noindex,nofollow' />
				<meta name='googlebot' content='noindex,nofollow,noimageindex' />
			</Head>

			<main className='min-h-screen w-full bg-[#F5F7FF]'>
				<HeaderUser isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

				<div className='flex w-full h-[calc(100vh-64px)]'>
					<Sidenav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

					<section className='flex-1 overflow-y-auto px-4 py-5 sm:px-8'>
						<div className='mb-5 flex items-center justify-between border-b border-slate-200 pb-3'>
							<button
								type='button'
								onClick={() => router.push('/')}
								className='inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium text-[#02254A] transition hover:text-[#0B5ED7] cursor-pointer'
							>
								<span className='text-base'>←</span>
								<span>Volver al panel principal</span>
							</button>

							<div className='hidden sm:flex items-center text-sm text-slate-400'>
								<span
									onClick={() => router.push('/')}
									className='cursor-pointer transition hover:text-[#02254A]'
								>
									Panel
								</span>
								<span className='mx-2'>/</span>
								<span className='text-slate-500'>Vista actual</span>
							</div>
						</div>

						{children}
					</section>
				</div>
			</main>
		</ProtectedRoute>
	);
}