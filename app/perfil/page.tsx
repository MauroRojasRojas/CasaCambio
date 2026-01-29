'use client';

export default function Perfil() {
	return (
		<div className='flex flex-col gap-6'>
			<h1 className='text-3xl font-bold text-[#02254A]'>Mi perfil</h1>

			<div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
				<div className='flex items-center gap-4 mb-6'>
					<img src='/icons/user.png' alt='perfil' className='w-16 h-16' />
					<div>
						<h2 className='text-xl font-bold text-[#02254A]'>Diego Antonio Moscol</h2>
						<p className='text-slate-600 text-sm'>info.dollariza@gmail.com</p>
					</div>
				</div>

				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-semibold text-[#02254A] mb-2'>Email</label>
						<input
							type='email'
							className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0053A4]'
							defaultValue='diego@example.com'
						/>
					</div>
					<div>
						<label className='block text-sm font-semibold text-[#02254A] mb-2'>Teléfono</label>
						<input type='tel' className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0053A4]' defaultValue='956-767-180' />
					</div>
				</div>
			</div>
		</div>
	);
}
