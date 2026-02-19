'use client';

import Image from 'next/image';

export default function WhoWeAre() {
	return (
		<section className='pt-30 sm:pt-26 md:pt-40 lg:pt-45 pb-15 bg-white'>
			<div className='max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16'>
				<div className='text-center mb-12 md:mb-16'>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#02254A] mb-4'>¿Quiénes Somos?</h1>
					<p className='text-lg md:text-xl text-slate-600 max-w-3xl mx-auto'>Conoce a M&M DIVISAS SRL, tu aliado confiable en el cambio de divisas en Perú.</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center'>
					{/* Texto */}
					<div className='space-y-6'>
						<div>
							<h2 className='text-2xl md:text-3xl font-bold text-[#02254A] mb-4'>Nuestra Historia</h2>
							<p className='text-slate-700 leading-relaxed'>
								M&M DIVISAS SRL es una empresa dedicada a ofrecer servicios de compra y venta de moneda extranjera de manera transparente y segura. Con RUC 20614994364,
								operamos desde nuestra sede en Av. Producción Nacional N°185, Urb. La Villa – Chorrillos, Lima, Perú.
							</p>
						</div>

						<div>
							<h2 className='text-2xl md:text-3xl font-bold text-[#02254A] mb-4'>Supervisión y Compromiso</h2>
							<p className='text-slate-700 leading-relaxed'>
								Estamos supervisados por la Superintendencia de Banca, Seguros y AFP (SBS), cumpliendo estrictamente con la normativa vigente aplicable a empresas del
								sistema de servicios de cambio de moneda. Nuestro compromiso es brindar un servicio de calidad, con tipos de cambio competitivos y actualizados según
								las variaciones del mercado.
							</p>
						</div>

						<div>
							<h2 className='text-2xl md:text-3xl font-bold text-[#02254A] mb-4'>Nuestros Servicios</h2>
							<ul className='text-slate-700 leading-relaxed space-y-2'>
								<li>• Compra y venta de dólares y otras monedas extranjeras</li>
								<li>• Transferencias seguras y rápidas</li>
								<li>• Atención personalizada y confidencial</li>
								<li>• Cumplimiento normativo para prevenir lavado de activos</li>
							</ul>
						</div>

						<div>
							<h2 className='text-2xl md:text-3xl font-bold text-[#02254A] mb-4'>Horario de Atención</h2>
							<p className='text-slate-700 leading-relaxed'>
								Lunes a viernes: 8:30 a.m. a 6:00 p.m.
								<br />
								Sábados: 9:00 a.m. a 1:00 p.m.
							</p>
						</div>
					</div>

					{/* Imagen o placeholder */}
					<div className='flex justify-center'>
						<div className='w-full max-w-md h-96 bg-linear-to-br from-[#a0c5eb] to-[#fafbfc] rounded-2xl flex items-center justify-center'>
							<div className='text-center'>
								<Image src='/icons/logomejorado.png' alt='Logo M&M DIVISAS' width={120} height={120} className='mx-auto mb-4' />
								<p className='text-xl font-semibold'>Cambio Seguro</p>
								<p className='text-sm opacity-90'>Tu dinero en buenas manos</p>
							</div>
						</div>
					</div>
				</div>

				{/* Valores o misión */}
				<div className='mt-16 md:mt-20'>
					<h2 className='text-2xl md:text-3xl font-bold text-[#02254A] text-center mb-8'>Nuestros Valores</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='text-center'>
							<i className='pi pi-shield text-4xl mb-4'></i>
							<h3 className='text-xl font-semibold text-[#02254A] mb-2'>Seguridad</h3>
							<p className='text-slate-600'>Protegemos tus datos y operaciones con los más altos estándares.</p>
						</div>
						<div className='text-center'>
							<i className='pi pi-bolt text-4xl mb-4'></i>
							<h3 className='text-xl font-semibold text-[#02254A] mb-2'>Rapidez</h3>
							<p className='text-slate-600'>Procesamos tus transacciones de manera eficiente y oportuna.</p>
						</div>
						<div className='text-center'>
							<i className='pi pi-heart text-4xl mb-4'></i>
							<h3 className='text-xl font-semibold text-[#02254A] mb-2'>Confianza</h3>
							<p className='text-slate-600'>Construimos relaciones duraderas basadas en la transparencia.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
