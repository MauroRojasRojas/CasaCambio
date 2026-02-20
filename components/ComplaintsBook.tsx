'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

interface ComplaintForm {
	email: string;
	date: Date | null;
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
	amountSoles: number | null;
	amountDollars: number | null;
	complaintType: 'reclamo' | 'queja';
	detail: string;
	request: string;
	declaration: boolean;
}

const documentOptions = [
	{ label: 'DNI', value: 'DNI' },
	{ label: 'Carné de Extranjería', value: 'CE' },
	{ label: 'Pasaporte', value: 'PAS' }
];

const complaintOptions = [
	{ label: 'Reclamo', value: 'reclamo' },
	{ label: 'Queja', value: 'queja' }
];

export default function ComplaintsBook() {
	const [form, setForm] = useState<ComplaintForm>({
		email: '',
		date: new Date(),
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
		amountSoles: null,
		amountDollars: null,
		complaintType: 'reclamo',
		detail: '',
		request: '',
		declaration: false,
	});

	const [showConfirmation, setShowConfirmation] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const toast = useRef<Toast>(null);

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
			(form.amountSoles !== null || form.amountDollars !== null) &&
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
		toast.current?.show({
			severity: 'success',
			summary: '¡Reclamo Recibido!',
			detail: 'Tu reclamo ha sido registrado exitosamente. Te contactaremos en 5 a 10 días hábiles.',
			life: 3000,
		});
		await new Promise((resolve) => setTimeout(resolve, 3000));
		setIsSubmitting(false);
		handleReset();
	};

	const handleReset = () => {
		setShowConfirmation(false);
		setForm({
			email: '',
			date: new Date(),
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
			amountSoles: null,
			amountDollars: null,
			complaintType: 'reclamo',
			detail: '',
			request: '',
			declaration: false,
		});
	};

	return (
		<main className='min-h-screen bg-[#F5F7FF] py-12 px-4'>
			<Toast ref={toast} />
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
					<h1 className='text-3xl font-bold text-[#02254A] text-center'>Libro de Reclamos</h1>
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
								<InputText
									type='email'
									value={form.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
									className='w-full'
									placeholder='tu@correo.com'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Fecha *</label>
								<Calendar
									value={form.date}
									onChange={(e) => handleInputChange('date', e.value)}
									dateFormat="dd/mm/yy"
									className='w-full'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Nombres completos *</label>
								<InputText
									value={form.firstName}
									onChange={(e) => handleInputChange('firstName', e.target.value)}
									className='w-full'
									placeholder='Tu nombre'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Apellido paterno *</label>
								<InputText
									value={form.fatherSurname}
									onChange={(e) => handleInputChange('fatherSurname', e.target.value)}
									className='w-full'
									placeholder='Apellido paterno'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Apellido materno *</label>
								<InputText
									value={form.motherSurname}
									onChange={(e) => handleInputChange('motherSurname', e.target.value)}
									className='w-full'
									placeholder='Apellido materno'
								/>
							</div>

							{/* Documento de identidad */}
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-2'>Documento de identidad *</label>
								<Dropdown
									value={form.documentType}
									options={documentOptions}
									onChange={(e) => handleInputChange('documentType', e.value)}
									placeholder="Selecciona"
									className='w-full'
								/>
							</div>

							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Número de documento *</label>
								<InputText
									value={form.documentNumber}
									onChange={(e) => handleInputChange('documentNumber', e.target.value)}
									className='w-full'
									placeholder='12345678'
								/>
							</div>
							<div className='md:col-span-2'>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Dirección *</label>
								<InputText
									value={form.address}
									onChange={(e) => handleInputChange('address', e.target.value)}
									className='w-full'
									placeholder='Calle, número, etc.'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Distrito *</label>
								<InputText
									value={form.district}
									onChange={(e) => handleInputChange('district', e.target.value)}
									className='w-full'
									placeholder='Distrito'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Provincia *</label>
								<InputText
									value={form.province}
									onChange={(e) => handleInputChange('province', e.target.value)}
									className='w-full'
									placeholder='Provincia'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Departamento *</label>
								<InputText
									value={form.department}
									onChange={(e) => handleInputChange('department', e.target.value)}
									className='w-full'
									placeholder='Departamento'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Teléfono *</label>
								<InputText
									type='tel'
									value={form.phone}
									onChange={(e) => handleInputChange('phone', e.target.value)}
									className='w-full'
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
								<InputText value={form.service} disabled className='w-full' />
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Número de operación *</label>
								<InputText
									value={form.operationNumber}
									onChange={(e) => handleInputChange('operationNumber', e.target.value)}
									className='w-full'
									placeholder='OP-123456'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Monto (Soles)</label>
								<InputNumber
									value={form.amountSoles}
									onChange={(e) => handleInputChange('amountSoles', e.value)}
									mode="decimal"
									minFractionDigits={2}
									maxFractionDigits={2}
									className='w-full'
									placeholder='0.00'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-1'>Monto (Dólares)</label>
								<InputNumber
									value={form.amountDollars}
									onChange={(e) => handleInputChange('amountDollars', e.value)}
									mode="decimal"
									minFractionDigits={2}
									maxFractionDigits={2}
									className='w-full'
									placeholder='0.00'
								/>
							</div>
						</div>
					</section>

					{/* III. TIPO DE RECLAMO */}
					<section>
						<h2 className='text-lg font-bold text-[#02254A] mb-4 pb-2 border-b-2 border-[#FFE27A]'>III. TIPO DE RECLAMO</h2>
						<Dropdown
							value={form.complaintType}
							options={complaintOptions}
							onChange={(e) => handleInputChange('complaintType', e.value)}
							placeholder="Selecciona"
							className='w-full'
						/>
					</section>

					{/* IV. DESCRIPCIÓN */}
					<section>
						<h2 className='text-lg font-bold text-[#02254A] mb-4 pb-2 border-b-2 border-[#FFE27A]'>IV. DESCRIPCIÓN</h2>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-2'>Detalle del reclamo *</label>
								<InputTextarea
									value={form.detail}
									onChange={(e) => handleInputChange('detail', e.target.value)}
									className='w-full'
									rows={4}
									placeholder='Describe tu reclamo en detalle...'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-700 mb-2'>Solicitud del cliente *</label>
								<InputTextarea
									value={form.request}
									onChange={(e) => handleInputChange('request', e.target.value)}
									className='w-full'
									rows={4}
									placeholder='¿Qué solución esperas recibir?'
								/>
							</div>
						</div>
					</section>

					{/* V. DECLARACIÓN */}
					<section>
						<h2 className='text-lg font-bold text-[#02254A] mb-4 pb-2 border-b-2 border-[#FFE27A]'>V. DECLARACIÓN</h2>
						<div className='flex items-start gap-3'>
							<Checkbox
								checked={form.declaration}
								onChange={(e) => handleInputChange('declaration', e.checked)}
							/>
							<span className='text-sm text-slate-700'>Declaro que la información proporcionada es verdadera y que soy titular del servicio.</span>
						</div>
					</section>

					{/* BOTÓN ENVIAR */}
					<Button
						onClick={handleSubmit}
						disabled={!isFormComplete() || isSubmitting}
						className={`w-full py-3 font-semibold text-lg ${isFormComplete() ? 'bg-[#FFE27A] text-[#02254A] hover:bg-[#ffd94a]' : 'bg-gray-300 text-gray-500'}`}
						label={isSubmitting ? 'Enviando...' : 'Enviar Reclamo'}
					/>
				</div>
			</div>
		</main>
	);
}
