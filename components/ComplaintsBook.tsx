'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { useAuth } from '@/app/context/AuthContext';
import { UserModel } from '@/data/user.model';
import {
	validateComplaintField,
	validateComplaintForm,
	hasComplaintErrors,
} from '@/lib/validators/complaints.validators';
import { RAZON_SOCIAL, RUC } from '@/lib/utils/constants';
import {
	obtenerOperacionesPorPersona,
	reclamos,
} from '@/lib/services/operacionService';
import { OperationModel } from '@/data/operation.model';
import { Toast } from 'primereact/toast';

type FormState = {
	dni: string;
	nombres: string;
	apellidos: string;
	correo: string;
	departamento: string;
	provincia: string;
	distrito: string;
	direccion: string;
	tipoDocumento: 'DNI' | 'CE' | 'PAS' | 'RUC';
	telefono: string;

	date: Date | null;
	amountSent: string;
	amountReceived: string;
	complaintType: 'reclamo' | 'queja';
	declaration: boolean;

	correoAlternativo: string;
	telefonoAdicional: string;
	numeroOperacion: string;
	detalleReclamo: string;
	solicitudCliente: string;
};

type OperationOption = {
	label: string;
	value: string;
	montoEnviado: number;
	monedaEnviada: string;
	montoRecibido: number;
	monedaRecibida: string;
};

const MIN_DETALLE = 20;
const MIN_SOLICITUD = 20;

const documentOptions = [
	{ label: 'DNI', value: 'DNI' },
	{ label: 'Carnet de Extranjería', value: 'CE' },
	{ label: 'Pasaporte', value: 'PAS' },
	{ label: 'RUC', value: 'RUC' },
];

const complaintOptions = [
	{ label: 'Reclamo', value: 'reclamo' },
	{ label: 'Queja', value: 'queja' },
];

const formatCurrencyByCode = (currency: string, amount: number) => {
	const value = Number(amount || 0);

	if (currency === 'PEN') return `S/ ${value.toFixed(2)}`;
	if (currency === 'USD') return `$ ${value.toFixed(2)}`;

	return `${currency} ${value.toFixed(2)}`;
};

export default function ComplaintsBook() {
	const router = useRouter();
	const toast = useRef<Toast>(null);
	const { user, isAuthenticated, isLoading } = useAuth();

	const [operationOptions, setOperationOptions] = useState<OperationOption[]>([]);
	const [loadingOperations, setLoadingOperations] = useState(false);
	const [hasOperations, setHasOperations] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isBlocked = isLoading || !isAuthenticated || !hasOperations;

	const [form, setForm] = useState<FormState>({
		dni: '',
		nombres: '',
		apellidos: '',
		correo: '',
		departamento: '',
		provincia: '',
		distrito: '',
		direccion: '',
		tipoDocumento: 'DNI',
		telefono: '',

		date: new Date(),
		amountSent: '0.00',
		amountReceived: '0.00',
		complaintType: 'reclamo',
		declaration: false,

		correoAlternativo: '',
		telefonoAdicional: '',
		numeroOperacion: '',
		detalleReclamo: '',
		solicitudCliente: '',
	});

	const [touched, setTouched] = useState({
		correoAlternativo: false,
		telefonoAdicional: false,
		numeroOperacion: false,
		detalleReclamo: false,
		solicitudCliente: false,
		declaration: false,
	});

	const [errors, setErrors] = useState({
		correoAlternativo: null as string | null,
		telefonoAdicional: null as string | null,
		numeroOperacion: null as string | null,
		detalleReclamo: null as string | null,
		solicitudCliente: null as string | null,
		declaration: null as string | null,
	});

	useEffect(() => {
		const loadOperations = async () => {
			if (!user) return;

			const u = user as UserModel & {
				correo?: string;
				telefono?: string;
				departamento?: string;
				provincia?: string;
				distrito?: string;
				direccion?: string;
				tipoDocumento?: 'DNI' | 'CE' | 'PAS' | 'RUC';
				numeroDocumento?: string;
				perfilCompleto?: string;
			};

			setForm((prev) => ({
				...prev,
				dni: u?.numeroDocumento ?? '',
				nombres: u?.nombres ?? '',
				apellidos: u?.apellidos ?? '',
				correo: u?.correo ?? '',
				departamento: u?.departamento ?? '',
				provincia: u?.provincia ?? '',
				distrito: u?.distrito ?? '',
				direccion: u?.direccion ?? '',
				tipoDocumento: u?.tipoDocumento ?? 'DNI',
				telefono: u?.telefono ?? '',
				date: prev.date ?? new Date(),
				numeroOperacion: '',
				amountSent: '0.00',
				amountReceived: '0.00',
			}));

			const codigoPersona = u?.perfilCompleto;

			if (!codigoPersona) {
				setOperationOptions([]);
				setHasOperations(false);
				return;
			}

			try {
				setLoadingOperations(true);

				const response = await obtenerOperacionesPorPersona(codigoPersona);

				if (!response.ok) {
					setOperationOptions([]);
					setHasOperations(false);
					return;
				}

				const json = await response.json();
				const operations = Array.isArray(json?.message) ? json.message : [];

				const options: OperationOption[] = operations
					.filter((op: OperationModel) => op?.codigoOperacion)
					.map((op: OperationModel) => ({
						label: op.codigoOperacion,
						value: op.codigoOperacion,
						montoEnviado: Number(op?.montoEnviado ?? 0),
						monedaEnviada: String(op?.monedaEnviada ?? ''),
						montoRecibido: Number(op?.montoRecibido ?? 0),
						monedaRecibida: String(op?.monedaRecibida ?? ''),
					}));

				setOperationOptions(options);
				setHasOperations(options.length > 0);
			} catch (error) {
				console.error('Error al cargar operaciones:', error);
				setOperationOptions([]);
				setHasOperations(false);
			} finally {
				setLoadingOperations(false);
			}
		};

		loadOperations();
	}, [user]);

	const getValidationValues = (nextForm: FormState = form) => ({
		documentType: nextForm.tipoDocumento,
		documentNumber: nextForm.dni,
		alternateEmail: nextForm.correoAlternativo,
		additionalPhone: nextForm.telefonoAdicional,
		detail: nextForm.detalleReclamo,
		request: nextForm.solicitudCliente,
	});

	const validateOperationNumber = (value: string) => {
		if (!String(value || '').trim()) return 'Debe seleccionar una opción.';
		return null;
	};

	const validateDeclaration = (value: boolean) => {
		return value ? null : 'Debe aceptar la declaración.';
	};

	const detalleLength = form.detalleReclamo.trim().length;
	const solicitudLength = form.solicitudCliente.trim().length;

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setForm((prev) => {
			const next = {
				...prev,
				[name]: value,
			};

			const validationValues = getValidationValues(next);

			if (name === 'correoAlternativo') {
				setErrors((prevErrors) => ({
					...prevErrors,
					correoAlternativo: validateComplaintField(
						'alternateEmail',
						validationValues
					),
				}));
			}

			if (name === 'telefonoAdicional') {
				setErrors((prevErrors) => ({
					...prevErrors,
					telefonoAdicional: validateComplaintField(
						'additionalPhone',
						validationValues
					),
				}));
			}

			if (name === 'detalleReclamo') {
				setErrors((prevErrors) => ({
					...prevErrors,
					detalleReclamo: validateComplaintField('detail', validationValues),
				}));
			}

			if (name === 'solicitudCliente') {
				setErrors((prevErrors) => ({
					...prevErrors,
					solicitudCliente: validateComplaintField('request', validationValues),
				}));
			}

			return next;
		});
	};

	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name } = e.target;
		const validationValues = getValidationValues();

		if (name === 'correoAlternativo') {
			setTouched((prev) => ({ ...prev, correoAlternativo: true }));
			setErrors((prev) => ({
				...prev,
				correoAlternativo: validateComplaintField(
					'alternateEmail',
					validationValues
				),
			}));
		}

		if (name === 'telefonoAdicional') {
			setTouched((prev) => ({ ...prev, telefonoAdicional: true }));
			setErrors((prev) => ({
				...prev,
				telefonoAdicional: validateComplaintField(
					'additionalPhone',
					validationValues
				),
			}));
		}

		if (name === 'detalleReclamo') {
			setTouched((prev) => ({ ...prev, detalleReclamo: true }));
			setErrors((prev) => ({
				...prev,
				detalleReclamo: validateComplaintField('detail', validationValues),
			}));
		}

		if (name === 'solicitudCliente') {
			setTouched((prev) => ({ ...prev, solicitudCliente: true }));
			setErrors((prev) => ({
				...prev,
				solicitudCliente: validateComplaintField('request', validationValues),
			}));
		}
	};

	const handleOperationChange = (value: string) => {
		const selected = operationOptions.find((op) => op.value === (value || ''));

		const amountSent = selected
			? formatCurrencyByCode(selected.monedaEnviada, selected.montoEnviado)
			: '0.00';

		const amountReceived = selected
			? formatCurrencyByCode(selected.monedaRecibida, selected.montoRecibido)
			: '0.00';

		setForm((prev) => ({
			...prev,
			numeroOperacion: value || '',
			amountSent,
			amountReceived,
		}));

		setErrors((prev) => ({
			...prev,
			numeroOperacion: validateOperationNumber(value || ''),
		}));
	};

	const handleOperationBlur = () => {
		setTouched((prev) => ({ ...prev, numeroOperacion: true }));
		setErrors((prev) => ({
			...prev,
			numeroOperacion: validateOperationNumber(form.numeroOperacion),
		}));
	};

	const handleDeclarationChange = (value: boolean) => {
		setForm((prev) => ({
			...prev,
			declaration: value,
		}));

		setErrors((prev) => ({
			...prev,
			declaration: validateDeclaration(value),
		}));
	};

const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();

	setTouched({
		correoAlternativo: true,
		telefonoAdicional: true,
		numeroOperacion: true,
		detalleReclamo: true,
		solicitudCliente: true,
		declaration: true,
	});

	if (isBlocked) return;

	const validationValues = getValidationValues();
	const formErrors = validateComplaintForm(validationValues);
	const operationError = validateOperationNumber(form.numeroOperacion);
	const declarationError = validateDeclaration(form.declaration);

	const mappedErrors = {
		correoAlternativo: formErrors.alternateEmail,
		telefonoAdicional: formErrors.additionalPhone,
		numeroOperacion: operationError,
		detalleReclamo: formErrors.detail,
		solicitudCliente: formErrors.request,
		declaration: declarationError,
	};

	setErrors(mappedErrors);

	if (hasComplaintErrors(formErrors) || operationError || declarationError) {
		toast.current?.show({
			severity: 'warn',
			summary: 'Validación',
			detail: 'Complete correctamente los campos requeridos.',
			life: 3000,
		});
		return;
	}

	try {
		setIsSubmitting(true);

		const payload = {
			// campos actuales
			dni: form.dni,
			nombres: form.nombres,
			apellidos: form.apellidos,
			correo: form.correo,
			departamento: form.departamento,
			provincia: form.provincia,
			distrito: form.distrito,
			direccion: form.direccion,
			tipoDocumento: form.tipoDocumento,
			numeroDocumento: form.dni,
			correoAlternativo: form.correoAlternativo || '',
			telefono: form.telefono,
			telefonoAdicional: form.telefonoAdicional || '',
			numeroOperacion: form.numeroOperacion,
			detalleReclamo: form.detalleReclamo,
			solicitudCliente: form.solicitudCliente,
			amountSent: form.amountSent,
			amountReceived: form.amountReceived,

			// compatibilidad con API
			email: form.correo,
			alternateEmail: form.correoAlternativo || '',
			date: (form.date ?? new Date()).toISOString(),
			firstName: form.nombres,
			fatherSurname: form.apellidos,
			motherSurname: '',
			documentType: form.tipoDocumento,
			documentNumber: form.dni,
			address: form.direccion,
			district: form.distrito,
			province: form.provincia,
			department: form.departamento,
			phone: form.telefono,
			additionalPhone: form.telefonoAdicional || '',
			service: 'Cambio de divisas',
			operationNumber: form.numeroOperacion,
			amountSoles: form.amountSent,
			amountDollars: form.amountReceived,
			complaintType: form.complaintType,
			detail: form.detalleReclamo,
			request: form.solicitudCliente,
			declaration: form.declaration,
		};

		const response = await reclamos(payload);

		if (response.ok) {
			toast.current?.show({
				severity: 'success',
				summary: 'Éxito',
				detail: 'Reclamo enviado correctamente.',
				life: 3000,
			});

			setForm((prev) => ({
				...prev,
				// solo limpiar campos manuales
				correoAlternativo: '',
				telefonoAdicional: '',
				numeroOperacion: '',
				detalleReclamo: '',
				solicitudCliente: '',
				amountSent: '0.00',
				amountReceived: '0.00',
				complaintType: 'reclamo',
				declaration: false,
			}));

			setErrors({
				correoAlternativo: null,
				telefonoAdicional: null,
				numeroOperacion: null,
				detalleReclamo: null,
				solicitudCliente: null,
				declaration: null,
			});

			setTouched({
				correoAlternativo: false,
				telefonoAdicional: false,
				numeroOperacion: false,
				detalleReclamo: false,
				solicitudCliente: false,
				declaration: false,
			});
		} else {
			const errorData = await response.json().catch(() => null);
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: errorData?.message || 'No se pudo enviar el reclamo.',
				life: 3000,
			});
		}
	} catch (error) {
		console.error('Error enviando reclamo:', error);
		toast.current?.show({
			severity: 'error',
			summary: 'Error',
			detail: 'Error de conexión al enviar el reclamo.',
			life: 3000,
		});
	} finally {
		setIsSubmitting(false);
	}
};

	const baseInputClass =
		'w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#02254A] disabled:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70';

	const readOnlyInputClass =
		'w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:opacity-70';

	return (
		<section className='mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8'>
			<Toast ref={toast} />
			<div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
				<div className='bg-[#02254A] px-8 py-10 md:px-10 md:py-12'>
					<div className='flex flex-col items-center gap-4 pb-8 border-b border-white/20 mt-6'>
						<h1 className='text-3xl font-bold text-white text-center'>
							Libro de Reclamos
						</h1>

						<div className='text-sm text-white/85 space-y-1 text-center'>
							<p>
								<span className='font-semibold'>Razón Social:</span> {RAZON_SOCIAL}
							</p>
							<p>
								<span className='font-semibold'>RUC:</span> {RUC}
							</p>
						</div>

						<Image
							src='/assets/book.png'
							alt='Libro de Reclamos'
							width={80}
							height={80}
							className='object-contain'
						/>

						<p className='text-sm text-white/90 mt-4 text-center italic max-w-4xl'>
							En cumplimiento del Código de Protección y Defensa del Consumidor,
							{` ${RAZON_SOCIAL} `}
							pone a disposición de sus clientes el presente Libro de Reclamaciones.
						</p>
					</div>
				</div>

				<div className='px-8 py-8 md:px-10 md:py-10'>
					{!isLoading && !isAuthenticated && (
						<div className='mb-6 rounded-[18px] border border-[#E7BE43] bg-[#F6F1DE] px-5 py-4'>
							<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
								<p className='text-[#B45309] text-sm md:text-base font-medium'>
									Para enviar el reclamo debes registrarte.
								</p>

								<button
									type='button'
									onClick={() => router.push('/registro')}
									className='rounded-2xl bg-[#022B5B] px-6 py-3 font-semibold text-white cursor-pointer'
								>
									Regístrate
								</button>
							</div>
						</div>
					)}

					{!isLoading && isAuthenticated && !hasOperations && (
						<div className='mb-6 rounded-[18px] border border-[#E7BE43] bg-[#F6F1DE] px-5 py-4'>
							<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
								<p className='text-[#B45309] text-sm md:text-base font-medium'>
									No hay operaciones disponibles para seleccionar.
								</p>
							</div>
						</div>
					)}

					<form onSubmit={handleSubmit} className='space-y-10'>
						<section>
							<h2 className='text-[#183B67] text-[20px] font-bold mb-6'>
								I. Datos del cliente
							</h2>

							<div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Correo electrónico
									</label>
									<input
										name='correo'
										value={form.correo}
										readOnly
										disabled
										placeholder='Correo electrónico'
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Nombres completos
									</label>
									<input
										name='nombres'
										value={form.nombres}
										readOnly
										disabled
										placeholder='Nombres completos'
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Apellidos completos
									</label>
									<input
										name='apellidos'
										value={form.apellidos}
										readOnly
										disabled
										placeholder='Apellidos completos'
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Tipo de documento
									</label>
									<Dropdown
										value={form.tipoDocumento}
										options={documentOptions}
										disabled
										className='w-full complaints-dropdown'
										panelClassName='complaints-dropdown-panel'
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Número de documento
									</label>
									<input
										name='dni'
										value={form.dni}
										readOnly
										disabled
										placeholder='Número de documento'
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Teléfono
									</label>
									<input
										name='telefono'
										value={form.telefono}
										readOnly
										disabled
										placeholder='Teléfono'
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Departamento
									</label>
									<input
										name='departamento'
										value={form.departamento}
										readOnly
										disabled
										placeholder='Departamento'
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Provincia
									</label>
									<input
										name='provincia'
										value={form.provincia}
										readOnly
										disabled
										placeholder='Provincia'
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Distrito
									</label>
									<input
										name='distrito'
										value={form.distrito}
										readOnly
										disabled
										placeholder='Distrito'
										className={readOnlyInputClass}
									/>
								</div>

								<div className='md:col-span-2 xl:col-span-2'>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Dirección
									</label>
									<input
										name='direccion'
										value={form.direccion}
										readOnly
										disabled
										placeholder='Dirección'
										className={readOnlyInputClass}
									/>
								</div>
							</div>
						</section>

						<section>
							<h2 className='text-[#183B67] text-[20px] font-bold mb-6'>
								II. Datos adicionales
							</h2>

							<div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2'>
								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Correo electrónico alternativo
									</label>
									<input
										name='correoAlternativo'
										value={form.correoAlternativo}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={isBlocked}
										maxLength={255}
										placeholder='Ingrese un correo alternativo'
										className={baseInputClass}
									/>
									{touched.correoAlternativo && errors.correoAlternativo && (
										<p className='mt-1 text-xs text-red-600'>
											{errors.correoAlternativo}
										</p>
									)}
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Teléfono alternativo
									</label>
									<input
										name='telefonoAdicional'
										value={form.telefonoAdicional}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={isBlocked}
										maxLength={9}
										placeholder='Ingrese un teléfono adicional'
										className={baseInputClass}
									/>
									{touched.telefonoAdicional && errors.telefonoAdicional && (
										<p className='mt-1 text-xs text-red-600'>
											{errors.telefonoAdicional}
										</p>
									)}
								</div>
							</div>
						</section>

						<section>
							<h2 className='text-[#183B67] text-[20px] font-bold mb-6'>
								III. Información del servicio
							</h2>

							<div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Servicio
									</label>
									<input
										value='Cambio de divisas'
										readOnly
										disabled
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Código de operación
									</label>
									<Dropdown
										value={form.numeroOperacion}
										options={operationOptions}
										onChange={(e) => handleOperationChange(e.value || '')}
										onBlur={handleOperationBlur}
										filter
										showClear
										disabled={isBlocked || loadingOperations}
										placeholder={
											loadingOperations
												? 'Cargando operaciones...'
												: 'Seleccionar código'
										}
										emptyMessage='No se encontraron operaciones'
										className='w-full complaints-dropdown'
										panelClassName='complaints-dropdown-panel'
									/>
									{touched.numeroOperacion && errors.numeroOperacion && (
										<p className='mt-1 text-xs text-red-600'>
											{errors.numeroOperacion}
										</p>
									)}
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Tipo de reclamo
									</label>
									<Dropdown
										value={form.complaintType}
										options={complaintOptions}
										onChange={(e) =>
											setForm((prev) => ({
												...prev,
												complaintType: e.value,
											}))
										}
										disabled={isBlocked}
										className='w-full complaints-dropdown'
										panelClassName='complaints-dropdown-panel'
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Envías
									</label>
									<input
										value={form.amountSent}
										readOnly
										disabled
										placeholder='0.00'
										className={readOnlyInputClass}
									/>
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Recibes
									</label>
									<input
										value={form.amountReceived}
										readOnly
										disabled
										placeholder='0.00'
										className={readOnlyInputClass}
									/>
								</div>
							</div>
						</section>

						<section>
							<h2 className='text-[#183B67] text-[20px] font-bold mb-6'>
								IV. Detalle del reclamo
							</h2>

							<div className='space-y-6'>
								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Detalle del reclamo
									</label>
									<textarea
										name='detalleReclamo'
										value={form.detalleReclamo}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={isBlocked}
										rows={8}
										maxLength={2000}
										placeholder='Describa el detalle del reclamo'
										className={`${baseInputClass} resize-none`}
									/>
									<div className='mt-2 flex items-center justify-between text-sm text-slate-500'>
										<span>Mínimo {MIN_DETALLE} caracteres.</span>
									</div>
									{touched.detalleReclamo && errors.detalleReclamo && (
										<p className='mt-2 text-sm text-red-600'>
											{errors.detalleReclamo}
										</p>
									)}
								</div>

								<div>
									<label className='mb-3 block text-[#183B67] text-sm font-semibold'>
										Solicitud del cliente
									</label>
									<textarea
										name='solicitudCliente'
										value={form.solicitudCliente}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={isBlocked}
										rows={6}
										maxLength={2000}
										placeholder='Ingrese la solicitud del cliente'
										className={`${baseInputClass} resize-none`}
									/>
									<div className='mt-2 flex items-center justify-between text-sm text-slate-500'>
										<span>Mínimo {MIN_SOLICITUD} caracteres.</span>
									</div>
									{touched.solicitudCliente && errors.solicitudCliente && (
										<p className='mt-2 text-sm text-red-600'>
											{errors.solicitudCliente}
										</p>
									)}
								</div>
							</div>
						</section>

						<section>
							<h2 className='text-[#183B67] text-[20px] font-bold mb-6'>
								V. Declaración
							</h2>

							<div className='flex items-start gap-3'>
								<Checkbox
									inputId='declaration'
									checked={form.declaration}
									onChange={(e) => handleDeclarationChange(!!e.checked)}
									disabled={isBlocked}
								/>
								<label
									htmlFor='declaration'
									className='text-sm text-slate-700 leading-6 cursor-pointer'
								>
									Declaro que la información proporcionada es verdadera y que soy
									titular del servicio.
								</label>
							</div>

							{touched.declaration && errors.declaration && (
								<p className='mt-2 text-sm text-red-600'>{errors.declaration}</p>
							)}
						</section>

						<div className='pt-2'>
							<button
								type='submit'
								disabled={isBlocked || isSubmitting}
								className='rounded-2xl bg-[#022B5B] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400 cursor-pointer'
							>
								{isSubmitting ? 'Enviando...' : 'Enviar reclamo'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}