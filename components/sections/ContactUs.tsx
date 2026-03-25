'use client';

import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { contactanos } from '@/lib/services/operacionService';

interface ContactForm {
	name: string;
	email: string;
	subject: string;
	message: string;
}

interface ContactFormErrors {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const initialForm: ContactForm = {
	name: '',
	email: '',
	subject: '',
	message: '',
};

const initialErrors: ContactFormErrors = {
	name: '',
	email: '',
	subject: '',
	message: '',
};

export default function ContactUs() {
	const [form, setForm] = useState<ContactForm>(initialForm);
	const [errors, setErrors] = useState<ContactFormErrors>(initialErrors);
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const toast = useRef<Toast>(null);

	const validateName = (value: string) => {
		const cleanValue = value.trim();

		if (!cleanValue) return 'El nombre es obligatorio.';
		if (cleanValue.length < 2) return 'El nombre debe tener mínimo 2 caracteres.';
		return '';
	};

	const validateEmail = (value: string) => {
		const cleanValue = value.trim();

		if (!cleanValue) return 'El correo es obligatorio.';

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(cleanValue)) return 'Ingresa un correo válido.';

		return '';
	};

	const validateSubject = (value: string) => {
		const cleanValue = value.trim();

		if (!cleanValue) return 'El asunto es obligatorio.';
		if (cleanValue.length < 5) return 'El asunto debe tener mínimo 5 caracteres.';

		return '';
	};

	const validateMessage = (value: string) => {
		const cleanValue = value.trim();

		if (!cleanValue) return 'El mensaje es obligatorio.';
		if (cleanValue.length < 10) return 'El mensaje debe tener mínimo 10 caracteres.';

		return '';
	};

	const validateForm = (): ContactFormErrors => {
		return {
			name: validateName(form.name),
			email: validateEmail(form.email),
			subject: validateSubject(form.subject),
			message: validateMessage(form.message),
		};
	};

	const hasErrors = (formErrors: ContactFormErrors) => {
		return Object.values(formErrors).some((value) => value.trim() !== '');
	};

	const handleInputChange = (field: keyof ContactForm, value: string) => {
		setForm((prev) => ({
			...prev,
			[field]: value,
		}));

		if (!submitted) return;

		setErrors((prev) => ({
			...prev,
			[field]:
				field === 'name'
					? validateName(value)
					: field === 'email'
						? validateEmail(value)
						: field === 'subject'
							? validateSubject(value)
							: validateMessage(value),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isSubmitting) return;

		setSubmitted(true);

		const newErrors = validateForm();
		setErrors(newErrors);

		if (hasErrors(newErrors)) {
			/* toast.current?.show({
				severity: 'warn',
				summary: 'Formulario incompleto',
				detail: 'Corrige los campos obligatorios para continuar.',
				life: 3000,
			}); */
			return;
		}

		setIsSubmitting(true);

		try {
			const res = await contactanos({
				name: form.name.trim(),
				email: form.email.trim(),
				subject: form.subject.trim(),
				message: form.message.trim(),
			});

			if (!res.ok) {
				let msg = 'No se pudo enviar tu mensaje. Intenta nuevamente.';
				try {
					const data = await res.json();
					msg = data?.message || data?.error || msg;
				} catch {}

				toast.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: msg,
					life: 4000,
				});

				setIsSubmitting(false);
				return;
			}

			toast.current?.show({
				severity: 'success',
				summary: '¡Mensaje Enviado!',
				detail: 'Tu mensaje ha sido recibido. Te contactaremos pronto.',
				life: 3000,
			});

			setForm(initialForm);
			setErrors(initialErrors);
			setSubmitted(false);
			setIsSubmitting(false);
		} catch (err: any) {
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: err?.message || 'Error de red. Intenta nuevamente.',
				life: 4000,
			});

			setIsSubmitting(false);
		}
	};

	return (
		<section className='pt-30 sm:pt-26 md:pt-40 lg:pt-45 pb-15 bg-gray-50'>
			<Toast ref={toast} />
			<div className='max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16'>
				<div className='text-center mb-12 md:mb-16'>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#02254A] mb-4'>Contáctanos</h1>
					<p className='text-lg md:text-xl text-slate-600 max-w-3xl mx-auto'>
						Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta o solicitud.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16'>
					<div className='space-y-8'>
						<div>
							<h2 className='text-2xl md:text-3xl font-bold text-[#02254A] mb-6'>Información de Contacto</h2>
							<div className='space-y-4'>
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

					<div className='bg-white p-8 rounded-2xl shadow-lg'>
						<h3 className='text-xl font-bold text-[#02254A] mb-6'>Envíanos un Mensaje</h3>

						<form className='space-y-4' onSubmit={handleSubmit} noValidate>
							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>Nombre</label>
								<InputText
									maxLength={200}
									className={`w-full ${errors.name ? 'p-invalid' : ''}`}
									placeholder='Tu nombre completo'
									value={form.name}
									onChange={(e) => handleInputChange('name', e.target.value)}
								/>
								{errors.name && <p className='mt-1 text-xs text-red-600'>{errors.name}</p>}
							</div>

							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>Correo Electrónico</label>
								<InputText
									type='email'
									maxLength={200}
									className={`w-full ${errors.email ? 'p-invalid' : ''}`}
									placeholder='tu@email.com'
									value={form.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
								/>
								{errors.email && <p className='mt-1 text-xs text-red-600'>{errors.email}</p>}
							</div>

							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>Asunto</label>
								<InputText
									className={`w-full ${errors.subject ? 'p-invalid' : ''}`}
									maxLength={120}
									placeholder='Asunto de tu mensaje'
									value={form.subject}
									onChange={(e) => handleInputChange('subject', e.target.value)}
								/>
								{errors.subject && <p className='mt-1 text-xs text-red-600'>{errors.subject}</p>}
							</div>

							<div>
								<label className='block text-sm font-medium text-slate-700 mb-1'>Mensaje</label>
								<InputTextarea
									rows={4}
									className={`w-full ${errors.message ? 'p-invalid' : ''}`}
									maxLength={2000}
									placeholder='Escribe tu mensaje aquí...'
									value={form.message}
									onChange={(e) => handleInputChange('message', e.target.value)}
								/>
								{errors.message && <p className='mt-1 text-xs text-red-600'>{errors.message}</p>}
							</div>

							<Button
								type='submit'
								label={isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
								loading={isSubmitting}
								disabled={isSubmitting}
								className='w-full'
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}