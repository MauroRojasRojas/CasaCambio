import { Dispatch, SetStateAction, useState, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import type { ShareholderModel, LegalRepresentativeModel } from '../../data/persons.model';
import type { DepartmentModel, ProvinceModel, DistrictModel } from '../../data/ubigeo.model';
import AddEntityModal from './AddEntityModal';

interface IdentityStepProps {
	profile: 'persona' | 'empresa' | null;
	dni: string;
	setDni: Dispatch<SetStateAction<string>>;
	docType: string;
	setDocType: Dispatch<SetStateAction<string>>;
	fullName: string;
	setFullName: Dispatch<SetStateAction<string>>;
	nombres: string;
	setNombres: Dispatch<SetStateAction<string>>;
	apellidos: string;
	setApellidos: Dispatch<SetStateAction<string>>;
	fechaNacimiento: Date | null;
	setFechaNacimiento: Dispatch<SetStateAction<Date | null>>;
	errorFechaNacimiento: string;
	phone: string;
	setPhone: Dispatch<SetStateAction<string>>;
	gender: string;
	setGender: Dispatch<SetStateAction<string>>;
	country: string;
	setCountry: Dispatch<SetStateAction<string>>;
	selectedDepartamentoId: string;
	setSelectedDepartamentoId: Dispatch<SetStateAction<string>>;
	selectedProvinciaId: string;
	setSelectedProvinciaId: Dispatch<SetStateAction<string>>;
	selectedDistritoId: string;
	setSelectedDistritoId: Dispatch<SetStateAction<string>>;
	address: string;
	setAddress: Dispatch<SetStateAction<string>>;
	accionistas: ShareholderModel[];
	setAccionistas: Dispatch<SetStateAction<ShareholderModel[]>>;
	representantesLegales: LegalRepresentativeModel[];
	setRepresentantesLegales: Dispatch<SetStateAction<LegalRepresentativeModel[]>>;
	noTengoAccionistas: boolean;
	setNoTengoAccionistas: Dispatch<SetStateAction<boolean>>;
	departamentos: DepartmentModel[];
	provincias: ProvinceModel[];
	distritos: DistrictModel[];
	loadingDepartamentos: boolean;
	loadingProvincias: boolean;
	loadingDistritos: boolean;
	agregarAccionista: () => void;
	removerAccionista: (index: number) => void;
	actualizarAccionista: (index: number, campo: keyof any, valor: string | number) => void;
	agregarRepresentante: () => void;
	removerRepresentante: (index: number) => void;
	actualizarRepresentante: (index: number, campo: keyof any, valor: string) => void;
	onBack: () => void;
	onFinish: () => void;
	isSubmitting: boolean;
}

type FormErrors = {
	docType: string;
	dni: string;
	fullName: string;
	nombres: string;
	apellidos: string;
	fechaNacimiento: string;
	gender: string;
	phone: string;
	country: string;
	departamento: string;
	provincia: string;
	distrito: string;
	address: string;
	accionistas: string;
	representantesLegales: string;
};

const initialErrors: FormErrors = {
	docType: '',
	dni: '',
	fullName: '',
	nombres: '',
	apellidos: '',
	fechaNacimiento: '',
	gender: '',
	phone: '',
	country: '',
	departamento: '',
	provincia: '',
	distrito: '',
	address: '',
	accionistas: '',
	representantesLegales: '',
};

export default function IdentityStep({
	profile,
	dni,
	setDni,
	docType,
	setDocType,
	fullName,
	setFullName,
	nombres,
	setNombres,
	apellidos,
	setApellidos,
	fechaNacimiento,
	setFechaNacimiento,
	errorFechaNacimiento,
	phone,
	setPhone,
	gender,
	setGender,
	country,
	setCountry,
	selectedDepartamentoId,
	setSelectedDepartamentoId,
	selectedProvinciaId,
	setSelectedProvinciaId,
	selectedDistritoId,
	setSelectedDistritoId,
	address,
	setAddress,
	accionistas,
	setAccionistas,
	representantesLegales,
	setRepresentantesLegales,
	noTengoAccionistas,
	setNoTengoAccionistas,
	departamentos,
	provincias,
	distritos,
	loadingDepartamentos,
	loadingProvincias,
	loadingDistritos,
	agregarAccionista,
	removerAccionista,
	actualizarAccionista,
	agregarRepresentante,
	removerRepresentante,
	actualizarRepresentante,
	onBack,
	onFinish,
	isSubmitting,
}: IdentityStepProps) {
	addLocale('es', {
		firstDayOfWeek: 1,
		dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
		dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
		dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
		monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
		monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
		today: 'Hoy',
		clear: 'Limpiar',
	});

	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState<'shareholder' | 'representative'>('shareholder');
	const [isEditing, setIsEditing] = useState(false);
	const [editingIndex, setEditingIndex] = useState(-1);
	const [entityToEdit, setEntityToEdit] = useState<any>(null);
	const toast = useRef<Toast>(null!);

	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState<FormErrors>(initialErrors);

	const validatePhone = (value: string) => {
		if (!value.trim()) return 'El teléfono es obligatorio.';
		if (!/^\d+$/.test(value)) return 'El teléfono solo debe contener números.';
		if (!value.startsWith('9')) return 'El teléfono debe iniciar con 9.';
		if (value.length !== 9) return 'El teléfono debe tener 9 dígitos.';
		return '';
	};

	const validateNameField = (value: string, label: string) => {
		if (!value.trim()) return `${label} es obligatorio.`;
		if (/\d/.test(value)) return `${label} no debe contener números.`;
		return '';
	};

	const validateDocument = (value: string, type: string) => {
		if (!type) return 'El tipo de documento es obligatorio.';
		if (!value.trim()) return 'El número de documento es obligatorio.';

		if (type === 'DNI') {
			if (!/^\d{8}$/.test(value)) return 'El DNI debe tener 8 dígitos.';
		}

		if (type === 'RUC') {
			if (!/^\d{11}$/.test(value)) return 'El RUC debe tener 11 dígitos.';
		}

		if (type === 'CE') {
			if (value.length < 9) return 'El carnet de extranjería debe tener 9 caracteres.';
		}

		if (type === 'PAS') {
			if (value.length < 6) return 'El pasaporte es obligatorio.';
		}

		return '';
	};

	const validateFullName = (value: string) => {
		if (!value.trim()) return 'La razón social es obligatoria.';
		return '';
	};

const validateAddress = (value: string) => {
	const cleanValue = value.trim();

	if (!cleanValue) return 'La dirección es obligatoria.';
	if (cleanValue.length < 5) return 'La dirección debe tener mínimo 5 caracteres.';

	return '';
};

	const validateCurrentForm = (): FormErrors => {
		const newErrors: FormErrors = { ...initialErrors };

		newErrors.docType = !docType ? 'El tipo de documento es obligatorio.' : '';
		newErrors.dni = validateDocument(dni, docType);
		newErrors.phone = validatePhone(phone);
		newErrors.country = !country ? 'El país es obligatorio.' : '';
		newErrors.departamento = !selectedDepartamentoId ? 'El departamento es obligatorio.' : '';
		newErrors.provincia = !selectedProvinciaId ? 'La provincia es obligatoria.' : '';
		newErrors.distrito = !selectedDistritoId ? 'El distrito es obligatorio.' : '';
		newErrors.address = validateAddress(address);

		if (docType === 'RUC' || profile === 'empresa') {
			newErrors.fullName = validateFullName(fullName);

			if (!noTengoAccionistas && accionistas.length === 0) {
				newErrors.accionistas = 'Debes registrar al menos un accionista o marcar que no tienes accionistas.';
			}

			if (representantesLegales.length === 0) {
				newErrors.representantesLegales = 'Debes registrar al menos un representante legal.';
			}
		} else {
			newErrors.nombres = validateNameField(nombres, 'Nombres');
			newErrors.apellidos = validateNameField(apellidos, 'Apellidos');
			newErrors.fechaNacimiento = !fechaNacimiento
				? 'La fecha de nacimiento es obligatoria.'
				: errorFechaNacimiento || '';
			newErrors.gender = !gender ? 'El género es obligatorio.' : '';
		}

		return newErrors;
	};

	const hasErrors = (formErrors: FormErrors) => Object.values(formErrors).some((value) => value.trim() !== '');

const handleFinishClick = () => {
	if (isSubmitting) return;

	setSubmitted(true);

	const newErrors = validateCurrentForm();
	setErrors(newErrors);

	if (hasErrors(newErrors)) {
		/* toast.current?.show({
			severity: 'warn',
			summary: 'Formulario incompleto',
			detail: 'Completa los campos obligatorios para continuar.',
			life: 3000,
		}); */
		return;
	}

	onFinish();
};

	const handleAddEntity = (type: 'shareholder' | 'representative') => {
		setModalType(type);
		setIsEditing(false);
		setEditingIndex(-1);
		setEntityToEdit(null);
		setModalVisible(true);
	};

	const handleEditShareholder = (index: number) => {
		setModalType('shareholder');
		setIsEditing(true);
		setEditingIndex(index);
		setEntityToEdit(accionistas[index]);
		setModalVisible(true);
	};

	const handleEditRepresentative = (index: number) => {
		setModalType('representative');
		setIsEditing(true);
		setEditingIndex(index);
		setEntityToEdit(representantesLegales[index]);
		setModalVisible(true);
	};

	const handleSaveEntity = (data: any) => {
		if (modalType === 'shareholder') {
			const newAccionista: ShareholderModel = {
				tipoDocumento: data.tipoDocumento,
				numeroDocumento: data.numeroDocumento,
				nombres: data.nombres,
				apellidos: data.apellidos,
				fechaNacimiento: data.fechaNacimiento,
				genero: data.genero,
				correo: data.correo,
				contrasena: data.contrasena,
				confirmarContrasena: data.confirmarContrasena,
				terminosAceptados: data.terminosAceptados,
				paisSeleccionado: data.paisSeleccionado,
				telefono: data.telefono,
				departamentoSeleccionado: data.departamentoSeleccionado,
				provinciaSeleccionada: data.provinciaSeleccionada,
				distritoSeleccionado: data.distritoSeleccionado,
				estadoExtranjero: data.estadoExtranjero,
				direccion: data.direccion,
				porcentaje: data.porcentaje,
			};

			if (isEditing) {
				const updated = [...accionistas];
				updated[editingIndex] = newAccionista;
				setAccionistas(updated);
				toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Accionista actualizado correctamente', life: 3000 });
			} else {
				setAccionistas([...accionistas, newAccionista]);
				toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Accionista agregado correctamente', life: 3000 });
			}

			if (submitted) {
				setErrors((prev) => ({
					...prev,
					accionistas: '',
				}));
			}
		} else {
			const newRepresentante: LegalRepresentativeModel = {
				tipoDocumento: data.tipoDocumento,
				numeroDocumento: data.numeroDocumento,
				nombres: data.nombres,
				apellidos: data.apellidos,
				fechaNacimiento: data.fechaNacimiento,
				genero: data.genero,
				correo: data.correo,
				contrasena: data.contrasena,
				confirmarContrasena: data.confirmarContrasena,
				terminosAceptados: data.terminosAceptados,
				paisSeleccionado: data.paisSeleccionado,
				telefono: data.telefono,
				departamentoSeleccionado: data.departamentoSeleccionado,
				provinciaSeleccionada: data.provinciaSeleccionada,
				distritoSeleccionado: data.distritoSeleccionado,
				estadoExtranjero: data.estadoExtranjero,
				direccion: data.direccion,
				cargo: data.cargo,
			};

			if (isEditing) {
				const updated = [...representantesLegales];
				updated[editingIndex] = newRepresentante;
				setRepresentantesLegales(updated);
				toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Representante legal actualizado correctamente', life: 3000 });
			} else {
				setRepresentantesLegales([...representantesLegales, newRepresentante]);
				toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Representante legal agregado correctamente', life: 3000 });
			}

			if (submitted) {
				setErrors((prev) => ({
					...prev,
					representantesLegales: '',
				}));
			}
		}
	};

	return (
		<div className='col-span-1 lg:col-span-2 px-6 sm:px-10 py-8'>
			<div className='flex flex-col sm:flex-row items-start gap-4'>
				<Button id='back-btn' icon='pi pi-arrow-left' rounded outlined className='p-2 sm:p-3' onClick={onBack} />
				<div className='flex flex-col text-start sm:text-left'>
					<span className='text-2xl font-extrabold text-[#02254A]'>Verifica tu identidad</span>
					<p className='text-sm text-slate-600 mt-1'>Completa tus datos para completar tu registro</p>
				</div>
			</div>

			<Tooltip target='#back-btn' content='Atrás' />

			<div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8'>
				<div>
					<FloatLabel>
						<Dropdown
							value={docType}
							onChange={(e) => {
								setDocType(e.value);
								setDni('');
								if (submitted) {
									setErrors((prev) => ({
										...prev,
										docType: !e.value ? 'El tipo de documento es obligatorio.' : '',
										dni: '',
									}));
								}
							}}
							options={[
								{ label: 'DNI', value: 'DNI' },
								{ label: 'Carnet de Extranjería', value: 'CE' },
								{ label: 'Pasaporte', value: 'PAS' },
								{ label: 'RUC', value: 'RUC' },
							]}
							className={`w-full ${errors.docType ? 'p-invalid' : ''}`}
						/>
						<label>Documento de identidad</label>
					</FloatLabel>
					{errors.docType && <p className='mt-1 text-xs text-red-600'>{errors.docType}</p>}
				</div>

				<div>
					<FloatLabel>
						<InputText
							id='dni_input'
							value={dni}
							onChange={(e) => {
								const v = e.target.value;
								if (/^\d*$/.test(v)) {
									setDni(v);
									if (submitted) {
										setErrors((prev) => ({
											...prev,
											dni: validateDocument(v, docType),
										}));
									}
								}
							}}
							onBlur={() => {
								if (submitted) {
									setErrors((prev) => ({
										...prev,
										dni: validateDocument(dni, docType),
									}));
								}
							}}
							maxLength={docType === 'DNI' ? 8 : docType === 'RUC' ? 11 : docType === 'CE' ? 9 : 12}
							className={`w-full ${errors.dni ? 'p-invalid' : ''}`}
						/>
						<label htmlFor='dni_input'>Número de documento</label>
					</FloatLabel>
					<div className='flex justify-between'>
					{errors.dni && <p className='mt-1 text-xs text-red-600'>{errors.dni}</p>}
					<p className='text-xs text-slate-500 mt-1'>
						{docType === 'DNI' && `${dni.length}/8 caracteres`}
						{docType === 'RUC' && `${dni.length}/11 caracteres`}
						{docType === 'CE' && `${dni.length}/9 caracteres`}
						{docType === 'PAS' && `${dni.length}/12 caracteres máximo`}
					</p>

					</div>
					
				</div>

				{docType === 'RUC' ? (
					<div>
						<FloatLabel>
							<InputText
								id='fullname_input'
								value={fullName}
								onChange={(e) => {
									const value = e.target.value;
									setFullName(value);
									if (submitted) {
										setErrors((prev) => ({
											...prev,
											fullName: validateFullName(value),
										}));
									}
								}}
								onBlur={() => {
									if (submitted) {
										setErrors((prev) => ({
											...prev,
											fullName: validateFullName(fullName),
										}));
									}
								}}
								className={`w-full ${errors.fullName ? 'p-invalid' : ''}`}
							/>
							<label htmlFor='fullname_input'>Razón social</label>
						</FloatLabel>
						{errors.fullName && <p className='mt-1 text-xs text-red-600'>{errors.fullName}</p>}
					</div>
				) : (
					<>
						<div>
							<FloatLabel>
								<InputText
									id='nombres_input'
									value={nombres}
									onChange={(e) => {
										const val = e.target.value;
										setNombres(val);
										if (submitted) {
											setErrors((prev) => ({
												...prev,
												nombres: validateNameField(val, 'Nombres'),
											}));
										}
									}}
									onBlur={() => {
										if (submitted) {
											setErrors((prev) => ({
												...prev,
												nombres: validateNameField(nombres, 'Nombres'),
											}));
										}
									}}
									className={`w-full ${errors.nombres ? 'p-invalid' : ''}`}
								/>
								<label htmlFor='nombres_input'>Nombres</label>
							</FloatLabel>
							{errors.nombres && <p className='mt-1 text-xs text-red-600'>{errors.nombres}</p>}
						</div>

						<div>
							<FloatLabel>
								<InputText
									id='apellidos_input'
									value={apellidos}
									onChange={(e) => {
										const val = e.target.value;
										setApellidos(val);
										if (submitted) {
											setErrors((prev) => ({
												...prev,
												apellidos: validateNameField(val, 'Apellidos'),
											}));
										}
									}}
									onBlur={() => {
										if (submitted) {
											setErrors((prev) => ({
												...prev,
												apellidos: validateNameField(apellidos, 'Apellidos'),
											}));
										}
									}}
									className={`w-full ${errors.apellidos ? 'p-invalid' : ''}`}
								/>
								<label htmlFor='apellidos_input'>Apellidos</label>
							</FloatLabel>
							{errors.apellidos && <p className='mt-1 text-xs text-red-600'>{errors.apellidos}</p>}
						</div>

						<div>
							<FloatLabel>
								<Calendar
									id='fechaNacimiento_input'
									value={fechaNacimiento}
									onChange={(e) => {
										setFechaNacimiento(e.value ?? null);
										if (submitted) {
											setErrors((prev) => ({
												...prev,
												fechaNacimiento: !e.value ? 'La fecha de nacimiento es obligatoria.' : '',
											}));
										}
									}}
									locale='es'
									className={`w-full ${errors.fechaNacimiento ? 'p-invalid' : ''}`}
								/>
								<label htmlFor='fechaNacimiento_input'>Fecha de nacimiento</label>
							</FloatLabel>
							{(errors.fechaNacimiento || errorFechaNacimiento) && (
								<p className='mt-1 text-xs text-red-600'>{errors.fechaNacimiento || errorFechaNacimiento}</p>
							)}
						</div>
					</>
				)}

				{docType !== 'RUC' && (
					<div>
						<FloatLabel>
							<Dropdown
								value={gender}
								onChange={(e) => {
									setGender(e.value);
									if (submitted) {
										setErrors((prev) => ({
											...prev,
											gender: !e.value ? 'El género es obligatorio.' : '',
										}));
									}
								}}
								options={[
									{ label: 'Masculino', value: 'M' },
									{ label: 'Femenino', value: 'F' },
									{ label: 'Sin especificar', value: 'X' },
								]}
								optionLabel='label'
								optionValue='value'
								className={`w-full ${errors.gender ? 'p-invalid' : ''}`}
							/>
							<label>Género</label>
						</FloatLabel>
						{errors.gender && <p className='mt-1 text-xs text-red-600'>{errors.gender}</p>}
					</div>
				)}

				<div className='flex flex-col'>
					<div className='p-inputgroup mt-1'>
						<span className='p-inputgroup-addon'>
							<div className='flex items-center gap-2 px-2'>
								<img
									src='https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/pe.svg'
									className='w-6 h-4 object-cover rounded-sm'
									alt='Bandera de Perú'
								/>
								<span className='font-semibold text-sm'>+51</span>
							</div>
						</span>

						<FloatLabel className='flex-1'>
							<InputText
								id='phone_input'
								value={phone}
								onChange={(e) => {
									const val = e.target.value;
									if (/^\d*$/.test(val) && val.length <= 9) {
										setPhone(val);
										if (submitted) {
											setErrors((prev) => ({
												...prev,
												phone: validatePhone(val),
											}));
										}
									}
								}}
								onBlur={() => {
									if (submitted) {
										setErrors((prev) => ({
											...prev,
											phone: validatePhone(phone),
										}));
									}
								}}
								maxLength={9}
								className={`w-full ${errors.phone ? 'p-invalid' : ''}`}
							/>
							<label htmlFor='phone_input'>Teléfono</label>
						</FloatLabel>
					</div>

					{errors.phone && <p className='mt-1 text-xs text-red-600'>{errors.phone}</p>}
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={country || 'PE'}
							onChange={(e) => {
								setCountry(e.value);
								if (submitted) {
									setErrors((prev) => ({
										...prev,
										country: !e.value ? 'El país es obligatorio.' : '',
									}));
								}
							}}
							options={[{ label: 'Perú', value: 'PE' }]}
							optionLabel='label'
							optionValue='value'
							className={`w-full ${errors.country ? 'p-invalid' : ''}`}
						/>
						<label>País</label>
					</FloatLabel>
					{errors.country && <p className='mt-1 text-xs text-red-600'>{errors.country}</p>}
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(departamentos) ? departamentos.find((d) => d.id === selectedDepartamentoId) || null : null}
							onChange={(e) => {
								setSelectedDepartamentoId(e.value?.id || '');
								setSelectedProvinciaId('');
								setSelectedDistritoId('');

								if (submitted) {
									setErrors((prev) => ({
										...prev,
										departamento: !e.value?.id ? 'El departamento es obligatorio.' : '',
										provincia: '',
										distrito: '',
									}));
								}
							}}
							options={Array.isArray(departamentos) ? departamentos : []}
							optionLabel='nombre'
							loading={loadingDepartamentos}
							filter
							filterDelay={400}
							emptyMessage='No hay departamentos disponibles'
							className={`w-full ${errors.departamento ? 'p-invalid' : ''}`}
						/>
						<label>Departamento</label>
					</FloatLabel>
					{errors.departamento && <p className='mt-1 text-xs text-red-600'>{errors.departamento}</p>}
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(provincias) ? provincias.find((p) => p.id === selectedProvinciaId) || null : null}
							onChange={(e) => {
								setSelectedProvinciaId(e.value?.id || '');
								setSelectedDistritoId('');

								if (submitted) {
									setErrors((prev) => ({
										...prev,
										provincia: !e.value?.id ? 'La provincia es obligatoria.' : '',
										distrito: '',
									}));
								}
							}}
							options={Array.isArray(provincias) ? provincias : []}
							optionLabel='nombre'
							disabled={!selectedDepartamentoId}
							loading={loadingProvincias}
							filter
							filterDelay={400}
							emptyMessage='Selecciona un departamento primero'
							className={`w-full ${errors.provincia ? 'p-invalid' : ''}`}
						/>
						<label>Provincia</label>
					</FloatLabel>
					{errors.provincia && <p className='mt-1 text-xs text-red-600'>{errors.provincia}</p>}
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(distritos) ? distritos.find((d) => d.id === selectedDistritoId) || null : null}
							onChange={(e) => {
								setSelectedDistritoId(e.value?.id || '');
								if (submitted) {
									setErrors((prev) => ({
										...prev,
										distrito: !e.value?.id ? 'El distrito es obligatorio.' : '',
									}));
								}
							}}
							options={Array.isArray(distritos) ? distritos : []}
							optionLabel='nombre'
							disabled={!selectedProvinciaId}
							loading={loadingDistritos}
							filter
							filterDelay={400}
							emptyMessage='Selecciona una provincia primero'
							className={`w-full ${errors.distrito ? 'p-invalid' : ''}`}
						/>
						<label>Distrito</label>
					</FloatLabel>
					{errors.distrito && <p className='mt-1 text-xs text-red-600'>{errors.distrito}</p>}
				</div>

				<div>
					<FloatLabel>
						<InputText
							id='address_input'
							value={address}
							onChange={(e) => {
								const value = e.target.value;
								setAddress(value);
								if (submitted) {
									setErrors((prev) => ({
										...prev,
										address: validateAddress(value),
									}));
								}
							}}
							onBlur={() => {
								if (submitted) {
									setErrors((prev) => ({
										...prev,
										address: validateAddress(address),
									}));
								}
							}}
							className={`w-full ${errors.address ? 'p-invalid' : ''}`}
						/>
						<label htmlFor='address_input'>Dirección</label>
					</FloatLabel>
					{errors.address && <p className='mt-1 text-xs text-red-600'>{errors.address}</p>}
				</div>

				{docType === 'RUC' && (
					<div className='md:col-span-2'>
						<div className='rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 sm:px-4 sm:py-3 flex items-start gap-2 sm:gap-3'>
							<i className='pi pi-info-circle text-[#02254A] text-base sm:text-lg mt-[2px] shrink-0' />
							<p className='text-sm text-[#02254A] leading-relaxed'>
								<span className='font-semibold'>Obligatorio:</span>{' '}
								<span className='break-words'>
									Enviar Ficha RUC a <span className='font-semibold'>info.dollariza@gmail.com</span>
								</span>
							</p>
						</div>
					</div>
				)}
			</div>

			{profile === 'empresa' && (
				<div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6'>
					<div className='border border-slate-300 rounded-xl p-4'>
						<div className='flex justify-between items-center'>
							<span className='text-sm sm:text-lg font-semibold text-[#02254A]'>Accionistas</span>
							<div className='flex gap-2'>
								{!noTengoAccionistas && (
									<Button label='Agregar' outlined size='small' className='text-sm px-3 py-1 h-8' onClick={() => handleAddEntity('shareholder')} />
								)}
							</div>
						</div>

						{!noTengoAccionistas && (
							<div className='mt-4 space-y-2'>
								{accionistas.length === 0 ? (
									<p className='text-sm text-slate-500'>No hay accionistas registrados</p>
								) : (
									accionistas.map((acc, index) => (
										<div key={index} className='flex justify-between items-center border border-slate-200 rounded-lg p-3 bg-slate-50'>
											<div>
												<span className='font-medium'>
													{acc.nombres} {acc.apellidos}
												</span>{' '}
												- {acc.numeroDocumento}
											</div>
											<div className='flex gap-2'>
												<Button size='small' icon='pi pi-pencil' className='p-button-rounded p-button-text p-button-sm' id={`edit-acc-${index}`} onClick={() => handleEditShareholder(index)} />
												<Button size='small' icon='pi pi-trash' className='p-button-rounded p-button-text p-button-danger p-button-sm' onClick={() => removerAccionista(index)} />
											</div>
										</div>
									))
								)}
							</div>
						)}

						<div className='mt-4'>
							<label className='flex items-center gap-2 text-sm text-slate-700'>
								<Checkbox
									checked={noTengoAccionistas}
									onChange={(e) => {
										setNoTengoAccionistas(e.checked ?? false);
										if (e.checked) setAccionistas([]);

										if (submitted) {
											setErrors((prev) => ({
												...prev,
												accionistas: '',
											}));
										}
									}}
									className='rounded'
								/>
								Declaro que no tengo accionistas en la empresa
							</label>
						</div>

						{errors.accionistas && <p className='mt-3 text-xs text-red-600'>{errors.accionistas}</p>}
					</div>

					<div className='border border-slate-300 rounded-xl p-4'>
						<div className='flex justify-between items-center'>
							<span className='text-sm sm:text-lg font-semibold text-[#02254A]'>Representantes legales</span>
							<div className='flex gap-2'>
								<Button label='Agregar' outlined size='small' className='text-sm px-3 py-1 h-8' onClick={() => handleAddEntity('representative')} />
							</div>
						</div>

						<div className='mt-4 space-y-2'>
							{representantesLegales.length === 0 ? (
								<p className='text-sm text-slate-500'>No hay representantes legales registrados</p>
							) : (
								representantesLegales.map((rep, index) => (
									<div key={index} className='flex justify-between items-center border border-slate-200 rounded-lg p-3 bg-slate-50'>
										<div>
											<span className='font-medium'>
												{rep.nombres} {rep.apellidos}
											</span>{' '}
											- {rep.cargo}
										</div>
										<div className='flex gap-2'>
											<Button size='small' icon='pi pi-pencil' className='p-button-rounded p-button-text p-button-sm' id={`edit-rep-${index}`} onClick={() => handleEditRepresentative(index)} />
											<Button size='small' icon='pi pi-trash' className='p-button-rounded p-button-text p-button-danger p-button-sm' onClick={() => removerRepresentante(index)} />
										</div>
									</div>
								))
							)}
						</div>

						{errors.representantesLegales && <p className='mt-3 text-xs text-red-600'>{errors.representantesLegales}</p>}
					</div>
				</div>
			)}

			<AddEntityModal
				visible={modalVisible}
				onHide={() => setModalVisible(false)}
				onSave={handleSaveEntity}
				type={modalType}
				departamentos={departamentos}
				isEditing={isEditing}
				entityToEdit={entityToEdit}
			/>

			<Toast ref={toast} />

			{accionistas.map((_, index) => (
				<Tooltip key={`edit-acc-tooltip-${index}`} target={`#edit-acc-${index}`} content='Editar' />
			))}
			{representantesLegales.map((_, index) => (
				<Tooltip key={`edit-rep-tooltip-${index}`} target={`#edit-rep-${index}`} content='Editar' />
			))}

			<div className='w-full mt-8'>
				<Button
	onClick={handleFinishClick}
	label={isSubmitting ? 'Procesando...' : 'Finalizar registro'}
	loading={isSubmitting}
	disabled={isSubmitting}
	raised
	className='w-full'
/>
			</div>
		</div>
	);
}