'use client';

import Image from 'next/image';

export default function WhoWeAre() {
	return (
		<section className='bg-white pt-24 md:pt-28 lg:pt-32 pb-10'>
			<div className='max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12'>
				{/* Título principal */}
				<div className='text-center mb-8 md:mb-10'>
					<h1 className='text-[38px] md:text-[46px] font-extrabold text-[#0A2E5C] leading-none tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.08)]'>
						¿Quiénes Somos?
					</h1>

					<p className='mt-5 max-w-[820px] mx-auto text-[16px] md:text-[18px] leading-[1.15] text-[#243B63]'>
						M&amp;M Divisas es una empresa dedicada a ofrecer servicios de cambio de moneda 100% online.
						<br />
						Nuestro compromiso es brindar a nuestros clientes los tipos de cambio más competitivos y una
						<br />
						atención de alta calidad, asegurando operaciones seguras, ágiles y confiables.
					</p>
				</div>

				{/* Contenido */}
				<div className='grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-start'>
					{/* Columna izquierda */}
					<div className='text-[#1F355B]'>
						<div className='mb-7'>
							<h2 className='text-[28px] md:text-[32px] font-extrabold text-[#18345F] mb-4'>
								Ventaja Competitiva
							</h2>

							<ul className='list-disc pl-6 text-[16px] md:text-[17px] leading-[1.15] space-y-1'>
								<li>Te ofrecemos el mejor tipo de cambio del mercado</li>
								<li>Apuntamos a ser el aliado confiable en el cambio de divisas</li>
								<li>Realizamos transferencias seguras y rápidas</li>
								<li>Atención profesional y personalizada</li>
								<li>Atendemos a personas naturales, negocios, pequeñas y medianas empresas</li>
							</ul>
						</div>

						<div className='mb-7'>
							<h2 className='text-[28px] md:text-[32px] font-extrabold text-[#18345F] mb-3'>
								Supervisión
							</h2>

							<p className='text-[16px] md:text-[17px] leading-[1.12] max-w-[720px]'>
								Estamos autorizados a operar por la Superintendencia de Banca y Seguros (SBS).
							</p>

							<p className='mt-3 text-[16px] md:text-[17px] leading-[1.12] max-w-[760px]'>
								Cumplimos estrictamente la normativa vigente aplicable a empresas que brindan servicios de
								cambio de moneda.
							</p>
						</div>

						<div>
							<h2 className='text-[28px] md:text-[32px] font-extrabold text-[#18345F] mb-3'>
								Horario de Atención
							</h2>

							<div className='text-[16px] md:text-[17px] leading-[1.12]'>
								<p>Lunes a viernes: 8:30 a.m. a 6:00 p.m.</p>
								<p className='mt-1'>Sábados: 9:00 a.m. a 1:00 p.m.</p>
								<p className='mt-1'>Teléfono: 956 767 180</p>
								<p className='mt-1'>Correo: info.dollariza@gmail.com</p>
							</div>
						</div>
					</div>

					{/* Columna derecha */}
					<div className='flex justify-center lg:justify-end pt-2 md:pt-4 lg:pt-8'>
						<div className='w-full max-w-[420px]'>
							<Image
								src='/assets/quienessomos.png'
								alt='Equipo Dollariza'
								width={420}
								height={520}
								className='w-full h-auto object-contain'
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}