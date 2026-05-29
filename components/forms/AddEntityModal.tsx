import { DepartmentModel, DistrictModel, ProvinceModel } from '@/data/ubigeo.model';
import { getProvincias, getDistritos } from '../../lib/services/ubigeoService';
import { useEffect, useState } from 'react';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

interface AddEntityModalProps {
	visible: boolean;
	onHide: () => void;
	onSave: (data: any) => void;
	type: 'shareholder' | 'representative';
	departamentos: DepartmentModel[];
	isEditing?: boolean;
	entityToEdit?: any;
}

type FormDataType = {
	tipoDocumento: string;
	numeroDocumento: string;
	nombres: string;
	apellidos: string;
	fechaNacimiento: Date | null;
	genero: string;
	correo: string;
	telefono: string;
	paisSeleccionado: string;
	departamentoSeleccionado: string;
	provinciaSeleccionada: string;
	distritoSeleccionado: string;
	direccion: string;
	porcentaje: number | '';
	cargo: string;
};

type FormErrors = {
	tipoDocumento: string;
	numeroDocumento: string;
	nombres: string;
	apellidos: string;
	fechaNacimiento: string;
	genero: string;
	correo: string;
	telefono: string;
	departamentoSeleccionado: string;
	provinciaSeleccionada: string;
	distritoSeleccionado: string;
	direccion: string;
	porcentaje: string;
	cargo: string;
};

const initialFormData: FormDataType = {
	tipoDocumento: 'DNI',
	numeroDocumento: '',
	nombres: '',
	apellidos: '',
	fechaNacimiento: null,
	genero: '',
	correo: '',
	telefono: '',
	paisSeleccionado: 'Perú',
	departamentoSeleccionado: '',
	provinciaSeleccionada: '',
	distritoSeleccionado: '',
	direccion: '',
	porcentaje: '',
	cargo: '',
};

const initialErrors: FormErrors = {
	tipoDocumento: '',
	numeroDocumento: '',
	nombres: '',
	apellidos: '',
	fechaNacimiento: '',
	genero: '',
	correo: '',
	telefono: '',
	departamentoSeleccionado: '',
	provinciaSeleccionada: '',
	distritoSeleccionado: '',
	direccion: '',
	porcentaje: '',
	cargo: '',
};

export default function AddEntityModal({
	visible,
	onHide,
	onSave,
	type,
	departamentos,
	isEditing = false,
	entityToEdit,
}: AddEntityModalProps) {
	const [modalWidth, setModalWidth] = useState('70vw');
	const [formData, setFormData] = useState<FormDataType>(initialFormData);
	const [selectedDepartamentoId, setSelectedDepartamentoId] = useState('');
	const [selectedProvinciaId, setSelectedProvinciaId] = useState('');
	const [selectedDistritoId, setSelectedDistritoId] = useState('');
	const [provincias, setProvincias] = useState<ProvinceModel[]>([]);
	const [distritos, setDistritos] = useState<DistrictModel[]>([]);
	const [errors, setErrors] = useState<FormErrors>(initialErrors);
	const [submitted, setSubmitted] = useState(false);
const [loadingDni, setLoadingDni] = useState(false);

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

	useEffect(() => {
		const handleResize = () => {
			setModalWidth(window.innerWidth >= 640 ? '70vw' : '95vw');
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (!visible) return;

		if (isEditing && entityToEdit) {
			const departamento = entityToEdit.departamentoSeleccionado || '';
			const provincia = entityToEdit.provinciaSeleccionada || '';
			const distrito = entityToEdit.distritoSeleccionado || '';

			setFormData({
				tipoDocumento: entityToEdit.tipoDocumento || 'DNI',
				numeroDocumento: entityToEdit.numeroDocumento || '',
				nombres: entityToEdit.nombres || '',
				apellidos: entityToEdit.apellidos || '',
				fechaNacimiento: entityToEdit.fechaNacimiento ? new Date(entityToEdit.fechaNacimiento) : null,
				genero: entityToEdit.genero || '',
				correo: entityToEdit.correo || '',
				telefono: entityToEdit.telefono || '',
				paisSeleccionado: entityToEdit.paisSeleccionado || 'Perú',
				departamentoSeleccionado: departamento,
				provinciaSeleccionada: provincia,
				distritoSeleccionado: distrito,
				direccion: entityToEdit.direccion || '',
				porcentaje: entityToEdit.porcentaje ?? '',
				cargo: entityToEdit.cargo || '',
			});

			setSelectedDepartamentoId(departamento);
			setSelectedProvinciaId(provincia);
			setSelectedDistritoId(distrito);
		} else {
			resetForm();
		}

		setErrors(initialErrors);
		setSubmitted(false);
	}, [visible, isEditing, entityToEdit]);









	


useEffect(() => {
	if (
		formData.tipoDocumento === 'DNI' &&
		formData.numeroDocumento.length === 8
	) {
		fetchDniData(formData.numeroDocumento);
	}
}, [formData.numeroDocumento]);





const isDni = formData.tipoDocumento === 'DNI';


	useEffect(() => {
		if (!selectedDepartamentoId) {
			setProvincias([]);
			return;
		}

		const fetchProvincias = async () => {
			try {
				const data = await getProvincias(selectedDepartamentoId);
				setProvincias(data);
			} catch (error) {
				console.error('Error fetching provincias:', error);
			}
		};

		fetchProvincias();
	}, [selectedDepartamentoId]);

	useEffect(() => {
		if (!selectedProvinciaId) {
			setDistritos([]);
			return;
		}

		const fetchDistritos = async () => {
			try {
				const data = await getDistritos(selectedProvinciaId);
				setDistritos(data);
			} catch (error) {
				console.error('Error fetching distritos:', error);
			}
		};

		fetchDistritos();
	}, [selectedProvinciaId]);

	const resetForm = () => {
		setFormData(initialFormData);
		setSelectedDepartamentoId('');
		setSelectedProvinciaId('');
		setSelectedDistritoId('');
		setProvincias([]);
		setDistritos([]);
		setErrors(initialErrors);
		setSubmitted(false);
	};

	const validateDocument = (tipoDocumento: string, numeroDocumento: string) => {
		const value = numeroDocumento.trim();

		if (!tipoDocumento) return 'Tipo de documento es requerido';
		if (!value) return 'Número de documento es requerido';

		if (tipoDocumento === 'DNI') {
			if (!/^\d{8}$/.test(value)) return 'El DNI debe tener 8 dígitos';
		}

		if (tipoDocumento === 'CE') {
			if (!/^[a-zA-Z0-9]+$/.test(value)) return 'El carnet de extranjería solo debe contener letras y números';
			if (value.length < 9) return 'El carnet de extranjería debe tener mínimo 9 caracteres';
		}

		if (tipoDocumento === 'PAS') {
			if (!/^[a-zA-Z0-9]+$/.test(value)) return 'El pasaporte solo debe contener letras y números';
			if (value.length < 6) return 'El pasaporte debe tener mínimo 6 caracteres';
		}

		return '';
	};

	const validateNameField = (value: string, label: string) => {
		const cleanValue = value.trim();

		if (!cleanValue) return `${label} son requeridos`;
		if (/\d/.test(cleanValue)) return `${label} no debe contener números`;
		if (cleanValue.length < 2) return `${label} debe tener mínimo 2 caracteres`;

		return '';
	};

	const validateFechaNacimiento = (date: Date | null) => {
		if (!date) return 'La fecha de nacimiento es requerida';

		const today = new Date();
		const birthDate = new Date(date);

		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		if (age < 18) return 'Debes ser mayor de 18 años';

		return '';
	};

	const validateEmail = (value: string) => {
		const cleanValue = value.trim();

		if (!cleanValue) return 'Correo es requerido';

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(cleanValue)) return 'Formato de correo inválido';

		return '';
	};

	const validatePhone = (value: string) => {
		const cleanValue = value.trim();

		if (!cleanValue) return 'Teléfono es requerido';
		if (!/^\d+$/.test(cleanValue)) return 'El teléfono solo debe contener números';
		if (!cleanValue.startsWith('9')) return 'El teléfono debe iniciar con 9';
		if (cleanValue.length !== 9) return 'El teléfono debe tener 9 dígitos';

		return '';
	};

	const validateAddress = (value: string) => {
		const cleanValue = value.trim();

		if (!cleanValue) return 'La dirección es requerida';
		if (cleanValue.length < 5) return 'La dirección debe tener mínimo 5 caracteres';

		return '';
	};

	const validatePorcentaje = (value: number | '') => {
		if (type !== 'shareholder') return '';

		if (value === '' || value === null) return 'El porcentaje es requerido';

		const numericValue = Number(value);

		if (Number.isNaN(numericValue)) return 'El porcentaje es inválido';
		if (numericValue <= 0) return 'El porcentaje debe ser mayor a 0';
		if (numericValue > 100) return 'El porcentaje no puede ser mayor a 100';

		return '';
	};

	const validateCargo = (value: string) => {
		if (type !== 'representative') return '';

		const cleanValue = value.trim();

		if (!cleanValue) return 'Cargo es requerido';
		if (cleanValue.length < 2) return 'El cargo debe tener mínimo 2 caracteres';

		return '';
	};

	const validateForm = (): FormErrors => {
		return {
			tipoDocumento: !formData.tipoDocumento ? 'Tipo de documento es requerido' : '',
			numeroDocumento: validateDocument(formData.tipoDocumento, formData.numeroDocumento),
			nombres: validateNameField(formData.nombres, 'Nombres'),
			apellidos: validateNameField(formData.apellidos, 'Apellidos'),
			fechaNacimiento: validateFechaNacimiento(formData.fechaNacimiento),
			genero: !formData.genero ? 'Género es requerido' : '',
			correo: validateEmail(formData.correo),
			telefono: validatePhone(formData.telefono),
			departamentoSeleccionado: !selectedDepartamentoId ? 'Departamento es requerido' : '',
			provinciaSeleccionada: !selectedProvinciaId ? 'Provincia es requerida' : '',
			distritoSeleccionado: !selectedDistritoId ? 'Distrito es requerido' : '',
			direccion: validateAddress(formData.direccion),
			porcentaje: validatePorcentaje(formData.porcentaje),
			cargo: validateCargo(formData.cargo),
		};
	};

	const hasErrors = (newErrors: FormErrors) => {
		return Object.values(newErrors).some((error) => error.trim() !== '');
	};

	const updateField = (field: keyof FormDataType, value: any) => {

	
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));

		if (!submitted) return;

		setErrors((prev) => {
			const nextErrors = { ...prev };

			if (field === 'tipoDocumento') {
				nextErrors.tipoDocumento = !value ? 'Tipo de documento es requerido' : '';
				nextErrors.numeroDocumento = validateDocument(value, formData.numeroDocumento);
			}

			if (field === 'numeroDocumento') nextErrors.numeroDocumento = validateDocument(formData.tipoDocumento, value);
			if (field === 'nombres') nextErrors.nombres = validateNameField(value, 'Nombres');
			if (field === 'apellidos') nextErrors.apellidos = validateNameField(value, 'Apellidos');
			if (field === 'fechaNacimiento') nextErrors.fechaNacimiento = validateFechaNacimiento(value);
			if (field === 'genero') nextErrors.genero = !value ? 'Género es requerido' : '';
			if (field === 'correo') nextErrors.correo = validateEmail(value);
			if (field === 'telefono') nextErrors.telefono = validatePhone(value);
			if (field === 'direccion') nextErrors.direccion = validateAddress(value);
			if (field === 'porcentaje') nextErrors.porcentaje = validatePorcentaje(value);
			if (field === 'cargo') nextErrors.cargo = validateCargo(value);

			return nextErrors;
		});
	};
////eliminar
const fetchDniData = async (dni: string) => {
	try {
		setLoadingDni(true);
	
		setFormData((prev) => ({
			...prev,
			nombres: '',
			apellidos: ''
		}));

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'}/dni/${dni}`);

		if (!response.ok) throw new Error('Error al consultar DNI');

		const data = await response.json();

		setFormData((prev) => ({
			...prev,
			nombres: data.nombres || '',
			apellidos: data.apellidos || '',
		}));
	} catch (error) {
		console.error(error);
	} finally {
		setLoadingDni(false);
	}
};



	const handleSave = () => {
		setSubmitted(true);

		const newErrors = validateForm();
		setErrors(newErrors);

		if (hasErrors(newErrors)) return;

		const data = {
			...formData,
			fechaNacimiento: formData.fechaNacimiento ? formData.fechaNacimiento.toISOString().split('T')[0] : '',
			departamentoSeleccionado: selectedDepartamentoId,
			provinciaSeleccionada: selectedProvinciaId,
			distritoSeleccionado: selectedDistritoId,
			contrasena: '',
			confirmarContrasena: '',
			terminosAceptados: false,
			estadoExtranjero: '',
		};

		onSave(data);
		resetForm();
		onHide();
	};

	const handleClose = () => {
		resetForm();
		onHide();
	};



	const footer = (
		<div className='flex flex-col gap-4 sm:flex-row sm:justify-end'>
			<Button label='Cancelar' severity='secondary' outlined icon='pi pi-times' onClick={handleClose} className='p-button-text' />
			<Button label='Guardar' severity='success' icon='pi pi-check' onClick={handleSave} autoFocus />
		</div>
	);

	return (
		<Dialog
			header={
				isEditing
					? type === 'shareholder'
						? 'Editar Accionista'
						: 'Editar Representante Legal'
					: type === 'shareholder'
						? 'Agregar Accionista'
						: 'Agregar Representante Legal'
			}
			visible={visible}
			style={{ width: modalWidth }}
			breakpoints={{ '640px': '95vw', '480px': '100vw' }}
			footer={footer}
			onHide={handleClose}
		>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 mt-4'>
				<div>
					<FloatLabel>
						<Dropdown
							value={formData.tipoDocumento}
onChange={(e) => {
	const newType = e.value;

	updateField('tipoDocumento', newType);
	updateField('numeroDocumento', '');

	// 🔥 limpiar nombres/apellidos si ya no es DNI
	if (newType !== 'DNI') {
		setFormData((prev) => ({
			...prev,
			nombres: '',
			apellidos: '',
		}));
	}
}}
							options={[
								{ label: 'DNI', value: 'DNI' },
								{ label: 'Carnet de Extranjería', value: 'CE' },
								{ label: 'Pasaporte', value: 'PAS' },
							]}
							optionLabel='label'
							optionValue='value'
							className={`w-full ${errors.tipoDocumento ? 'p-invalid' : ''}`}
						/>
						<label>Tipo de documento</label>
					</FloatLabel>
					{errors.tipoDocumento && <small className='text-red-500'>{errors.tipoDocumento}</small>}
				</div>

				<div>
					<FloatLabel>
						<InputText
	value={formData.numeroDocumento}
	onChange={(e) => {
		const value = e.target.value;

		if (formData.tipoDocumento === 'DNI' && !/^\d*$/.test(value)) return;
		if ((formData.tipoDocumento === 'CE' || formData.tipoDocumento === 'PAS') && !/^[a-zA-Z0-9]*$/.test(value)) return;

		updateField('numeroDocumento', value);
	}}
	onKeyDown={(e) => {
		if (e.key === 'Enter') {
			const dni = formData.numeroDocumento;

			if (formData.tipoDocumento === 'DNI' && /^\d{8}$/.test(dni)) {
				fetchDniData(dni);
			}
		}
	}}
	disabled={loadingDni}
	maxLength={formData.tipoDocumento === 'DNI' ? 8 : 20}
	className={`w-full ${errors.numeroDocumento ? 'p-invalid' : ''}`}
/>
	<label>Número de documento</label>
</FloatLabel>
{errors.numeroDocumento && <small className='text-red-500'>{errors.numeroDocumento}</small>}
</div>
<div>
	<FloatLabel>
<InputText
	value={formData.nombres}
	onChange={(e) => updateField('nombres', e.target.value)}
	disabled={isDni}
	readOnly={isDni}
	className={`w-full ${isDni ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : ''} ${errors.nombres ? 'p-invalid' : ''}`}
/>
		<label>Nombres</label>
	</FloatLabel>
	{errors.nombres && <small className='text-red-500'>{errors.nombres}</small>}
</div>

<div>
	<FloatLabel>
<InputText
	value={formData.apellidos}
	onChange={(e) => updateField('apellidos', e.target.value)}
	disabled={isDni}
	readOnly={isDni}
	className={`w-full ${isDni ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : ''} ${errors.apellidos ? 'p-invalid' : ''}`}
/>
		<label>Apellidos</label>
	</FloatLabel>
	{errors.apellidos && <small className='text-red-500'>{errors.apellidos}</small>}
</div>

				<div>
					<FloatLabel>
						<Calendar
							value={formData.fechaNacimiento}
							onChange={(e) => updateField('fechaNacimiento', e.value ?? null)}
							dateFormat='dd/mm/yy'
							locale='es'
							className={`w-full ${errors.fechaNacimiento ? 'p-invalid' : ''}`}
						/>
						<label>Fecha de nacimiento</label>
					</FloatLabel>
					{errors.fechaNacimiento && <small className='text-red-500'>{errors.fechaNacimiento}</small>}
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={formData.genero}
							onChange={(e) => updateField('genero', e.value)}
							options={[
								{ label: 'Masculino', value: 'M' },
								{ label: 'Femenino', value: 'F' },
								{ label: 'Sin especificar', value: 'X' },
							]}
							optionLabel='label'
							optionValue='value'
							className={`w-full ${errors.genero ? 'p-invalid' : ''}`}
						/>
						<label>Género</label>
					</FloatLabel>
					{errors.genero && <small className='text-red-500'>{errors.genero}</small>}
				</div>

				<div>
					<FloatLabel>
						<InputText
							type='email'
							value={formData.correo}
							onChange={(e) => updateField('correo', e.target.value)}
							className={`w-full ${errors.correo ? 'p-invalid' : ''}`}
						/>
						<label>Correo de contacto</label>
					</FloatLabel>
					{errors.correo && <small className='text-red-500'>{errors.correo}</small>}
				</div>

				<div>
					<div className='p-inputgroup'>
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
								value={formData.telefono}
								onChange={(e) => {
									const value = e.target.value;
									if (/^\d*$/.test(value) && value.length <= 9) {
										updateField('telefono', value);
									}
								}}
								className={`w-full ${errors.telefono ? 'p-invalid' : ''}`}
							/>
							<label htmlFor='phone_input'>Teléfono de contacto</label>
						</FloatLabel>
					</div>
					{errors.telefono && <small className='text-red-500'>{errors.telefono}</small>}
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(departamentos) ? departamentos.find((d) => d.id === selectedDepartamentoId) || null : null}
							onChange={(e) => {
								const id = e.value?.id || '';
								setSelectedDepartamentoId(id);
								setSelectedProvinciaId('');
								setSelectedDistritoId('');
								setFormData((prev) => ({
									...prev,
									departamentoSeleccionado: id,
									provinciaSeleccionada: '',
									distritoSeleccionado: '',
								}));

								if (submitted) {
									setErrors((prev) => ({
										...prev,
										departamentoSeleccionado: !id ? 'Departamento es requerido' : '',
										provinciaSeleccionada: '',
										distritoSeleccionado: '',
									}));
								}
							}}
							options={Array.isArray(departamentos) ? departamentos : []}
							optionLabel='nombre'
							filter
							className={`w-full ${errors.departamentoSeleccionado ? 'p-invalid' : ''}`}
						/>
						<label>Departamento</label>
					</FloatLabel>
					{errors.departamentoSeleccionado && <small className='text-red-500'>{errors.departamentoSeleccionado}</small>}
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(provincias) ? provincias.find((p) => p.id === selectedProvinciaId) || null : null}
							onChange={(e) => {
								const id = e.value?.id || '';
								setSelectedProvinciaId(id);
								setSelectedDistritoId('');
								setFormData((prev) => ({
									...prev,
									provinciaSeleccionada: id,
									distritoSeleccionado: '',
								}));

								if (submitted) {
									setErrors((prev) => ({
										...prev,
										provinciaSeleccionada: !id ? 'Provincia es requerida' : '',
										distritoSeleccionado: '',
									}));
								}
							}}
							options={Array.isArray(provincias) ? provincias : []}
							optionLabel='nombre'
							disabled={!selectedDepartamentoId}
							filter
							className={`w-full ${errors.provinciaSeleccionada ? 'p-invalid' : ''}`}
						/>
						<label>Provincia</label>
					</FloatLabel>
					{errors.provinciaSeleccionada && <small className='text-red-500'>{errors.provinciaSeleccionada}</small>}
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(distritos) ? distritos.find((d) => d.id === selectedDistritoId) || null : null}
							onChange={(e) => {
								const id = e.value?.id || '';
								setSelectedDistritoId(id);
								setFormData((prev) => ({
									...prev,
									distritoSeleccionado: id,
								}));

								if (submitted) {
									setErrors((prev) => ({
										...prev,
										distritoSeleccionado: !id ? 'Distrito es requerido' : '',
									}));
								}
							}}
							options={Array.isArray(distritos) ? distritos : []}
							optionLabel='nombre'
							disabled={!selectedProvinciaId}
							filter
							className={`w-full ${errors.distritoSeleccionado ? 'p-invalid' : ''}`}
						/>
						<label>Distrito</label>
					</FloatLabel>
					{errors.distritoSeleccionado && <small className='text-red-500'>{errors.distritoSeleccionado}</small>}
				</div>

				<div>
					<FloatLabel>
						<InputText
							value={formData.direccion}
							onChange={(e) => updateField('direccion', e.target.value)}
							className={`w-full ${errors.direccion ? 'p-invalid' : ''}`}
						/>
						<label>Dirección</label>
					</FloatLabel>
					{errors.direccion && <small className='text-red-500'>{errors.direccion}</small>}
				</div>

				{type === 'shareholder' && (
					<div>
						<FloatLabel>
							<InputText
								value={formData.porcentaje === '' ? '' : String(formData.porcentaje)}
								onChange={(e) => {
									const value = e.target.value;
									if (/^\d*\.?\d*$/.test(value)) {
										updateField('porcentaje', value === '' ? '' : Number(value));
									}
								}}
								className={`w-full ${errors.porcentaje ? 'p-invalid' : ''}`}
							/>
							<label>Porcentaje de participación</label>
						</FloatLabel>
						{errors.porcentaje && <small className='text-red-500'>{errors.porcentaje}</small>}
					</div>
				)}

				{type === 'representative' && (
					<div>
						<FloatLabel>
							<InputText
								value={formData.cargo}
								onChange={(e) => updateField('cargo', e.target.value)}
								className={`w-full ${errors.cargo ? 'p-invalid' : ''}`}
							/>
							<label>Cargo</label>
						</FloatLabel>
						{errors.cargo && <small className='text-red-500'>{errors.cargo}</small>}
					</div>
				)}
			</div>
		</Dialog>
	);
}