'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import 'primeicons/primeicons.css';
import 'primeicons/primeicons.css';

interface HeaderUserProps {
	isMenuOpen: boolean;
	setIsMenuOpen: (open: boolean) => void;
}

export default function HeaderUser({ isMenuOpen, setIsMenuOpen }: HeaderUserProps) {
	const router = useRouter();
	const { user, logout } = useAuth();
	const [showMenu, setShowMenu] = useState(false);

	const handleLogout = () => {
		logout();
		router.push('/');
		setShowMenu(false);
	};

	return (
		<header className='w-full bg-white h-16 shadow-sm px-4 sm:px-10 flex items-center justify-between border-b border-slate-200'>
			{/* BOTÓN MENÚ MOBILE + LOGO */}
			<div className='flex items-center gap-1'>
				{/* Botón menú mobile */}
				<button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden p-2 text-[#02254A] hover:bg-gray-100 rounded'>
					☰
				</button>
				<img src='/icons/logomejorado1.png' alt='logo' className='h-25 w-auto rounded-full' />
			</div>

			{/* USUARIO */}
			<div className='flex items-center gap-5 relative'>
				{/* Icono usuario - oculto en mobile */}
				<div className='relative cursor-pointer hover:opacity-80 transition-opacity hidden sm:block'>
					<img src='/icons/user.png' alt='user' className='w-6 h-6' />
				</div>

				{/* Nombre usuario + dropdown */}
				<div className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity' onClick={() => setShowMenu(!showMenu)}>
					<span className='font-semibold text-[#02254A] hidden sm:inline'>{user?.fullName}</span>
					<img src='/icons/low-arrow.png' alt='low' className={`w-5 h-5 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
				</div>

				{/* DIALOG MENU */}
				{showMenu && (
					<div className='absolute right-0 top-12 bg-white border border-slate-200 rounded-lg shadow-lg w-56 z-50'>
						{/* Imagen y Nombre usuario */}
						<div className='px-6 py-4 border-b border-slate-200 flex items-center gap-3'>
							<img src='/icons/user.png' alt='user' className='w-8 h-8 rounded-full' />
							<span className='font-semibold text-[#02254A]'>{user?.fullName}</span>
						</div>
						<Link href='/admin/mi-perfil'>
							<button className='w-full text-left px-6 py-4 hover:bg-slate-100 transition-colors text-[#02254A] text-base font-medium flex items-center gap-2'>
								<i className='pi pi-user'></i> Ver perfil
							</button>
						</Link>
						<button
							onClick={handleLogout}
							className='w-full text-left px-6 py-4 hover:bg-red-50 transition-colors text-red-600 text-base font-medium border-t border-slate-200 flex items-center gap-2'
						>
							<i className='pi pi-sign-out'></i> Cerrar sesión
						</button>
					</div>
				)}
			</div>
		</header>
	);
}
