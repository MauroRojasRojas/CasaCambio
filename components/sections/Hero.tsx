'use client';

import ConverterCard from '../ConverterCard';
import Image from 'next/image';

export default function Hero() {
	return (
		<section className='w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#02254A]'>
			{/* Parte superior del corte */}
			<div className='w-full mx-auto pt-26 sm:pt-20 md:pt-30 lg:pt-30 px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 pb-0 shadow-md relative z-10'>
				<div className='max-w-[1800px] mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10'>
						{/* IZQUIERDA - Columna 8 */}
						<div className='lg:col-span-8 flex flex-col lg:flex-row items-center lg:items-end gap-4 lg:gap-0 pt-4 md:pt-6 lg:pt-8'>
							{/* ===== TEXTO ===== */}
							<div className='shrink-0 text-center lg:text-left lg:pb-8 pb-4'>
								<h1 className='text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl 4k:text-5xl font-bold tracking-wide drop-shadow-[6px_6px_0_rgba(0,0,0,0.35)] leading-tight mb-6 md:mb-10'>
									OPERACIONES DE <br /> CAMBIO
									<span className='text-[#FAB73D]'> 100% ONLINE</span> <br />
									CON EL MEJOR TIPO DE <br /> CAMBIO DEL MERCADO
								</h1>

								<ul className='space-y-3 sm:space-y-4 md:space-y-5 mt-6 md:mt-8'>
									<li className='flex items-center gap-3 md:gap-4 justify-center lg:justify-start'>
										<img src='/icons/protect.png' className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' alt='Seguridad' />
										<span className='text-[#FAB73D] text-base sm:text-lg md:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Seguridad</span>
									</li>

									<li className='flex items-center gap-3 md:gap-4 justify-center lg:justify-start'>
										<img src='/icons/speedy.png' className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' alt='Rapidez' />
										<span className='text-[#FAB73D] text-base sm:text-lg md:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Rapidez</span>
									</li>

									<li className='flex items-center gap-3 md:gap-4 justify-center lg:justify-start'>
										<img src='/icons/handshake.png' className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' alt='Transparencia' />
										<span className='text-[#FAB73D] text-base sm:text-lg md:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Transparencia</span>
									</li>
								</ul>
							</div>

							
							<div className='shrink-0 hidden lg:flex -ml-10 items-end'>
								<img src='/assets/womens.png' alt='Equipo Dollariza' className='h-80 lg:h-[400px] 4k:h-[500px] block' />
							</div>
						</div>

						{/* DERECHA - Columna 4 */}
						<div className='lg:col-span-4 flex items-center justify-center'>
							<div className='p-4'>
								<ConverterCard />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ===== FRANJA TRANSFERENCIAS ===== */}
			<div className='w-full relative bg-[#f2f2f2] overflow-hidden'>
				<div className='absolute inset-0 bg-[linear-gradient(135deg,#f2f2f2_60%,#e9e9e9_60%)]' />

				<div className='relative max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 py-2 md:py-4 lg:py-6'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
						{/* LABEL */}
						<div className='flex justify-center md:justify-start items-center'>
							<span className='inline-block bg-white text-[#02254A] font-bold px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm shadow-sm text-center'>TRANSFERENCIAS INMEDIATAS E INTERBANCARIAS</span>
						</div>

						{/* TIEMPO */}
						<div className='flex justify-center'>
							<div className='flex items-center gap-2 sm:gap-3 text-[#02254A] text-xs sm:text-sm font-medium'>
								<span className='text-base sm:text-lg'>🕒</span>
								<span>DE 15 A 55 MINUTOS</span>
							</div>
						</div>

						{/* LOGOS */}
						<div className='flex justify-center md:justify-end gap-4 sm:gap-6 lg:gap-8'>
							<Image src='/assets/bcp.png' width={72} height={72} className='object-contain w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px]' alt='BCP' />
							<Image src='/assets/bbva.png' width={72} height={72} className='object-contain w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px]' alt='BBVA' />
							<Image src='/assets/pichincha.svg' width={72} height={72} className='object-contain rounded-2xl w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px]' alt='Pichincha' />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
