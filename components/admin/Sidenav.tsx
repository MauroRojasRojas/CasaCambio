'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidenavProps {
	isMenuOpen: boolean;
	setIsMenuOpen: (open: boolean) => void;
}

export default function Sidenav({ isMenuOpen, setIsMenuOpen }: SidenavProps) {
	const pathname = usePathname();
	return (
		<aside
			className={`
            w-72 bg-white h-[calc(100vh-64px)] shadow-lg border-r border-slate-200 
            flex flex-col justify-between overflow-y-auto
            ${isMenuOpen ? 'fixed left-0 top-16 z-50 md:relative md:top-0' : 'hidden md:flex'}
        `}
		>
			<div>
				{/* CAJITA BRAND — ESTILO AHORRO */}
				<div className='bg-[#ffdf6d] w-full p-4 border-b border-slate-200'>
					{/* FILA: ICONO + DOLLARIZA */}
					<div className='flex items-center gap-3'>
						{/* ICONO REDONDO DEGRADADO */}
						<div className='relative w-[50px] h-[50px]'>
							<div className='absolute inset-0 rounded-full bg-[linear-gradient(145deg,#c1122f,#02254A)] opacity-95'></div>
							<img src='/icons/change.png' alt='logo' className='absolute inset-0 m-auto w-[44] h-[44]' />
						</div>

						{/* TEXTO PRINCIPAL */}
						<h1 className='text-2xl font-extrabold tracking-tight text-[#02254A] leading-tight'>Dollariza</h1>
					</div>

					{/* SUBTÍTULO */}
					<p className='text-[14px] text-slate-800 mt-4 leading-tight'>Plataforma segura de cambio online</p>
				</div>

				{/* MENU */}
				<nav className='px-4 mt-2 text-[15px] font-semibold flex flex-col gap-2'>
					{/* NUEVA OPERACIÓN */}
					<Link href='/admin/operacion'>
						<button
							className={`
                            flex items-center w-full px-4 py-3 rounded-xl
                            transition-all cursor-pointer gap-3 font-semibold
                            ${pathname === '/admin/operacion' ? 'bg-blue-100 text-[#0053A4]' : 'hover:bg-[#F5F7FF] hover:text-[#0053A4] text-[#02254A]'}
                        `}
							onClick={() => setIsMenuOpen(false)}
						>
							<div className='w-6 flex justify-center'>
								<img src='/icons/plus.png' alt='plus' />
							</div>
							<span className='text-sm font-semibold'>Nueva operación</span>
						</button>
					</Link>

					{/* HISTORIAL */}
					<Link href='/admin/historial'>
						<button
							className={`
                            flex items-center w-full px-4 py-3 rounded-xl
                            transition-all cursor-pointer gap-3 font-semibold
                            ${pathname === '/admin/historial' ? 'bg-blue-100 text-[#0053A4]' : 'hover:bg-[#F5F7FF] hover:text-[#0053A4] text-[#02254A]'}
                        `}
							onClick={() => setIsMenuOpen(false)}
						>
							<div className='w-6 flex justify-center'>
								<img src='/icons/historial.png' alt='historial' />
							</div>
							<span className='text-sm font-semibold'>Historial de operaciones</span>
						</button>
					</Link>

					{/* CUENTAS */}
					<Link href='/admin/cuentas'>
						<button
							className={`
                            flex items-center w-full px-4 py-3 rounded-xl
                            transition-all cursor-pointer gap-3 font-semibold
                            ${pathname === '/admin/cuentas' ? 'bg-blue-100 text-[#0053A4]' : 'hover:bg-[#F5F7FF] hover:text-[#0053A4] text-[#02254A]'}
                        `}
							onClick={() => setIsMenuOpen(false)}
						>
							<div className='w-6 flex justify-center'>
								<img src='/icons/cuenta.png' alt='cuentas' />
							</div>
							<span className='text-sm font-semibold'>Cuentas</span>
						</button>
					</Link>
				</nav>
			</div>

			{/* FOOTER MENU */}
			<div className='px-8 text-sm mb-8 text-[#02254A] space-y-8 border-t border-slate-200'>
				{/* Horario */}
				<div className='mt-4'>
					<p className='font-bold text-[14px]'>Horario de atención</p>
					<p className='text-slate-600 text-xs mt-1 leading-tight'>
						Lunes a Viernes: 8:30 am - 6:30 pm
						<br />
						Sábado: 9:00 am - 1:00 pm
					</p>
				</div>

				{/* Contacto */}
				<div>
					<p className='font-bold text-[14px]'>Contáctanos</p>
					<p className='text-slate-600 text-xs mt-1 leading-normal'>
						📞 956-767-180
						<br />
						📧 info.dollariza@gmail.com
					</p>
				</div>

				{/* SBS + SUNAT */}
				<div className='flex flex-col justify-center gap-4'>
					<img src='/icons/sbs.png' alt='sbs' className='h-10 w-auto object-contain' />
					<img src='/icons/sunat.png' alt='sunat' className='h-10 w-auto object-contain bg-amber-900 p-2 border border-slate-300 rounded-md' />
				</div>
			</div>
		</aside>
	);
}
