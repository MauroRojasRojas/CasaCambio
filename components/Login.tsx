'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Toast } from 'primereact/toast';
import { useAuth } from '@/app/context/AuthContext';

export default function Login() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const toast = useRef<Toast>(null);
	const { login } = useAuth();
	const [showPass, setShowPass] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (searchParams.get('expired') === 'true') {
			toast.current?.show({
				severity: 'error',
				summary: 'Sesión expirada',
				detail: 'Su sesión ha expirado. Vuelva a iniciar sesión.',
				life: 5000,
			});
		}
	}, [searchParams]);

	const validateEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleLogin = async () => {
		setIsLoading(true);

		try {
			const success = await login(email, password);
			if (success) {
				toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso. Redirigiendo...' });
				setIsTransitioning(true);
				await new Promise((resolve) => setTimeout(resolve, 600));
				router.push('/admin/operacion');
			} else {
				toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Correo o contraseña incorrectos' });
			}
		} catch (error) {
			console.error(error);
			toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error de red o desconocido' });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<main className={`min-h-screen w-full bg-[#FFD230] flex items-center justify-center transition-opacity duration-600 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
				{/* Overlay de carga */}
				{isLoading && (
					<div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40'>
						<div className='bg-white rounded-2xl px-8 py-6 shadow-2xl'>
							<div className='flex flex-col items-center gap-4'>
								<div className='animate-spin rounded-full h-12 w-12 border-4 border-[#FFE27A] border-t-[#02254A]'></div>
								<p className='text-[#02254A] font-semibold text-sm'>Iniciando sesión...</p>
							</div>
						</div>
					</div>
				)}

				<div className={`bg-white w-[90%] max-w-6xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-all duration-500 ${isLoading ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
					{/* ========================= */}
					{/*   COLUMNA IZQUIERDA       */}
					{/* ========================= */}
					<div className='px-10 py-14 flex flex-col justify-start'>
						<h1 className='text-4xl font-extrabold text-[#02254A]'>Iniciar sesión</h1>

						<p className='mt-2 text-sm text-slate-600'>
							¿Aún no tienes cuenta?
							<a href='/registro' className='text-[#0053A4] font-semibold hover:underline cursor-pointer'>
								{' '}
								Regístrate →
							</a>
						</p>

						{/* FORMULARIO */}
						<div className='mt-8 space-y-5'>
							{/* CORREO */}
							<div>
								<label className='text-sm font-semibold text-[#02254A]'>Correo electrónico</label>
								<input
									type='email'
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if (!validateEmail(e.target.value)) {
											setEmailError('Correo electrónico inválido');
										} else {
											setEmailError('');
										}
									}}
									placeholder='Ingresa tu correo'
									disabled={isLoading}
									className='mt-1 w-full border border-slate-300 rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:border-blue-600 outline-none text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
								/>
								{emailError && <p className='text-red-500 text-sm mt-1'>{emailError}</p>}
							</div>

							{/* CONTRASEÑA */}
							<div>
								<label className='text-sm font-semibold text-[#02254A]'>Contraseña</label>

								<div className='relative mt-1'>
									<input
										type={showPass ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder='Ingresa tu contraseña'
										disabled={isLoading}
										className='w-full border border-slate-300 rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:border-blue-600 outline-none text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
									/>

									<span onClick={() => !isLoading && setShowPass(!showPass)} className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
										{showPass ? <EyeSlashIcon className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
									</span>
								</div>
							</div>

							{/* ERROR MESSAGE REMOVED, USING TOAST */}

							{/* RECORDAR & RECUPERAR */}
							<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-1'>
								<label className='flex items-center gap-2 text-sm text-slate-700'>
									<input type='checkbox' disabled={isLoading} />
									Recuérdame
								</label>

								<a href='/recuperar' className={`text-sm text-[#0053A4] hover:underline font-semibold cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
									¿Olvidaste tu contraseña?
								</a>
							</div>

							{/* BOTÓN LOGIN */}
							<button
								onClick={handleLogin}
								disabled={!email || !password || emailError !== '' || isLoading}
								className='w-full bg-yellow-400 text-[#02254A] py-3 rounded-xl font-semibold shadow-sm hover:bg-yellow-300 transition-all duration-300 text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-95'
							>
								{isLoading ? (
									<>
										<div className='animate-spin rounded-full h-5 w-5 border-2 border-[#02254A] border-t-transparent mr-2'></div>
										Iniciando sesión...
									</>
								) : (
									'Iniciar sesión'
								)}
							</button>
						</div>
					</div>

					{/* ========================= */}
					{/*   COLUMNA DERECHA IMAGEN  */}
					{/* ========================= */}
					<div className='hidden lg:flex items-center justify-center bg-white'>
						<div className='w-full flex items-center justify-center p-8'>
							<div className='w-[330px] xl:w-[360px] h-[460px] xl:h-[500px] overflow-hidden rounded-[26px] bg-[#f8f8f8]'>
								<Image
									src='/assets/iniciarsesion.png'
									alt='Login banner'
									width={600}
									height={600}
									className='w-full h-full object-cover object-center'
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Toast ref={toast} />
		</>
	);
}
