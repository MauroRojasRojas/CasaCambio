'use client';

import { useRouter } from 'next/navigation';

export default function Benefits() {
	const router = useRouter();

	const goRegister = () => {
		router.push('/register');
	};

	return (
		<section className='py-12 md:py-16 lg:py-20 4k:py-24 px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 max-w-[1800px] mx-auto'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12'>
				<div>
					<h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#02254A] mb-3 md:mb-4'>
						¿Por qué <span className='text-[#02254A]/90'>elegirnos?</span>
					</h3>

					{/* Alertas */}
					<div className='bg-linear-to-b from-[#B63A42] to-[#3A475F] rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-md'>
						<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3'>Tu dinero vale más aquí, porque cada cambio suma más para ti.</h3>

						<p className='text-white/90 text-xs sm:text-sm mb-3 md:mb-4'>¡Te avisamos cuando el tipo de cambio sea el que más te beneficie!</p>

						<button
							onClick={goRegister}
							className='bg-yellow-400 text-[#02254A] font-semibold px-4 sm:px-6 py-2 rounded-xl shadow mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-3 cursor-pointer text-sm sm:text-base'
						>
							Regístrate
						</button>
						{/* LOGOS DE SBS Y SUNAT */}
						<div className='flex items-center justify-center gap-4 sm:gap-6 mt-3 md:mt-4'>
							<img src='/icons/sbs.png' alt='SBS' className='h-[24px] sm:h-[28px] md:h-[32px] w-auto opacity-90' />
							<img src='/icons/sunat.png' alt='SUNAT' className='h-[24px] sm:h-[28px] md:h-[32px] w-auto opacity-90' />
						</div>
					</div>
				</div>

				<div>
					<div className='grid grid-cols-2 gap-3 sm:gap-4 md:gap-5'>
						{/* AHORRO */}
						<div className='bg-yellow-400 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 shadow'>
							<div className='relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 mb-2 md:mb-3'>
								<div className='absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)]'></div>
								<img src='/icons/saving.png' alt='ahorro' className='absolute inset-0 m-auto w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 brightness-0 invert' />
							</div>
							<h4 className='font-bold text-[#02254A] text-sm sm:text-base md:text-lg'>Ahorro</h4>
							<p className='text-xs text-slate-600 mt-1'>+40 millones de soles ahorrados por nuestros clientes</p>
						</div>

						{/* RAPIDEZ */}
						<div className='bg-yellow-100 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 shadow'>
							<div className='relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 mb-2 md:mb-3'>
								<div className='absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)]'></div>
								<img src='/icons/speed.png' alt='rapidez' className='absolute inset-0 m-auto w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 brightness-0 invert' />
							</div>
							<h4 className='font-bold text-[#02254A] text-sm sm:text-base md:text-lg'>Rapidez</h4>
							<p className='text-xs text-slate-600 mt-1'>Transferencias entre 15 y 40 min</p>
						</div>

						{/* CONFIANZA */}
						<div className='bg-yellow-200 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 shadow'>
							<div className='relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 mb-2 md:mb-3'>
								<div className='absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)]'></div>
								<img src='/icons/trust.png' alt='confianza' className='absolute inset-0 m-auto w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 brightness-0 invert' />
							</div>
							<h4 className='font-bold text-[#02254A] text-sm sm:text-base md:text-lg'>Confianza</h4>
							<p className='text-xs text-slate-600 mt-1'>Confianza que se siente en cada cambio</p>
						</div>

						{/* SEGURIDAD */}
						<div className='bg-[#02254A] text-white rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 shadow'>
							<div className='relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 mb-2 md:mb-3'>
								<div className='absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)]'></div>
								<img src='/icons/security.png' alt='seguridad' className='absolute inset-0 m-auto w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 brightness-0 invert' />
							</div>
							<h4 className='font-bold text-sm sm:text-base md:text-lg'>Seguridad</h4>
							<p className='text-xs mt-1'>Respaldados por SBS y SUNAT</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
