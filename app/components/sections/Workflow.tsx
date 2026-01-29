import Image from 'next/image';

interface Step {
	number: number;
	icon: string;
	label: string;
	color: string;
	description: string;
}

const steps: Step[] = [
	{
		number: 1,
		icon: '/icons/user-check.svg',
		label: 'REGÍSTRATE',
		color: '#d3a34a',
		description: 'Crea tu cuenta en pocos minutos de forma rápida y segura. Ingresa tus datos y valida tu información para empezar a operar con total confianza.',
	},
	{
		number: 2,
		icon: '/icons/dollar-analysis.svg',
		label: 'COTIZA',
		color: '#1e3662',
		description:
			'Revisa el tipo de cambio en tiempo real y define el monto a cambiar. Sabrás exactamente cuánto recibirás, de manera transparente y sin costos ocultos.',
	},
	{
		number: 3,
		icon: '/icons/pay-money.svg',
		label: 'ABONA',
		color: '#d3a34a',
		description: 'Realiza el pago de forma simple y segura a través de los medios disponibles. Recibirás un correo cuando tu operación haya sido confirmada.',
	},
	{
		number: 4,
		icon: '/icons/receive-money.svg',
		label: 'RECIBE',
		color: '#1e3662',
		description: 'Recibe tu dinero directamente en tu cuenta bancaria en minutos, con total seguridad y sin complicaciones.',
	},
];

export default function Workflow() {
	return (
		<section
			className='relative py-12 md:py-16 lg:py-20 4k:py-24 px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 bg-cover bg-center'
			style={{ backgroundImage: "url('/assets/texture.png')" }}
		>
			{/* TÍTULO */}
			<h2 className='text-center text-2xl sm:text-3xl md:text-4xl 4k:text-5xl font-extrabold text-[#02254A] mb-8 md:mb-12 lg:mb-20'>
				REALIZA TU OPERACIÓN EN SOLO <span className='text-[#d3a34a]'>4 PASOS</span>
			</h2>

			{/* VERSIÓN DESKTOP - CIRCULAR */}
			<div className='hidden lg:block relative max-w-[900px] xl:max-w-[1100px] 4k:max-w-[1400px] mx-auto h-[650px] xl:h-[750px] 4k:h-[900px]'>
				{/* IMAGEN CENTRAL - Punto de referencia */}
				<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30'>
					<Image src='/assets/principal.png' alt='Operación' width={320} height={320} className='drop-shadow-[0_25px_40px_rgba(0,0,0,0.25)] w-56 xl:w-72 4k:w-80' />
				</div>

				{/* FLECHAS SVG CURVAS - Formando óvalo alrededor del centro */}
				<svg className='absolute inset-0 w-full h-full z-10 pointer-events-none' viewBox='0 0 100 100' preserveAspectRatio='none'>
					<defs>
						{/* Flecha más estilizada y compacta */}
						<marker id='arrowhead1' markerWidth='3' markerHeight='3' refX='1.5' refY='1.5' orient='auto'>
							<path d='M 0 0 L 3 1.5 L 0 3 Z' fill='#8b7b71' />
						</marker>
					</defs>
					{/* Flecha 1→2 (desde arriba hacia derecha) */}
					<path d='M 65 18 Q 72 22, 76 30' fill='none' stroke='#8b7b71' strokeWidth='1.8' strokeLinecap='round' markerEnd='url(#arrowhead1)' />
					{/* Flecha 2→3 (desde derecha hacia abajo) */}
					<path d='M 76 70 Q 72 78, 65 82' fill='none' stroke='#8b7b71' strokeWidth='1.8' strokeLinecap='round' markerEnd='url(#arrowhead1)' />
					{/* Flecha 3→4 (desde abajo hacia izquierda) */}
					<path d='M 35 82 Q 28 78, 24 70' fill='none' stroke='#8b7b71' strokeWidth='1.8' strokeLinecap='round' markerEnd='url(#arrowhead1)' />
					{/* Flecha 4→1 (desde izquierda hacia arriba) */}
					<path d='M 24 30 Q 28 22, 35 18' fill='none' stroke='#8b7b71' strokeWidth='1.8' strokeLinecap='round' markerEnd='url(#arrowhead1)' />
				</svg>

				{/* PASO 1 - REGÍSTRATE (ARRIBA - desde el centro) */}
				<div className='absolute left-1/2 top-[5%] -translate-x-1/2 z-20'>
					<div className='w-32 h-32 xl:w-40 xl:h-40 4k:w-48 4k:h-48 rounded-full bg-[#d3a34a] shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-0.5'>
						<span className='text-white text-xs xl:text-sm font-bold drop-shadow-md'>1</span>
						<Image src='/icons/user-check.svg' width={40} height={40} alt='Registrar' className='w-12 h-12 xl:w-14 xl:h-14 brightness-0 invert drop-shadow-md' />
						<p className='text-white font-bold tracking-wider text-[11px] xl:text-sm drop-shadow-md'>REGISTRATE</p>
					</div>
				</div>
				{/* Caja Paso 1 */}
				<div className='absolute top-[2%] right-[5%] xl:right-[8%] z-20 max-w-[180px] xl:max-w-[210px]'>
					<div className='bg-white/95 rounded-lg px-3 py-2 xl:px-4 xl:py-3 shadow-md text-[#02254A] text-[11px] xl:text-xs leading-relaxed font-medium'>
						Crea tu cuenta en pocos minutos de forma rápida y segura. Ingresa tus datos y valida tu información para empezar a operar con total confianza.
					</div>
				</div>

				{/* PASO 2 - COTIZA (DERECHA - desde el centro) */}
				<div className='absolute top-1/2 right-[5%] -translate-y-1/2 z-20'>
					<div className='w-32 h-32 xl:w-40 xl:h-40 4k:w-48 4k:h-48 rounded-full bg-[#1e3662] shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-0.5'>
						<span className='text-white text-xs xl:text-sm font-bold drop-shadow-md'>2</span>
						<Image src='/icons/dollar-analysis.svg' width={40} height={40} alt='Registrar' className='w-12 h-12 xl:w-14 xl:h-14 brightness-0 invert drop-shadow-md' />
						<p className='text-white font-bold tracking-wider text-[11px] xl:text-sm drop-shadow-md'>COTIZA</p>
					</div>
				</div>
				{/* Caja Paso 2 */}
				<div className='absolute top-[72%] right-[2%] xl:right-[5%] z-20 max-w-[180px] xl:max-w-[210px]'>
					<div className='bg-white/95 rounded-lg px-3 py-2 xl:px-4 xl:py-3 shadow-md text-[#02254A] text-[11px] xl:text-xs leading-relaxed font-medium'>
						Revisa el tipo de cambio en tiempo real y define el monto a cambiar. Sabrás exactamente cuánto recibirás, de manera transparente y sin costos ocultos.
					</div>
				</div>

				{/* PASO 3 - ABONA (ABAJO - desde el centro) */}
				<div className='absolute left-1/2 bottom-[5%] -translate-x-1/2 z-20'>
					<div className='w-32 h-32 xl:w-40 xl:h-40 4k:w-48 4k:h-48 rounded-full bg-[#d3a34a] shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-0.5'>
						<span className='text-white text-xs xl:text-sm font-bold drop-shadow-md'>3</span>
						<Image src='/icons/pay-money.svg' width={40} height={40} alt='Registrar' className='w-12 h-12 xl:w-14 xl:h-14 brightness-0 invert drop-shadow-md' />
						<p className='text-white font-bold tracking-wider text-[11px] xl:text-sm drop-shadow-md'>ABONA</p>
					</div>
				</div>
				{/* Caja Paso 3 */}
				<div className='absolute bottom-[2%] left-[2%] xl:left-[5%] z-20 max-w-[180px] xl:max-w-[210px]'>
					<div className='bg-white/95 rounded-lg px-3 py-2 xl:px-4 xl:py-3 shadow-md text-[#02254A] text-[11px] xl:text-xs leading-relaxed font-medium'>
						Realiza el pago de forma simple y segura a través de los medios disponibles. Recibirás un correo cuando tu operación haya sido confirmada.
					</div>
				</div>

				{/* PASO 4 - RECIBE (IZQUIERDA - desde el centro) */}
				<div className='absolute top-1/2 left-[5%] -translate-y-1/2 z-20'>
					<div className='w-32 h-32 xl:w-40 xl:h-40 4k:w-48 4k:h-48 rounded-full bg-[#1e3662] shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-0.5'>
						<span className='text-white text-xs xl:text-sm font-bold drop-shadow-md'>4</span>
						<Image src='/icons/receive-money.svg' width={40} height={40} alt='Registrar' className='w-12 h-12 xl:w-14 xl:h-14 brightness-0 invert drop-shadow-md' />
						<p className='text-white font-bold tracking-wider text-[11px] xl:text-sm drop-shadow-md'>RECIBE</p>
					</div>
				</div>
				{/* Caja Paso 4 */}
				<div className='absolute top-[12%] left-[2%] xl:left-[5%] z-20 max-w-[180px] xl:max-w-[210px]'>
					<div className='bg-white/95 rounded-lg px-3 py-2 xl:px-4 xl:py-3 shadow-md text-[#02254A] text-[11px] xl:text-xs leading-relaxed font-medium'>
						Recibe tu dinero directamente en tu cuenta bancaria en minutos, con total seguridad y sin complicaciones.
					</div>
				</div>
			</div>

			{/* VERSIÓN MOBILE & TABLET - VERTICAL */}
			<div className='lg:hidden max-w-[1800px] mx-auto'>
				<div className='flex flex-col gap-6 sm:gap-8 md:gap-10'>
					{steps.map((step, index) => (
						<div key={step.number} className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center'>
							{/* Círculo del paso */}
							<div className='flex-shrink-0'>
								<div
									className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full shadow-xl flex flex-col items-center justify-center gap-1 sm:gap-2'
									style={{ backgroundColor: step.color }}
								>
									<span className='text-white text-xl sm:text-2xl md:text-3xl font-extrabold'>{step.number}</span>
									<Image src={step.icon} width={40} height={40} alt={step.label} className='w-8 h-8 brightness-0 invert drop-shadow-md' />
									<p className='text-white font-extrabold tracking-wide text-[10px] sm:text-xs md:text-sm text-center px-2'>{step.label}</p>
								</div>
							</div>

							{/* Descripción */}
							<div className='flex-grow w-full sm:w-auto'>
								<div className='bg-white/95 rounded-md px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 shadow-md'>
									<p className='text-[#02254A] text-xs sm:text-sm md:text-base leading-relaxed'>{step.description}</p>
								</div>
							</div>

							{/* Flecha entre pasos */}
							{index < steps.length - 1 && (
								<div className='sm:hidden w-full flex justify-center py-2'>
									<svg className='w-5 h-5 sm:w-6 sm:h-6 text-[#d3a34a]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
									</svg>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Imagen central - Solo en tablet */}
				<div className='hidden sm:flex justify-center mt-8 md:mt-12'>
					<Image src='/assets/principal.png' alt='Operación' width={280} height={280} className='drop-shadow-[0_25px_40px_rgba(0,0,0,0.25)] w-48 sm:w-56 md:w-72' />
				</div>
			</div>
		</section>
	);
}
