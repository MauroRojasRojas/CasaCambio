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
}

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
	const [phoneError, setPhoneError] = useState('');
	const [nombresError, setNombresError] = useState('');
	const [apellidosError, setApellidosError] = useState('');

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

	// Validación de campos según el tipo de perfil
	const isFormValid = () => {
		if (!docType || !dni) return false;

		const telefonoValido = validatePhone(phone) === '';
		const nombresValidos = validateNameField(nombres, 'Nombres') === '';
		const apellidosValidos = validateNameField(apellidos, 'Apellidos') === '';

		if (profile === 'persona') {
			return !!(
				docType &&
				dni &&
				nombres &&
				apellidos &&
				fechaNacimiento &&
				gender &&
				country &&
				selectedDepartamentoId &&
				selectedProvinciaId &&
				selectedDistritoId &&
				address &&
				telefonoValido &&
				nombresValidos &&
				apellidosValidos &&
				!errorFechaNacimiento
			);
		}

		if (profile === 'empresa') {
			const baseFieldsValid = !!(
				docType &&
				dni &&
				fullName &&
				country &&
				selectedDepartamentoId &&
				selectedProvinciaId &&
				selectedDistritoId &&
				address &&
				telefonoValido
			);

			const accionistasValid = noTengoAccionistas || accionistas.length > 0;
			const representantesValid = representantesLegales.length > 0;

			return baseFieldsValid && accionistasValid && representantesValid;
		}

		return false;
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

			{/* FORMULARIO - Grid responsive */}
			<div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8'>
				{/* Tipo de documento */}
				<div>
					<FloatLabel>
						<Dropdown
							value={docType}
							onChange={(e) => {
								setDocType(e.value);
								setDni(''); // Limpiar al cambiar tipo
							}}
							options={[
								{ label: 'DNI', value: 'DNI' },
								{ label: 'Carnet de Extranjería', value: 'CE' },
								{ label: 'Pasaporte', value: 'PAS' },
								{ label: 'RUC', value: 'RUC' },
							]}
							className='w-full'
						/>
						<label>Documento de identidad</label>
					</FloatLabel>
				</div>

				{/* Número de documento */}
				<div>
					<FloatLabel>
						<InputText
							id='dni_input'
							value={dni}
							onChange={(e) => {
								const v = e.target.value;
								if (/^\d*$/.test(v)) setDni(v);
							}}
							maxLength={docType === 'DNI' ? 8 : docType === 'RUC' ? 11 : docType === 'CE' ? 9 : 12}
							className='w-full'
						/>
						<label htmlFor='dni_input'>Número de documento</label>
					</FloatLabel>
					<p className='text-xs text-slate-500 mt-1'>
						{docType === 'DNI' && `${dni.length}/8 caracteres`}
						{docType === 'RUC' && `${dni.length}/11 caracteres`}
						{docType === 'CE' && `${dni.length}/9 caracteres`}
						{docType === 'PAS' && `${dni.length}/12 caracteres máximo`}
					</p>
				</div>

				{/* Nombre completo / Razón social */}
				{docType === 'RUC' ? (
					<div>
						<FloatLabel>
							<InputText id='fullname_input' value={fullName} onChange={(e) => setFullName(e.target.value)} className='w-full' />
							<label htmlFor='fullname_input'>Razón social</label>
						</FloatLabel>
					</div>
				) : (
					<>
						{/* Nombres */}
						<div>
							<FloatLabel>
								<InputText
									id='nombres_input'
									value={nombres}
									onChange={(e) => {
										const val = e.target.value;
										setNombres(val);
										setNombresError(validateNameField(val, 'Nombres'));
									}}
									onBlur={() => setNombresError(validateNameField(nombres, 'Nombres'))}
									className='w-full'
								/>
								<label htmlFor='nombres_input'>Nombres</label>
							</FloatLabel>
							{nombresError && <p className='mt-1 text-xs text-red-600'>{nombresError}</p>}
						</div>
						{/* Apellidos */}
						<div>
							<FloatLabel>
								<InputText
									id='apellidos_input'
									value={apellidos}
									onChange={(e) => {
										const val = e.target.value;
										setApellidos(val);
										setApellidosError(validateNameField(val, 'Apellidos'));
									}}
									onBlur={() => setApellidosError(validateNameField(apellidos, 'Apellidos'))}
									className='w-full'
								/>
								<label htmlFor='apellidos_input'>Apellidos</label>
							</FloatLabel>
							{apellidosError && <p className='mt-1 text-xs text-red-600'>{apellidosError}</p>}
						</div>
						{/* Fecha de nacimiento */}
						<div>
							<FloatLabel>
								<Calendar id='fechaNacimiento_input' value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.value ?? null)} locale='es' className='w-full' />
								<label htmlFor='fechaNacimiento_input'>Fecha de nacimiento</label>
							</FloatLabel>
							{errorFechaNacimiento && <small className='text-red-500'>{errorFechaNacimiento}</small>}
						</div>
					</>
				)}

				{/* Género - Solo si NO es RUC */}
				{docType !== 'RUC' && (
					<div>
						<FloatLabel>
							<Dropdown
								value={gender}
								onChange={(e) => setGender(e.value)}
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
					</div>
				)}

				{/* Teléfono */}
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
						setPhoneError(validatePhone(val));
					}
				}}
				onBlur={() => setPhoneError(validatePhone(phone))}
				maxLength={9}
				className='w-full'
			/>
			<label htmlFor='phone_input'>Teléfono</label>
		</FloatLabel>
	</div>

	{phoneError && (
		<p className='mt-1 text-xs text-red-600'>
			{phoneError}
		</p>
	)}
</div>

				{/* País */}
				<div>
					<FloatLabel>
						<Dropdown value={country || 'PE'} onChange={(e) => setCountry(e.value)} options={[{ label: 'Perú', value: 'PE' }]} optionLabel='label' optionValue='value' className='w-full' />
						<label>País</label>
					</FloatLabel>
				</div>

				{/* Ubigeo Perú */}
				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(departamentos) ? departamentos.find((d) => d.id === selectedDepartamentoId) || null : null}
							onChange={(e) => {
								setSelectedDepartamentoId(e.value?.id || '');
								setSelectedProvinciaId('');
								setSelectedDistritoId('');
							}}
							options={Array.isArray(departamentos) ? departamentos : []}
							optionLabel='nombre'
							loading={loadingDepartamentos}
							filter
							filterDelay={400}
							emptyMessage='No hay departamentos disponibles'
							className='w-full'
						/>
						<label>Departamento</label>
					</FloatLabel>
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(provincias) ? provincias.find((p) => p.id === selectedProvinciaId) || null : null}
							onChange={(e) => {
								setSelectedProvinciaId(e.value?.id || '');
								setSelectedDistritoId('');
							}}
							options={Array.isArray(provincias) ? provincias : []}
							optionLabel='nombre'
							disabled={!selectedDepartamentoId}
							loading={loadingProvincias}
							filter
							filterDelay={400}
							emptyMessage='Selecciona un departamento primero'
							className='w-full'
						/>
						<label>Provincia</label>
					</FloatLabel>
				</div>

				<div>
					<FloatLabel>
						<Dropdown
							value={Array.isArray(distritos) ? distritos.find((d) => d.id === selectedDistritoId) || null : null}
							onChange={(e) => setSelectedDistritoId(e.value?.id || '')}
							options={Array.isArray(distritos) ? distritos : []}
							optionLabel='nombre'
							disabled={!selectedProvinciaId}
							loading={loadingDistritos}
							filter
							filterDelay={400}
							emptyMessage='Selecciona una provincia primero'
							className='w-full'
						/>
						<label>Distrito</label>
					</FloatLabel>
				</div>


				{/* Dirección - Para todos */}
				<div>
					<FloatLabel>
						<InputText id='address_input' value={address} onChange={(e) => setAddress(e.target.value)} className='w-full' />
						<label htmlFor='address_input'>Dirección</label>
					</FloatLabel>
				</div>
				{docType === 'RUC' && (
					<div className="md:col-span-2">
						<div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 sm:px-4 sm:py-3 flex items-start gap-2 sm:gap-3">
							<i className="pi pi-info-circle text-[#02254A] text-base sm:text-lg mt-[2px] shrink-0" />
							<p className="text-sm text-[#02254A] leading-relaxed">
								<span className="font-semibold">Obligatorio:</span>{' '}
								<span className="break-words">
									Enviar Ficha RUC a <span className="font-semibold">info.dollariza@gmail.com</span>
								</span>
							</p>
						</div>
					</div>
				)}
			</div>

			{/* SECCIONES PARA EMPRESA */}
			{profile === 'empresa' && (
				<div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6'>
					{/* ACCIONISTAS */}
					<div className='border border-slate-300 rounded-xl p-4'>
						<div className='flex justify-between items-center'>
							<span className='text-sm sm:text-lg font-semibold text-[#02254A]'>Accionistas</span>
							<div className='flex gap-2'>{!noTengoAccionistas && <Button label='Agregar' outlined size='small' className='text-sm px-3 py-1 h-8' onClick={() => handleAddEntity('shareholder')} />}</div>
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
									}}
									className='rounded'
								/>
								Declaro que no tengo accionistas en la empresa
							</label>
						</div>
					</div>

					{/* REPRESENTANTES LEGALES */}
					<div className='border border-slate-300 rounded-xl p-4'>
						<div className='flex justify-between items-center'>
							<span className='text-sm sm:text-lg font-semibold text-[#02254A]'>Representantes legales</span>
							<div className='flex gap-2'>
								<Button label='Agregar' outlined size='small' className='text-sm px-3 py-1 h-8' onClick={() => handleAddEntity('representative')} />
							</div>
						</div>
						{
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
						}
					</div>
				</div>
			)}

			<AddEntityModal visible={modalVisible} onHide={() => setModalVisible(false)} onSave={handleSaveEntity} type={modalType} departamentos={departamentos} isEditing={isEditing} entityToEdit={entityToEdit} />

			<Toast ref={toast} />

			{/* Tooltips for edit buttons */}
			{accionistas.map((_, index) => (
				<Tooltip key={`edit-acc-tooltip-${index}`} target={`#edit-acc-${index}`} content='Editar' />
			))}
			{representantesLegales.map((_, index) => (
				<Tooltip key={`edit-rep-tooltip-${index}`} target={`#edit-rep-${index}`} content='Editar' />
			))}

			{/* FINALIZAR */}
			<div className='w-full mt-8'>
				<Button onClick={onFinish} label='Finalizar registro' raised disabled={!isFormValid()} className='w-full' />
			</div>
		</div>
	);
}
