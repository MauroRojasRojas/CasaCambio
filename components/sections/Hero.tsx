'use client';

import ConverterCard from '../ConverterCard';
import Image from 'next/image';

export default function Hero() {
	return (
		<section className='w-full flex flex-col justify-between items-center bg-[#02254A]'>
			{/* Parte superior */}
			<div className='w-full mx-auto pt-36 px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 4k:px-16 pb-0 shadow-md relative z-10 overflow-hidden'>
				<div className='max-w-[1440px] mx-auto'>
					{/* 3 BLOQUES: TEXTO | IMAGEN | CARD */}
					<div className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-4 md:pt-6 lg:pt-8'>

						{/* BLOQUE 1: TEXTO */}
						<div className='text-center lg:text-left pb-4 lg:pb-0 shrink lg:self-start md:pr-2 lg:pr-0 lg:mt-10 xl:mt-0 lg:mr-8 xl:mr-0'>
							<h1 className='text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl 4k:text-5xl font-bold tracking-wide leading-tight mb-4 lg:mb-6 xl:mb-10'>
								OPERACIONES DE <br /> CAMBIO
								<span className='text-[#FAB73D]'> 100% ONLINE</span> <br />
								AL MEJOR TIPO DE <br /> CAMBIO DEL <br /> MERCADO
							</h1>

							<ul className='space-y-3 xl:space-y-5 mt-4 lg:mt-5 xl:mt-8'>
								<li className='flex items-center gap-3 justify-center lg:justify-start'>
									<img src='/icons/protect.png' className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12' alt='Seguridad' />
									<span className='text-[#FAB73D] text-base lg:text-lg xl:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Seguridad</span>
								</li>
								<li className='flex items-center gap-3 justify-center lg:justify-start'>
									<img src='/icons/speedy.png' className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12' alt='Rapidez' />
									<span className='text-[#FAB73D] text-base lg:text-lg xl:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Rapidez</span>
								</li>
								<li className='flex items-center gap-3 justify-center lg:justify-start'>
									<img src='/icons/handshake.png' className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12' alt='Transparencia' />
									<span className='text-[#FAB73D] text-base lg:text-lg xl:text-xl font-bold tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]'>Transparencia</span>
								</li>
							</ul>
						</div>

						{/* BLOQUE 2: IMAGEN — flex-1, siempre pegada al fondo */}
						<div className='hidden lg:flex flex-1 items-end justify-center min-w-0 self-end'>
							<img
								src='/assets/womens.png'
								alt='Equipo Dollariza'
								className='h-[500px] md:min-w-[300px] min-w-64 lg:min-w-[530px] object-bottom block'
							/>
						</div>

						{/* BLOQUE 3: CARD */}
						<div className='w-full lg:w-auto lg:min-w-[300px] lg:max-w-[320px] xl:max-w-[400px] shrink-0 self-center lg:self-auto pb-4 lg:pb-6'>
							<ConverterCard />
						</div>

					</div>
				</div>
			</div>

			{/* ===== FRANJA TRANSFERENCIAS ===== */}
			<div className='w-full relative bg-[#f2f2f2] overflow-hidden'>
				<div className='absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(135deg,#f2f2f2_60%,#e9e9e9_60%)]' />

				<div className='relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 py-6 md:py-8'>

					<div className='flex flex-col md:flex-row items-center justify-between gap-2'>

						{/* BLOQUE IZQUIERDO */}
						<div className='flex flex-col items-center md:items-start gap-3'>
							<div className='flex items-center gap-3'>
								<span className='text-yellow-500 text-lg'>⚡</span>
								<span className='bg-white text-[#02254A] font-bold px-4 xl:px-6 py-2 rounded-lg text-xs xl:text-sm shadow-sm whitespace-nowrap'>
									TRANSFERENCIAS INMEDIATAS E INTERBANCARIAS
								</span>
							</div>
							<div className='flex justify-center w-full'>
								<div className='flex items-center gap-2 bg-white px-4 py-1 rounded-md shadow-sm text-[#02254A] text-sm font-medium'>
									<span>🕒</span>
									<span>DE 15 a 40 MINUTOS</span>
								</div>
							</div>
						</div>

						{/* LOGOS BANCOS */}
						<div className='flex items-center gap-5 lg:gap-6 xl:gap-10 bg-white px-5 lg:px-6 xl:px-8 py-4 rounded-xl shadow-sm'>
							<Image src='/assets/bcp.png' width={120} height={60} className='object-contain h-9 lg:h-10 xl:h-12 w-auto' alt='BCP' />
							<Image src='/assets/bbva.png' width={120} height={60} className='object-contain h-9 lg:h-10 xl:h-12 w-auto' alt='BBVA' />
							<Image src='/assets/pichincha.svg' width={120} height={60} className='object-contain h-9 lg:h-10 xl:h-12 w-auto' alt='Pichincha' />
						</div>

					</div>

				</div>
			</div>
		</section>
	);
}