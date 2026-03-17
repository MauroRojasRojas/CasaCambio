'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
	const router = useRouter();
	const { isAuthenticated, user, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const goRegister = () => {
		router.push('/registro');
	};

	const goLogin = () => {
		router.push('/login');
	};

	const goOperations = () => {
		router.push('/admin/operacion');
	};

	const handleLogout = () => {
		logout();
		router.push('/');
	};

	return (
		<div className='fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200'>
			<div className='max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 py-0'>

				{/* Main header */}
				<div className='flex items-center justify-between'>
					{/* Left nav */}
					<nav className='hidden md:flex items-center gap-4 lg:gap-6 text-sm lg:text-base font-medium text-slate-700'>
						<button className='hover:text-[#0053A4] font-semibold cursor-pointer' onClick={() => router.push('/quienes-somos')}>
							¿Quiénes somos?
						</button>
						<button className='hover:text-[#0053A4] font-semibold cursor-pointer' onClick={() => router.push('/contactanos')}>
							Contacto
						</button>
					</nav>

					{/* Logo center */}
					<div className='flex-1 flex items-center justify-start md:justify-center gap-3 m-2'>
						<Image src='/icons/logov.png' onClick={() => router.push('./')} alt='Dollariza' width={180} height={180} priority className='cursor-pointer h-10 md:h-12 lg:h-[130px] object-contain' style={{ width: 'auto' }} />
					</div>

					{/* Right buttons */}
					<div className='hidden md:flex items-center gap-4'>
						{isAuthenticated ? (
							<>
								{/* Usuario autenticado */}
								<div className='flex items-center gap-2'>
									<span className='text-sm font-semibold text-slate-700'>Hola, {user?.fullName.split(' ')[0]}</span>
								</div>
								<button
									onClick={goOperations}
									className='
                    px-4 py-2
                    rounded-lg
                    bg-[#FFE27A]
                    text-[#02254A]
                    shadow-lg
                    hover:bg-[#ffd94a]
                    hover:shadow-xl
                    transition-all
                    duration-300
                    cursor-pointer
                    text-sm
                    font-semibold
                  '
								>
									Mis operaciones
								</button>
								<button
									onClick={handleLogout}
									className='
                    px-4 py-2
                    rounded-lg
                    border border-red-500
                    text-red-600
                    shadow-lg
                    hover:bg-red-50
                    hover:shadow-xl
                    transition-all
                    duration-300
                    cursor-pointer
                    text-sm
                    font-semibold
                  '
								>
									Cerrar sesión
								</button>
							</>
						) : (
							<>
								{/* Usuario no autenticado */}
								<button
									onClick={goRegister}
									className='
                    px-4 py-2
                    rounded-lg
                    border border-[#0053A4]
                    text-[#003f7c]
                    shadow-lg
                    hover:bg-[#0053A4]
                    hover:text-white
                    hover:shadow-xl
                    transition-all
                    duration-300
                    cursor-pointer
                    text-sm
                    font-semibold
                  '
								>
									Regístrate
								</button>

								<button
									onClick={goLogin}
									className='
                    px-4 py-2
                    rounded-lg
                    bg-[#0053A4]
                    text-white
                    shadow-lg
                    hover:bg-[#003f7c]
                    hover:shadow-xl
                    transition-all
                    duration-300
                    cursor-pointer
                    text-sm
                    font-semibold
                  '
								>
									Iniciar sesión
								</button>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<button onClick={() => setIsOpen(!isOpen)} className='md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100'>
						<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
						</svg>
					</button>
				</div>

				{/* Mobile menu */}
				{isOpen && (
					<div className='md:hidden mt-4 pb-4 border-t border-slate-200'>
						<nav className='flex flex-col gap-4'>
							{/* Main nav items */}
							<button className='mt-4 text-left hover:text-[#0053A4] font-semibold cursor-pointer' onClick={() => router.push('/quienes-somos')}>
								¿Quiénes somos?
							</button>
							<button className='text-left hover:text-[#0053A4] font-semibold cursor-pointer' onClick={() => router.push('/contactanos')}>
								Contacto
							</button>
							{/* Buttons */}
							<div className='flex flex-col gap-2'>
								{isAuthenticated ? (
									<>
										<div className='text-sm font-semibold text-slate-700 py-2'>Hola, {user?.fullName}</div>
										<button
											onClick={goOperations}
											className='
                        px-4 py-2
                        rounded-lg
                        bg-[#FFE27A]
                        text-[#02254A]
                        shadow-lg
                        hover:bg-[#ffd94a]
                        hover:shadow-xl
                        transition-all
                        duration-300
                        cursor-pointer
                        text-sm
                        font-semibold
                      '
										>
											Mis operaciones
										</button>
										<button
											onClick={handleLogout}
											className='
                        px-4 py-2
                        rounded-lg
                        border border-red-500
                        text-red-600
                        shadow-lg
                        hover:bg-red-50
                        hover:shadow-xl
                        transition-all
                        duration-300
                        cursor-pointer
                        text-sm
                        font-semibold
                      '
										>
											Cerrar sesión
										</button>
									</>
								) : (
									<>
										<button
											onClick={goRegister}
											className='
                        px-4 py-2
                        rounded-lg
                        border border-[#0053A4]
                        text-[#003f7c]
                        shadow-lg
                        hover:bg-[#0053A4]
                        hover:text-white
                        hover:shadow-xl
                        transition-all
                        duration-300
                        cursor-pointer
                        text-sm
                        font-semibold
                      '
										>
											Regístrate
										</button>
										<button
											onClick={goLogin}
											className='
                        px-4 py-2
                        rounded-lg
                        bg-[#0053A4]
                        text-white
                        shadow-lg
                        hover:bg-[#003f7c]
                        hover:shadow-xl
                        transition-all
                        duration-300
                        cursor-pointer
                        text-sm
                        font-semibold
                      '
										>
											Iniciar sesión
										</button>
									</>
								)}
							</div>
						</nav>
					</div>
				)}
			</div>
		</div>
	);
}
