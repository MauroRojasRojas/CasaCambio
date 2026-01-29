'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ComplaintForm {
	email: string;
	date: string;
	firstName: string;
	fatherSurname: string;
	motherSurname: string;
	documentType: 'DNI' | 'CE' | 'PAS';
	documentNumber: string;
	address: string;
	district: string;
	province: string;
	department: string;
	phone: string;
	service: string;
	operationNumber: string;
	amountSoles: string;
	amountDollars: string;
	complaintType: 'reclamo' | 'queja';
	detail: string;
	request: string;
	declaration: boolean;
}

export default function ComplaintsBook() {
	const [form, setForm] = useState<ComplaintForm>({
		email: '',
		date: new Date().toISOString().split('T')[0],
		firstName: '',
		fatherSurname: '',
		motherSurname: '',
		documentType: 'DNI',
		documentNumber: '',
		address: '',
		district: '',
		province: '',
		department: '',
		phone: '',
		service: 'Cambio de divisas',
		operationNumber: '',
		amountSoles: '',
		amountDollars: '',
		complaintType: 'reclamo',
		detail: '',
		request: '',
		declaration: false,
	});

	const [showConfirmation, setShowConfirmation] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isFormComplete = () => {
		return (
			form.email &&
			form.firstName &&
			form.fatherSurname &&
			form.motherSurname &&
			form.documentNumber &&
			form.address &&
			form.district &&
			form.province &&
			form.department &&
			form.phone &&
			form.operationNumber &&
			(form.amountSoles || form.amountDollars) &&
			form.detail &&
			form.request &&
			form.declaration
		);
	};

	const handleInputChange = (field: keyof ComplaintForm, value: any) => {
		setForm((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async () => {
		if (!isFormComplete()) return;

		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setShowConfirmation(true);
		setIsSubmitting(false);
	};

	const handleReset = () => {
		setShowConfirmation(false);
		setForm({
			email: '',
			date: new Date().toISOString().split('T')[0],
			firstName: '',
			fatherSurname: '',
			motherSurname: '',
			documentType: 'DNI',
			documentNumber: '',
			address: '',
			district: '',
			province: '',
			department: '',
			phone: '',
			service: 'Cambio de divisas',
			operationNumber: '',
			amountSoles: '',
			amountDollars: '',
			complaintType: 'reclamo',
			detail: '',
			request: '',
			declaration: false,
		});
	};

	return (
		<main className='min-h-screen bg-[#F5F7FF] py-12 px-4'>
			{/* Modal de confirmación */}
			{showConfirmation && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
					<div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in'>
						<CheckCircleIcon className='w-16 h-16 text-green-500 mx-auto mb-4' />
						<h2 className='text-2xl font-bold text-[#02254A] mb-3'>¡Reclamo Recibido!</h2>
						<p className='text-slate-600 mb-6'>
							Tu reclamo ha sido registrado exitosamente. Nuestro equipo de atención al cliente evaluará tu caso cuidadosamente y se pondrá en contacto contigo en un
							plazo de 5 a 10 días hábiles a través del correo electrónico proporcionado.
							<br />
							<br />
							<span className='font-semibold'>Agradecemos tu confianza en Casa de Cambio M&M DIVISAS SRL</span>
						</p>
						<button onClick={handleReset} className='w-full bg-[#FFE27A] text-[#02254A] py-3 rounded-xl font-semibold hover:bg-[#ffd94a] transition'>
							Aceptar
						</button>
					</div>
				</div>
			)}

			<div className='max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8'>
				{/* HEADER */}
				<div className='flex flex-col items-center gap-4 mb-8 pb-8 border-b-2 border-slate-200'>
					<Image src='/assets/book.png' alt='Libro de Reclamos' width={80} height={80} className='object-contain' />
					<h1 className='text-3xl font-bold text-[#02254A]'>Libro de Reclamos</h1>
					<div className='text-sm text-slate-600 space-y-1 text-center'>
						<p>
							<span className='font-semibold'>Razón Social:</span> M&M DIVISAS SRL
						</p>
						<p>
							<span className='font-semibold'>RUC:</span> 20614994364
						</p>
						<p>
							<span className='font-semibold'>Domicilio Legal:</span> Av. Producción Nacional N° 185 – Urb. La Villa, Chorrillos, Lima – Perú.
						</p>
					</div>
					<p className='text-sm text-slate-700 mt-4 text-center italic'>
						En cumplimiento del Código de Protección y Defensa del Consumidor, M&M DIVISAS SRL pone a disposición de sus clientes el presente Libro de Reclamaciones.
					</p>
				</div>

				{/* FORMULARIO */}
				<div className='space-y-8'>
					{/* I. DATOS DEL CLIENTE */}
					<section>
						<h2 className='text-lg font-bold text-[#02254A] mb-4 pb-2 border-b-2 border-[#FFE27A]'>I. DATOS DEL CLIENTE</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Correo electrónico *</label>
								<input
									type='email'
									value={form.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='tu@correo.com'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Fecha *</label>
								<input
									type='date'
									value={form.date}
									onChange={(e) => handleInputChange('date', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-800 focus:border-blue-500 outline-none'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Nombres completos *</label>
								<input
									type='text'
									value={form.firstName}
									onChange={(e) => handleInputChange('firstName', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='Tu nombre'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Apellido paterno *</label>
								<input
									type='text'
									value={form.fatherSurname}
									onChange={(e) => handleInputChange('fatherSurname', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='Apellido paterno'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Apellido materno *</label>
								<input
									type='text'
									value={form.motherSurname}
									onChange={(e) => handleInputChange('motherSurname', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='Apellido materno'
								/>
							</div>

							{/* Documento de identidad */}
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-2'>Documento de identidad *</label>
								<div className='flex gap-4'>
									{['DNI', 'CE', 'PAS'].map((type) => (
										<label key={type} className='flex items-center gap-2'>
											<input
												type='radio'
												name='documentType'
												value={type}
												checked={form.documentType === type}
												onChange={(e) => handleInputChange('documentType', e.target.value as any)}
												className='w-4 h-4'
											/>
											<span className='text-sm text-slate-700'>{type === 'DNI' ? 'DNI' : type === 'CE' ? 'Carné de Extranjería' : 'Pasaporte'}</span>
										</label>
									))}
								</div>
							</div>

							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Número de documento *</label>
								<input
									type='text'
									value={form.documentNumber}
									onChange={(e) => handleInputChange('documentNumber', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='12345678'
								/>
							</div>
							<div className='md:col-span-2'>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Dirección *</label>
								<input
									type='text'
									value={form.address}
									onChange={(e) => handleInputChange('address', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='Calle, número, etc.'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Distrito *</label>
								<input
									type='text'
									value={form.district}
									onChange={(e) => handleInputChange('district', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='Distrito'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Provincia *</label>
								<input
									type='text'
									value={form.province}
									onChange={(e) => handleInputChange('province', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='Provincia'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Departamento *</label>
								<input
									type='text'
									value={form.department}
									onChange={(e) => handleInputChange('department', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='Departamento'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Teléfono *</label>
								<input
									type='tel'
									value={form.phone}
									onChange={(e) => handleInputChange('phone', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='987654321'
								/>
							</div>
						</div>
					</section>

					{/* II. INFORMACIÓN DEL SERVICIO */}
					<section>
						<h2 className='text-lg font-bold text-[#02254A] mb-4 pb-2 border-b-2 border-[#FFE27A]'>II. INFORMACIÓN DEL SERVICIO</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Servicio utilizado</label>
								<input type='text' value={form.service} disabled className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm bg-slate-100 text-slate-700' />
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Número de operación *</label>
								<input
									type='text'
									value={form.operationNumber}
									onChange={(e) => handleInputChange('operationNumber', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='OP-123456'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Monto (Soles)</label>
								<input
									type='number'
									value={form.amountSoles}
									onChange={(e) => handleInputChange('amountSoles', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='0.00'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Monto (Dólares)</label>
								<input
									type='number'
									value={form.amountDollars}
									onChange={(e) => handleInputChange('amountDollars', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-2 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none'
									placeholder='0.00'
								/>
							</div>
						</div>
					</section>

					{/* III. TIPO DE RECLAMO */}
					<section>
						<h2 className='text-lg font-bold text-[#02254A] mb-4 pb-2 border-b-2 border-[#FFE27A]'>III. TIPO DE RECLAMO</h2>
						<div className='flex gap-6'>
							{[
								{ value: 'reclamo', label: 'Reclamo' },
								{ value: 'queja', label: 'Queja' },
							].map((type) => (
								<label key={type.value} className='flex items-center gap-2'>
									<input
										type='radio'
										name='complaintType'
										value={type.value}
										checked={form.complaintType === type.value}
										onChange={(e) => handleInputChange('complaintType', e.target.value as any)}
										className='w-4 h-4'
									/>
									<span className='text-sm text-slate-700'>{type.label}</span>
								</label>
							))}
						</div>
					</section>

					{/* IV. DESCRIPCIÓN */}
					<section>
						<h2 className='text-lg font-bold text-[#02254A] mb-4 pb-2 border-b-2 border-[#FFE27A]'>IV. DESCRIPCIÓN</h2>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-2'>Detalle del reclamo *</label>
								<textarea
									value={form.detail}
									onChange={(e) => handleInputChange('detail', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-3 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none h-24 resize-none'
									placeholder='Describe tu reclamo en detalle...'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-2'>Solicitud del cliente *</label>
								<textarea
									value={form.request}
									onChange={(e) => handleInputChange('request', e.target.value)}
									className='w-full border border-slate-300 rounded-lg px-4 py-3 text-sm placeholder:text-slate-600 text-slate-800 focus:border-blue-500 outline-none h-24 resize-none'
									placeholder='¿Qué solución esperas recibir?'
								/>
							</div>
						</div>
					</section>

					{/* V. DECLARACIÓN */}
					<section>
						<h2 className='text-lg font-bold text-[#02254A] mb-4 pb-2 border-b-2 border-[#FFE27A]'>V. DECLARACIÓN</h2>
						<label className='flex items-start gap-3'>
							<input type='checkbox' checked={form.declaration} onChange={(e) => handleInputChange('declaration', e.target.checked)} className='w-5 h-5 mt-1' />
							<span className='text-sm text-slate-700'>Declaro que la información proporcionada es verdadera y que soy titular del servicio.</span>
						</label>
					</section>

					{/* CAPTCHA */}
					<div className='h-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 text-sm border border-slate-300'>[ reCAPTCHA ]</div>

					{/* BOTÓN ENVIAR */}
					<button
						onClick={handleSubmit}
						disabled={!isFormComplete() || isSubmitting}
						className={`w-full py-3 rounded-xl font-semibold text-lg transition-all ${
							isFormComplete() ? 'bg-[#FFE27A] text-[#02254A] hover:bg-[#ffd94a] cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
					>
						{isSubmitting ? 'Enviando...' : 'Enviar Reclamo'}
					</button>
				</div>
			</div>
		</main>
	);
}
