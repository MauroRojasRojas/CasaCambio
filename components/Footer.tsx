'use client';

import { useState } from 'react';
import TermsPrivacyModals from './TermsPrivacyModals';

export default function Footer() {
	const [showTermsModal, setShowTermsModal] = useState(false);
	const [showPrivacyModal, setShowPrivacyModal] = useState(false);

	return (
		<>
			<TermsPrivacyModals
				showTermsModal={showTermsModal}
				setShowTermsModal={setShowTermsModal}
				showPrivacyModal={showPrivacyModal}
				setShowPrivacyModal={setShowPrivacyModal}
			/>

			<footer className='bg-[#02254A] text-white py-8 md:py-10 lg:py-12'>
				<div className='max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10'>
					{/* --- Columna 1: Marca --- */}
					<div>
						<h2 className='text-xl md:text-2xl font-bold mb-2 md:mb-3'>Ayuda</h2>
						<ul className='space-y-1.5 md:space-y-2 text-gray-300 text-xs sm:text-sm'>
							<li>
								<button onClick={() => setShowPrivacyModal(true)} className='hover:text-white transition cursor-pointer'>
									Política de privacidad
								</button>
							</li>
							<li>
								<button onClick={() => setShowTermsModal(true)} className='hover:text-white transition cursor-pointer'>
									Términos y condiciones
								</button>
							</li>
							<li>
								<a href='/reclamos' className='hover:text-white transition cursor-pointer'>
									Libro de reclamaciones
								</a>
							</li>
						</ul>
					</div>

					{/* --- Columna 2: Navegación --- */}
					<div>
						<h3 className='text-base md:text-lg font-semibold mb-2 md:mb-3'>Enlaces</h3>
						<ul className='space-y-1.5 md:space-y-2 text-gray-300 text-xs sm:text-sm'>
							<li>
								<a href='/' className='hover:text-white transition'>
									Inicio
								</a>
							</li>
							<li>
								<a href='/quienes-somos' className='hover:text-white transition'>
									Quiénes somos
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-white transition'>
									Preguntas frecuentes
								</a>
							</li>
						</ul>
					</div>

					{/* --- Columna 3: Contacto --- */}
					<div>
						<h3 className='text-base md:text-lg font-semibold mb-2 md:mb-3'>Contáctanos</h3>
						<ul className='space-y-1.5 md:space-y-2 text-gray-300 text-xs sm:text-sm'>
							<li>
								<span className='font-medium'>Teléfono:</span> 956-767-180
							</li>
							<li>
								<span className='font-medium'>Correo:</span> info.dollariza@gmail.com
							</li>
						</ul>
					</div>
				</div>

				{/* --- línea inferior --- */}
				<div className='border-t border-[#ffffff33] mt-8 md:mt-12 pt-4 md:pt-6 text-center text-gray-400 text-xs sm:text-sm'>
					© {new Date().getFullYear()} Dollariza — Todos los derechos reservados - Powered by Arcanight.
				</div>
			</footer>
		</>
	);
}
