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

export default function AddEntityModal({ visible, onHide, onSave, type, departamentos, isEditing = false, entityToEdit }: AddEntityModalProps) {
	const [modalWidth, setModalWidth] = useState('70vw');
	const [formData, setFormData] = useState({
		tipoDocumento: 'DNI',
		numeroDocumento: '',
		nombres: '',
		apellidos: '',
		fechaNacimiento: null as Date | null,
		genero: '',
		correo: '',
		telefono: '',
		paisSeleccionado: 'Perú',
		departamentoSeleccionado: '',
		provinciaSeleccionada: '',
		distritoSeleccionado: '',
		direccion: '',
		porcentaje: 0,
		cargo: '',
	});

	const [selectedDepartamentoId, setSelectedDepartamentoId] = useState('');
	const [selectedProvinciaId, setSelectedProvinciaId] = useState('');
	const [selectedDistritoId, setSelectedDistritoId] = useState('');
	const [provincias, setProvincias] = useState<ProvinceModel[]>([]);
	const [distritos, setDistritos] = useState<DistrictModel[]>([]);
	const [errorFechaNacimiento, setErrorFechaNacimiento] = useState('');
	const [errors, setErrors] = useState({
		tipoDocumento: '',
		numeroDocumento: '',
		nombres: '',
		apellidos: '',
		genero: '',
		correo: '',
		telefono: '',
		cargo: '',
	});

	useEffect(() => {
		const handleResize = () => {
			setModalWidth(window.innerWidth >= 640 ? '70vw' : '95vw');
		};
		handleResize(); // Set initial
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (selectedDepartamentoId) {
			const fetchProvincias = async () => {
				try {
					const data = await getProvincias(selectedDepartamentoId);
					setProvincias(data);
				} catch (error) {
					console.error('Error fetching provincias:', error);
				}
			};
			fetchProvincias();
			setSelectedProvinciaId('');
			setSelectedDistritoId('');
		} else {
			setProvincias([]);
		}
	}, [selectedDepartamentoId]);

	useEffect(() => {
		if (selectedProvinciaId) {
			const fetchDistritos = async () => {
				try {
					const data = await getDistritos(selectedProvinciaId);
					setDistritos(data);
				} catch (error) {
					console.error('Error fetching distritos:', error);
				}
			};
			fetchDistritos();
			setSelectedDistritoId('');
		} else {
			setDistritos([]);
		}
	}, [selectedProvinciaId]);

	useEffect(() => {
		if (isEditing && entityToEdit) {
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
				departamentoSeleccionado: '',
				provinciaSeleccionada: '',
				distritoSeleccionado: '',
				direccion: '',
				porcentaje: entityToEdit.porcentaje || 0,
				cargo: entityToEdit.cargo || '',
			});
			setErrorFechaNacimiento('');
			setErrors({
				tipoDocumento: '',
				numeroDocumento: '',
				nombres: '',
				apellidos: '',
				genero: '',
				correo: '',
				telefono: '',
				cargo: '',
			});
		}
	}, [isEditing, entityToEdit]);

	const validateFechaNacimiento = (date: Date | null) => {
		if (!date) {
			setErrorFechaNacimiento('La fecha de nacimiento es requerida');
			return false;
		}
		const today = new Date();
		const birthDate = new Date(date);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		if (age < 18) {
			setErrorFechaNacimiento('Debes ser mayor de 18 años');
			return false;
		}
		setErrorFechaNacimiento('');
		return true;
	};

	const validateForm = () => {
		const newErrors = {
			tipoDocumento: formData.tipoDocumento ? '' : 'Tipo de documento es requerido',
			numeroDocumento: formData.numeroDocumento ? '' : 'Número de documento es requerido',
			nombres: formData.nombres ? '' : 'Nombres son requeridos',
			apellidos: formData.apellidos ? '' : 'Apellidos son requeridos',
			genero: formData.genero ? '' : 'Género es requerido',
			correo: formData.correo ? '' : 'Correo es requerido',
			telefono: formData.telefono ? '' : 'Teléfono es requerido',
			cargo: type === 'representative' && !formData.cargo ? 'Cargo es requerido' : '',
		};
		setErrors(newErrors);
		return Object.values(newErrors).every((error) => error === '');
	};

	const handleSave = () => {
		if (!validateForm() || errorFechaNacimiento) {
			return; // No guardar si hay errores
		}
		const data = {
			...formData,
			fechaNacimiento: formData.fechaNacimiento ? formData.fechaNacimiento.toISOString().split('T')[0] : '',
			departamentoSeleccionado: selectedDepartamentoId,
			provinciaSeleccionada: selectedProvinciaId,
			distritoSeleccionado: selectedDistritoId,
			// Campos por defecto para registro
			contrasena: '',
			confirmarContrasena: '',
			terminosAceptados: false,
			estadoExtranjero: '',
		};
		onSave(data);
		// Reset form
		setFormData({
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
			porcentaje: 0,
			cargo: '',
		});
		setSelectedDepartamentoId('');
		setSelectedProvinciaId('');
		setSelectedDistritoId('');
		setErrorFechaNacimiento('');
		setErrors({
			tipoDocumento: '',
			numeroDocumento: '',
			nombres: '',
			apellidos: '',
			genero: '',
			correo: '',
			telefono: '',
			cargo: '',
		});
		onHide();
	};

	const footer = (
		<div className='flex flex-col gap-4 sm:flex-row sm:justify-end'>
			<Button label='Cancelar' severity="secondary" outlined icon='pi pi-times' onClick={onHide} className='p-button-text' />
			<Button label='Guardar' severity='success' icon='pi pi-check' onClick={handleSave} autoFocus />
		</div>
	);

	return (
		<Dialog
			header={isEditing ? (type === 'shareholder' ? 'Editar Accionista' : 'Editar Representante Legal') : type === 'shareholder' ? 'Agregar Accionista' : 'Agregar Representante Legal'}
			visible={visible}
			style={{ width: modalWidth }}
			footer={footer}
			onHide={onHide}
		>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 mt-4'>
				<div>
					<FloatLabel>
						<Dropdown
							value={formData.tipoDocumento}
							onChange={(e) => {
								setFormData({ ...formData, tipoDocumento: e.value });
								setErrors({ ...errors, tipoDocumento: '' });
							}}
							options={[
								{ label: 'DNI', value: 'DNI' },
								{ label: 'Carnet de Extranjería', value: 'CE' },
								{ label: 'Pasaporte', value: 'PAS' },
							]}
							optionLabel='label'
							optionValue='value'
							className='w-full'
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
								setFormData({ ...formData, numeroDocumento: e.target.value });
								setErrors({ ...errors, numeroDocumento: '' });
							}}
							className='w-full'
						/>
						<label>Número de documento</label>
					</FloatLabel>
					{errors.numeroDocumento && <small className='text-red-500'>{errors.numeroDocumento}</small>}
				</div>
				<div>
					<FloatLabel>
						<InputText
							value={formData.nombres}
							onChange={(e) => {
								setFormData({ ...formData, nombres: e.target.value });
								setErrors({ ...errors, nombres: '' });
							}}
							className='w-full'
						/>
						<label>Nombres</label>
					</FloatLabel>
					{errors.nombres && <small className='text-red-500'>{errors.nombres}</small>}
				</div>
				<div>
					<FloatLabel>
						<InputText
							value={formData.apellidos}
							onChange={(e) => {
								setFormData({ ...formData, apellidos: e.target.value });
								setErrors({ ...errors, apellidos: '' });
							}}
							className='w-full'
						/>
						<label>Apellidos</label>
					</FloatLabel>
					{errors.apellidos && <small className='text-red-500'>{errors.apellidos}</small>}
				</div>
				<div>
					<FloatLabel>
						<Calendar
							value={formData.fechaNacimiento}
							onChange={(e) => {
								setFormData({ ...formData, fechaNacimiento: e.value as Date });
								validateFechaNacimiento(e.value as Date);
							}}
							dateFormat='dd/mm/yy'
							className='w-full'
							locale='es'
						/>
						<label>Fecha de nacimiento</label>
					</FloatLabel>
					{errorFechaNacimiento && <small className='text-red-500'>{errorFechaNacimiento}</small>}
				</div>
				<div>
					<FloatLabel>
						<Dropdown
							value={formData.genero}
							onChange={(e) => {
								setFormData({ ...formData, genero: e.value });
								setErrors({ ...errors, genero: '' });
							}}
							options={[
								{ label: 'Masculino', value: 'M' },
								{ label: 'Femenino', value: 'F' },
								{ label: 'Sin especificar', value: 'X' },
							]}
							optionLabel='label'
							optionValue='value'
							className='w-full'
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
							onChange={(e) => {
								setFormData({ ...formData, correo: e.target.value });
								setErrors({ ...errors, correo: '' });
							}}
							className='w-full'
						/>
						<label>Correo de contacto</label>
					</FloatLabel>
					{errors.correo && <small className='text-red-500'>{errors.correo}</small>}
				</div>
				<div>
					<div className='p-inputgroup'>
						<span className='p-inputgroup-addon'>
							<div className='flex items-center gap-2 px-2'>
								<img src='https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/pe.svg' className='w-6 h-4 object-cover rounded-sm' />
								<span className='font-semibold text-sm'>+51</span>
							</div>
						</span>
						<FloatLabel>
							<InputText
								id='phone_input'
								value={formData.telefono}
								onChange={(e) => {
									const val = e.target.value;
									if (/^\d*$/.test(val)) {
										setFormData({ ...formData, telefono: val });
										setErrors({ ...errors, telefono: '' });
									}
								}}
								className='w-full'
							/>
							<label htmlFor='phone_input'>Teléfono de contacto</label>
						</FloatLabel>
					</div>
					{errors.telefono && <small className='text-red-500'>{errors.telefono}</small>}
				</div>
				{type === 'representative' && (
					<div>
						<FloatLabel>
							<InputText
								value={formData.cargo}
								onChange={(e) => {
									setFormData({ ...formData, cargo: e.target.value });
									setErrors({ ...errors, cargo: '' });
								}}
								className='w-full'
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
