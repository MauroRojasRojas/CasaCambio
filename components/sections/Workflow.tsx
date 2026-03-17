'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const steps = [
	{
		number: 1,
		title: 'Regístrate',
		description: 'Crea tu cuenta en minutos y valida tus datos.',
		icon: '/icons/user-check.svg',
		width: 'lg:w-[24%]',
	},
	{
		number: 2,
		title: 'Cotiza tu cambio',
		description: 'Consulta el tipo de cambio en tiempo real y define el monto.',
		icon: '/icons/dollar-analysis.svg',
		width: 'lg:w-[28%]',
	},
	{
		number: 3,
		title: 'Realiza la transferencia',
		description: 'Transfiere el dinero usando los medios disponibles.',
		icon: '/icons/pay-money.svg',
		width: 'lg:w-[28%]',
	},
	{
		number: 4,
		title: 'Recibe tu dinero',
		description: 'Depósito directo a tu cuenta bancaria en minutos.',
		icon: '/icons/receive-money.svg',
		width: 'lg:w-[24%]',
	},
];

export default function Workflow() {
	const router = useRouter();

	const goRegister = () => {
		router.push('/registro');
	};

	return (
		<section
			className='relative w-full bg-cover bg-center bg-no-repeat py-14 md:py-16 lg:py-20'
			style={{ backgroundImage: "url('/assets/parte2.jpg')" }}
		>
			<div className='absolute inset-0 bg-white/10' />

			<div className='relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 md:px-8 lg:px-10'>
				<div className='text-center'>
					<h2 className='text-4xl font-extrabold leading-none text-[#01307B] drop-shadow-[0_2px_2px_rgba(0,0,0,0.10)] sm:text-5xl md:text-6xl lg:text-[64px]'>
						Cambia tu dinero
					</h2>
					<p className='mt-2 text-3xl font-medium leading-none text-[#1E2433] sm:text-4xl md:text-5xl lg:text-[54px]'>
						en 4 simples pasos
					</p>
				</div>

				<div className='mt-14 hidden lg:block'>
					<div className='relative'>
						<div className='absolute left-[9%] right-[9%] top-[22px] h-1 bg-[#2A57B8]' />

						<div className='absolute left-1/2 top-[15px] h-4 w-4 -translate-x-1/2 rounded-full bg-[#F2B500]' />

						<div className='absolute left-[6%] top-0 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#F2B500] text-[24px] font-extrabold text-white shadow-md'>
							1
						</div>
						<div className='absolute left-[30%] top-0 flex h-[54px] w-[54px] -translate-x-1/2 items-center justify-center rounded-full bg-[#F2B500] text-[24px] font-extrabold text-white shadow-md'>
							2
						</div>
						<div className='absolute left-[65%] top-0 flex h-[54px] w-[54px] -translate-x-1/2 items-center justify-center rounded-full bg-[#F2B500] text-[24px] font-extrabold text-white shadow-md'>
							3
						</div>
						<div className='absolute right-[6%] top-0 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#F2B500] text-[24px] font-extrabold text-white shadow-md'>
							4
						</div>

						<div className='pt-7'>
							<div className='flex overflow-hidden rounded-[18px] bg-white/95 shadow-[0_10px_24px_rgba(0,0,0,0.14)] min-h-80'>
								{steps.map((step, index) => (
									<div
										key={step.number}
										className={`
											${step.width}
											flex flex-col items-center px-6 pb-9 pt-10 text-center
											${index !== steps.length - 1 ? 'border-r border-slate-200' : ''}
										`}
									>
										<h3 className='min-h-[62px] text-[28px] font-extrabold leading-[1.05] text-[#01307B]'>
											{step.title}
										</h3>

										<p
											className='mt-4 text-[18px] leading-[1.45] text-[#313847]'
											style={{ maxWidth: 240, minHeight: 108 }}
										>
											{step.description}
										</p>

										<div className='mt-5 flex h-[122px] w-[122px] items-center justify-center rounded-full bg-[#0456B8] shadow-[0_10px_18px_rgba(0,0,0,0.18)]'>
											<Image
												src={step.icon}
												alt={step.title}
												width={66}
												height={66}
												className='h-[62px] w-[62px] object-contain brightness-0 invert'
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className='mt-7 flex justify-center'>
							<button
								onClick={goRegister}
								className='h-[58px] rounded-full px-10 text-[26px] font-extrabold text-white cursor-pointer'
								style={{
									minWidth: 300,
									background: 'linear-gradient(180deg, #0A67D0 0%, #01307B 100%)',
									boxShadow: '0 12px 22px rgba(1,48,123,0.28)',
								}}
							>
								Empieza ahora
							</button>
						</div>
					</div>
				</div>

				<div className='mt-12 lg:hidden'>
					<div className='space-y-5'>
						{steps.map((step) => (
							<div
								key={step.number}
								className='rounded-[18px] bg-white/95 p-5 shadow-[0_8px_20px_rgba(0,0,0,0.12)]'
							>
								<div className='flex items-start gap-4'>
									<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F2B500] text-xl font-extrabold text-white shadow-sm'>
										{step.number}
									</div>

									<div className='flex-1'>
										<h3 className='text-2xl font-extrabold leading-tight text-[#01307B]'>
											{step.title}
										</h3>
										<p className='mt-2 text-base leading-relaxed text-[#313847]'>
											{step.description}
										</p>
									</div>

									<div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#0456B8] shadow-md'>
										<Image
											src={step.icon}
											alt={step.title}
											width={34}
											height={34}
											className='h-8 w-8 object-contain brightness-0 invert'
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='mt-8 flex justify-center'>
						<button
							onClick={goRegister}
							className='h-[52px] w-60 rounded-full text-2xl font-extrabold text-white cursor-pointer'
							style={{
								background: 'linear-gradient(180deg, #0A67D0 0%, #01307B 100%)',
								boxShadow: '0 12px 22px rgba(1,48,123,0.28)',
							}}
						>
							Empieza ahora
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}