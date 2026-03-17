'use client';

import Image from 'next/image';

const benefits = [
	{
		title: 'Ahorro',
		description: 'Tipo de cambio competitivo',
		bg: '#27608B',
		text: 'text-white',
		iconBg: 'bg-[#F0EFEA]',
		icon: '/icons/saving.png',
		iconClass: '',
	},
	{
		title: 'Rapidez',
		description: 'Transferencias entre\n15 y 40 min',
		bg: '#F0C10A',
		text: 'text-[#092B47]',
		iconBg: 'bg-[#092B47]',
		icon: '/icons/speed.png',
		iconClass: 'brightness-0 invert',
	},
	{
		title: 'Confianza',
		description: 'Confianza que se siente\nen cada operación',
		bg: '#F0EFEA',
		text: 'text-[#092B47]',
		iconBg: 'bg-[#092B47]',
		icon: '/icons/trust.png',
		iconClass: 'brightness-0 invert',
	},
	{
		title: 'Seguridad',
		description: 'Inscritos en la SBS',
		bg: '#092B47',
		text: 'text-white',
		iconBg: 'bg-[#F0EFEA]',
		icon: '/icons/security.png',
		iconClass: '',
	},
];

export default function Benefits() {
	return (
		<section
			className='w-full bg-cover bg-center bg-no-repeat'
			style={{ backgroundImage: "url('/assets/parte3.png')" }}
		>
			<div className='w-full bg-white/35'>
				<div className='max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-14 md:py-16 lg:py-20'>
					<div className='flex flex-col items-center text-center'>
						<h2
							className='text-[#032C67] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_3px_3px_rgba(0,0,0,0.12)]'
						>
							¿Por qué Elegirnos?
						</h2>

						<div className='mt-4 md:mt-5 bg-white/90 rounded-xl px-5 md:px-7 py-2 md:py-3 shadow-sm'>
							<p className='text-[#1C4381] text-lg sm:text-xl md:text-[22px] font-medium'>
								Hacemos que tu dinero rinda más en cada cambio
							</p>
						</div>
					</div>

					<div className='mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 lg:gap-8 justify-items-center'>
						{benefits.map((item) => (
							<div
								key={item.title}
								className='w-[180px] sm:w-[185px] md:w-[220px] min-h-[228px] md:min-h-60 rounded-[28px] shadow-[0_10px_24px_rgba(0,0,0,0.12)] px-5 py-6 md:px-6 md:py-7 flex flex-col items-center text-center'
								style={{ backgroundColor: item.bg }}
							>
								<div
									className={`w-[74px] h-[74px] md:w-[78px] md:h-[78px] rounded-full flex items-center justify-center shadow-sm ${item.iconBg}`}
								>
									<Image
										src={item.icon}
										alt={item.title}
										width={38}
										height={38}
										className={`object-contain w-[34px] h-[34px] md:w-[38px] md:h-[38px] ${item.iconClass}`}
									/>
								</div>

								<h3 className={`mt-6 text-2xl md:text-[22px] font-extrabold leading-none ${item.text}`}>
									{item.title}
								</h3>

								<p
									className={`mt-4 text-base md:text-[17px] leading-snug whitespace-pre-line ${
										item.title === 'Ahorro' || item.title === 'Seguridad'
											? item.text
											: 'text-[#1C2C3E]'
									}`}
								>
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}