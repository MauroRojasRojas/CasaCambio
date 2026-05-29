'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface SidenavProps {
	isMenuOpen: boolean;
	setIsMenuOpen: (open: boolean) => void;
}

function NavItem({
	href,
	label,
	icon,
	imgSrc,
	pathname,
	onClick,
}: {
	href: string;
	label: string;
	icon?: string;
	imgSrc?: string;
	pathname: string;
	onClick: () => void;
}) {
	const isActive = pathname === href;
	return (
		<Link href={href}>
			<button
				className={`flex items-center w-full px-4 py-3 rounded-xl transition-all cursor-pointer gap-3 font-semibold text-sm ${
					isActive ? 'bg-blue-100 text-[#0053A4]' : 'hover:bg-[#F5F7FF] hover:text-[#0053A4] text-[#02254A]'
				}`}
				onClick={onClick}
			>
				<div className='w-6 flex justify-center'>
					{imgSrc ? (
						<img src={imgSrc} alt={label} />
					) : (
						<i className={`${icon} text-[#02254A] text-lg`} />
					)}
				</div>
				<span className='font-semibold'>{label}</span>
			</button>
		</Link>
	);
}

export default function Sidenav({ isMenuOpen, setIsMenuOpen }: SidenavProps) {
	const pathname = usePathname();
	const { user } = useAuth();

	const close = () => setIsMenuOpen(false);

	return (
		<aside
			className={`w-72 bg-white h-[calc(100vh-64px)] shadow-lg border-r border-slate-200 flex flex-col justify-between overflow-y-auto ${
				isMenuOpen ? 'fixed left-0 top-16 z-50 md:relative md:top-0' : 'hidden md:flex'
			}`}
		>
			<div>
				{/* LOGO */}
				<div className='relative w-full h-[140px] border-b border-slate-200 bg-white overflow-visible'>
					<img
						src='/icons/logogo.png'
						alt='Dollariza'
						className='absolute left-1/2 top-2/5 h-40 w-auto -translate-x-1/2 -translate-y-1/2 object-contain'
					/>
				</div>

				{/* MENU */}
				<nav className='px-4 mt-2 text-[15px] font-semibold flex flex-col gap-2'>

					<NavItem href='/admin/operacion' label='Nueva operación' imgSrc='/icons/plus.png' pathname={pathname} onClick={close} />
					<NavItem href='/admin/historial' label='Historial de operaciones' imgSrc='/icons/historial.png' pathname={pathname} onClick={close} />
					<NavItem href='/admin/cuentas' label='Cuentas' imgSrc='/icons/cuenta.png' pathname={pathname} onClick={close} />

					{user?.rol === 'ADMIN' && (
						<NavItem href='/admin/config-tasas' label='Configurar tasas' icon='pi pi-percentage' pathname={pathname} onClick={close} />
					)}
					{user?.rol === 'ADMIN' && (
						<NavItem href='/admin/ver-operaciones' label='Ver operaciones' icon='pi pi-list' pathname={pathname} onClick={close} />
					)}
					{user?.rol === 'ADMIN' && (
						<NavItem href='/admin/comentarios' label='Testimonios' icon='pi pi-comment' pathname={pathname} onClick={close} />
					)}
					{user?.rol === 'ADMIN' && (
						<NavItem href='/admin/cuentas-internas' label='Cuentas internas' icon='pi pi-building' pathname={pathname} onClick={close} />
					)}
					{user?.rol === 'ADMIN' && (
						<NavItem href='/admin/noticias' label='Noticias' icon='pi pi-megaphone' pathname={pathname} onClick={close} />
					)}
					{user?.rol === 'ADMIN' && (
						<NavItem href='/admin/empresas-aliadas' label='Empresas aliadas' icon='pi pi-sitemap' pathname={pathname} onClick={close} />
					)}
					{user?.rol === 'ADMIN' && (
						<NavItem href='/admin/redes-sociales' label='Redes sociales' icon='pi pi-share-alt' pathname={pathname} onClick={close} />
					)}
					{user?.rol === 'ADMIN' && (
						<NavItem href='/admin/bancos' label='Bancos' icon='pi pi-building-columns' pathname={pathname} onClick={close} />
					)}

				</nav>
			</div>

			{/* FOOTER */}
			<div className='px-8 text-sm mb-8 text-[#02254A] space-y-8 border-t border-slate-200'>
				<div className='mt-4'>
					<p className='font-bold text-[14px]'>Horario de atención</p>
					<p className='text-slate-600 text-xs mt-1 leading-tight'>
						Lunes a Viernes: 8:30 am - 6:30 pm
						<br />
						Sábado: 9:00 am - 1:00 pm
					</p>
				</div>
				<div>
					<p className='font-bold text-[14px]'>Contáctanos</p>
					<p className='text-slate-600 text-xs mt-1 leading-normal'>
						📞 956-767-180
						<br />
						📧 info.dollariza@gmail.com
					</p>
				</div>
				<div className='flex flex-col justify-center gap-4'>
					<img src='/icons/sbs.png' alt='sbs' className='h-10 w-auto object-contain' />
					<img src='/icons/sunat.png' alt='sunat' className='h-10 w-auto object-contain bg-amber-900 p-2 border border-slate-300 rounded-md' />
				</div>
			</div>
		</aside>
	);
}
