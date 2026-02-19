'use client';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export default function ContactUs() {
	return (
		<section className='pt-30 sm:pt-26 md:pt-40 lg:pt-45 pb-15 bg-gray-50'>
			<div className='max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16'>
				<div className='text-center mb-12 md:mb-16'>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#02254A] mb-4'>Contáctanos</h1>
					<p className='text-lg md:text-xl text-slate-600 max-w-3xl mx-auto'>
						Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta o solicitud.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16'>
					{/* Información de contacto */}
					<div className='space-y-8'>
						<div>
							<h2 className='text-2xl md:text-3xl font-bold text-[#02254A] mb-6'>Información de Contacto</h2>
							<div className='space-y-4'>
								<div className='flex items-start gap-4'>
									<i className='pi pi-map-marker text-2xl'></i>
									<div>
										<h3 className='font-semibold text-[#02254A]'>Dirección</h3>
										<p className='text-slate-700'>Av. Producción Nacional N°185, Urb. La Villa – Chorrillos, Lima, Perú</p>
									</div>
								</div>
								<div className='flex items-start gap-4'>
									<i className='pi pi-phone text-2xl'></i>
									<div>
										<h3 className='font-semibold text-[#02254A]'>Teléfono / WhatsApp</h3>
										<p className='text-slate-700'>956-767-180</p>
									</div>
								</div>
								<div className='flex items-start gap-4'>
									<i className='pi pi-envelope text-2xl'></i>
									<div>
										<h3 className='font-semibold text-[#02254A]'>Correo Electrónico</h3>
										<p className='text-slate-700'>info.dollariza@gmail.com</p>
									</div>
								</div>
								<div className='flex items-start gap-4'>
									<i className='pi pi-clock text-2xl'></i>
									<div>
										<h3 className='font-semibold text-[#02254A]'>Horario de Atención</h3>
										<p className='text-slate-700'>
											Lunes a viernes: 8:30 a.m. a 6:00 p.m.
											<br />
											Sábados: 9:00 a.m. a 1:00 p.m.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h3 className='text-xl font-bold text-[#02254A] mb-4'>¿Necesitas Ayuda?</h3>
							<p className='text-slate-700 mb-4'>
								Para consultas, solicitudes o reclamos, puedes comunicarte con nosotros a través de nuestros canales de atención. También puedes utilizar nuestro Libro
								de Reclamaciones virtual para registrar quejas o reclamos formales.
							</p>
							<a href='/reclamos' className='inline-block px-6 py-3 bg-[#0053A4] text-white font-semibold rounded-lg hover:bg-[#003f7c] transition-colors'>
								Libro de Reclamaciones
							</a>
						</div>
					</div>

					{/* Formulario de contacto o mapa */}
					<div className='bg-white p-8 rounded-2xl shadow-lg'>
						<h3 className='text-xl font-bold text-[#02254A] mb-6'>Envíanos un Mensaje</h3>
						<form className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>Nombre</label>
								<InputText
									className='w-full'
									placeholder='Tu nombre completo'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>Correo Electrónico</label>
								<InputText
									type='email'
									className='w-full'
									placeholder='tu@email.com'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>Asunto</label>
								<InputText
									className='w-full'
									placeholder='Asunto de tu mensaje'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>Mensaje</label>
								<InputTextarea
									rows={4}
									className='w-full'
									placeholder='Escribe tu mensaje aquí...'
								/>
							</div>
							<Button type='submit' label='Enviar Mensaje' className='w-full' />
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
