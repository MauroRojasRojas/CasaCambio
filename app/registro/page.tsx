'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import TermsPrivacyModals from '../../components/TermsPrivacyModals';
import ProfileStep from '../../components/forms/ProfileStep';
import AccountStep from '../../components/forms/AccountStep';
import IdentityStep from '../../components/forms/IdentityStep';
import { getDepartamentos, getProvincias, getDistritos } from '../../lib/services/ubigeoService';
import { registrarPersonaNatural, registrarPersonaJuridica } from '../../lib/services/personaService';
import { LegalEntityModel, LegalRepresentativeModel, NaturalPersonModel, ShareholderModel } from '@/data/persons.model';
import { DepartmentModel, DistrictModel, ProvinceModel } from '@/data/ubigeo.model';
import { COUNTRIES } from '../../lib/utils/constants';

export default function Page() {
	const router = useRouter();
	const toast = useRef<Toast>(null);
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const [profile, setProfile] = useState<'persona' | 'empresa' | null>(null);
	const [showTermsModal, setShowTermsModal] = useState(false);
	const [showPrivacyModal, setShowPrivacyModal] = useState(false);

	// Paso 3
	const [dni, setDni] = useState('');
	const [docType, setDocType] = useState('DNI');
	const [fullName, setFullName] = useState('');
	const [nombres, setNombres] = useState('');
	const [apellidos, setApellidos] = useState('');
	const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
	const [errorFechaNacimiento, setErrorFechaNacimiento] = useState('');

	// Paso 2
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [termsError, setTermsError] = useState('Debes aceptar los términos para continuar');

	// País / Teléfono / Ubigeo
	const [phone, setPhone] = useState('');
	const [gender, setGender] = useState('');
	const [country, setCountry] = useState('PE');

	const [selectedDepartamentoId, setSelectedDepartamentoId] = useState('');
	const [selectedProvinciaId, setSelectedProvinciaId] = useState('');
	const [selectedDistritoId, setSelectedDistritoId] = useState('');
	const [address, setAddress] = useState('');

	// Para empresa
	const [accionistas, setAccionistas] = useState<ShareholderModel[]>([]);
	const [representantesLegales, setRepresentantesLegales] = useState<LegalRepresentativeModel[]>([]);
	const [noTengoAccionistas, setNoTengoAccionistas] = useState(false);

	// Ubigeo data
	const [departamentos, setDepartamentos] = useState<DepartmentModel[]>([]);
	const [provincias, setProvincias] = useState<ProvinceModel[]>([]);
	const [distritos, setDistritos] = useState<DistrictModel[]>([]);
	const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);
	const [loadingProvincias, setLoadingProvincias] = useState(false);
	const [loadingDistritos, setLoadingDistritos] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	// Fetch departamentos on mount
	useEffect(() => {
		const fetchDepartamentos = async () => {
			setLoadingDepartamentos(true);
			try {
				const data = await getDepartamentos();
				setDepartamentos(data);
			} catch (error) {
				console.error('Error fetching departamentos:', error);
			} finally {
				setLoadingDepartamentos(false);
			}
		};
		fetchDepartamentos();
	}, []);

	// Fetch provincias when departamento changes
	useEffect(() => {
		if (selectedDepartamentoId) {
			const fetchProvincias = async () => {
				setLoadingProvincias(true);
				try {
					const data = await getProvincias(selectedDepartamentoId);
					setProvincias(data);
					setSelectedProvinciaId('');
					setDistritos([]);
				} catch (error) {
					console.error('Error fetching provincias:', error);
				} finally {
					setLoadingProvincias(false);
				}
			};
			fetchProvincias();
		} else {
			setProvincias([]);
			setDistritos([]);
		}
	}, [selectedDepartamentoId]);

	// Fetch distritos when provincia changes
	useEffect(() => {
		if (selectedProvinciaId) {
			const fetchDistritos = async () => {
				setLoadingDistritos(true);
				try {
					const data = await getDistritos(selectedProvinciaId);
					setDistritos(data);
					setSelectedDistritoId('');
				} catch (error) {
					console.error('Error fetching distritos:', error);
				} finally {
					setLoadingDistritos(false);
				}
			};
			fetchDistritos();
		} else {
			setDistritos([]);
		}
	}, [selectedProvinciaId]);

	// Validar edad cuando cambia fechaNacimiento
	useEffect(() => {
		if (fechaNacimiento) {
			const today = new Date();
			const birthDate = fechaNacimiento;
			let age = today.getFullYear() - birthDate.getFullYear();
			const monthDiff = today.getMonth() - birthDate.getMonth();
			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			if (age < 18) {
				setErrorFechaNacimiento('Debes ser mayor de 18 años para registrarte');
			} else {
				setErrorFechaNacimiento('');
			}
		} else {
			setErrorFechaNacimiento('');
		}
	}, [fechaNacimiento]);

	// Set default docType based on profile
	useEffect(() => {
		if (profile === 'persona') {
			setDocType('DNI');
			setDni('');
		} else if (profile === 'empresa') {
			setDocType('RUC');
			setDni('');
		}
	}, [profile]);

	// Funciones para accionistas
	const agregarAccionista = () => {
		setAccionistas([...accionistas]);
	};

	const removerAccionista = (index: number) => {
		setAccionistas(accionistas.filter((_, i) => i !== index));
	};

	const actualizarAccionista = (index: number, campo: keyof any, valor: string | number) => {
		const nuevos = [...accionistas];
		nuevos[index] = { ...nuevos[index], [campo]: valor };
		setAccionistas(nuevos);
	};

	// Funciones para representantes
	const agregarRepresentante = () => {
		setRepresentantesLegales([...representantesLegales]);
	};

	const removerRepresentante = (index: number) => {
		setRepresentantesLegales(representantesLegales.filter((_, i) => i !== index));
	};

	const actualizarRepresentante = (index: number, campo: keyof any, valor: string) => {
		const nuevos = [...representantesLegales];
		nuevos[index] = { ...nuevos[index], [campo]: valor };
		setRepresentantesLegales(nuevos);
	};

	return (
		<>
			<main className='min-h-screen w-full bg-[#193160] flex items-center justify-center'>
				<TermsPrivacyModals showTermsModal={showTermsModal} setShowTermsModal={setShowTermsModal} showPrivacyModal={showPrivacyModal} setShowPrivacyModal={setShowPrivacyModal} />

				<div className='bg-white w-[90%] max-w-6xl max-h-[90vh] rounded-3xl shadow-xl overflow-y-auto grid grid-cols-1 lg:grid-cols-2'>
					{/* ============================ */}
					{/*      PASO 1 — PERFIL         */}
					{/* ============================ */}
					{step === 1 && <ProfileStep profile={profile} setProfile={setProfile} onNext={() => setStep(2)} />}

					{/* ============================ */}
					{/*      PASO 2 — CUENTA          */}
					{/* ============================ */}
					{step === 2 && (
						<AccountStep
							email={email}
							setEmail={setEmail}
							emailError={emailError}
							setEmailError={setEmailError}
							password={password}
							setPassword={setPassword}
							confirmPassword={confirmPassword}
							setConfirmPassword={setConfirmPassword}
							passwordError={passwordError}
							setPasswordError={setPasswordError}
							termsAccepted={termsAccepted}
							setTermsAccepted={setTermsAccepted}
							termsError={termsError}
							setTermsError={setTermsError}
							setShowTermsModal={setShowTermsModal}
							setShowPrivacyModal={setShowPrivacyModal}
							onNext={() => {
								if (!emailError && !passwordError && !termsError && email && password && confirmPassword && termsAccepted) {
									setStep(3);
								}
							}}
							onBack={() => setStep(1)}
						/>
					)}

					{/* ============================ */}
					{/*      PASO 3 — IDENTIDAD       */}
					{/* ============================ */}
					{step === 3 && (
	<IdentityStep
		profile={profile}
		docType={docType}
		setDocType={setDocType}
		dni={dni}
		setDni={setDni}
		fullName={fullName}
		setFullName={setFullName}
		nombres={nombres}
		setNombres={setNombres}
		apellidos={apellidos}
		setApellidos={setApellidos}
		fechaNacimiento={fechaNacimiento}
		setFechaNacimiento={setFechaNacimiento}
		errorFechaNacimiento={errorFechaNacimiento}
		gender={gender}
		setGender={setGender}
		country={country}
		setCountry={setCountry}
		phone={phone}
		setPhone={setPhone}
		selectedDepartamentoId={selectedDepartamentoId}
		setSelectedDepartamentoId={setSelectedDepartamentoId}
		selectedProvinciaId={selectedProvinciaId}
		setSelectedProvinciaId={setSelectedProvinciaId}
		selectedDistritoId={selectedDistritoId}
		setSelectedDistritoId={setSelectedDistritoId}
		departamentos={departamentos}
		provincias={provincias}
		distritos={distritos}
		loadingDepartamentos={loadingDepartamentos}
		loadingProvincias={loadingProvincias}
		loadingDistritos={loadingDistritos}
		address={address}
		setAddress={setAddress}
		accionistas={accionistas}
		setAccionistas={setAccionistas}
		noTengoAccionistas={noTengoAccionistas}
		setNoTengoAccionistas={setNoTengoAccionistas}
		representantesLegales={representantesLegales}
		setRepresentantesLegales={setRepresentantesLegales}
		agregarAccionista={agregarAccionista}
		removerAccionista={removerAccionista}
		actualizarAccionista={actualizarAccionista}
		agregarRepresentante={agregarRepresentante}
		removerRepresentante={removerRepresentante}
		actualizarRepresentante={actualizarRepresentante}
		onBack={() => setStep(2)}
		isSubmitting={isSubmitting}
		onFinish={async () => {
			if (isSubmitting) return;

			let valid = true;

			if (profile === 'empresa') {
				// validaciones extra si deseas
			}

			if (!valid || errorFechaNacimiento) {
				alert('Completa todos los campos requeridos');
				return;
			}

			setIsSubmitting(true);

			try {
				if (profile === 'persona') {
					const data: NaturalPersonModel = {
						tipoDocumento: docType,
						numeroDocumento: dni,
						nombres: nombres.trim(),
						apellidos: apellidos.trim(),
						fechaNacimiento: fechaNacimiento ? fechaNacimiento.toISOString().split('T')[0] : '',
						genero:
							gender === 'M'
								? 'Masculino'
								: gender === 'F'
									? 'Femenino'
									: gender === 'X'
										? 'Otro'
										: gender,
						correo: email,
						contrasena: password,
						confirmarContrasena: confirmPassword,
						terminosAceptados: termsAccepted,
						paisSeleccionado: COUNTRIES.find((c) => c.code.toUpperCase() === country)?.name || '',
						telefono: phone,
						departamentoSeleccionado: selectedDepartamentoId,
						provinciaSeleccionada: selectedProvinciaId,
						distritoSeleccionado: selectedDistritoId,
						estadoExtranjero: '',
						direccion: address,
					};

					const response = await registrarPersonaNatural(data);

					if (response.ok) {
						toast.current?.show({
							severity: 'success',
							summary: 'Éxito',
							detail: 'Registro exitoso. Redirigiendo al login...',
						});

						setTimeout(() => {
							router.push('/login');
						}, 2000);

						return;
					}

					const errorData = await response.json();
					toast.current?.show({
						severity: 'error',
						summary: 'Error',
						detail: errorData.error || errorData.message || 'Error desconocido',
					});

					setIsSubmitting(false);
				} else if (profile === 'empresa') {
					const data: LegalEntityModel = {
						tipoDocumento: 'RUC',
						numeroDocumento: dni,
						razonSocial: fullName,
						accionistas: noTengoAccionistas ? [] : accionistas,
						representantesLegales: representantesLegales,
						correo: email,
						contrasena: password,
						confirmarContrasena: confirmPassword,
						terminosAceptados: termsAccepted,
						paisSeleccionado: COUNTRIES.find((c) => c.code.toUpperCase() === country)?.name || '',
						telefono: phone,
						departamentoSeleccionado: selectedDepartamentoId,
						provinciaSeleccionada: selectedProvinciaId,
						distritoSeleccionado: selectedDistritoId,
						estadoExtranjero: '',
						direccion: address,
					};

					const response = await registrarPersonaJuridica(data);

					if (response.ok) {
						toast.current?.show({
							severity: 'success',
							summary: 'Éxito',
							detail: 'Registro exitoso. Redirigiendo al login...',
						});

						setTimeout(() => {
							router.push('/login');
						}, 2000);

						return;
					}

					const errorData = await response.json();
					toast.current?.show({
						severity: 'error',
						summary: 'Error',
						detail: errorData.error || errorData.message || 'Error desconocido',
					});

					setIsSubmitting(false);
				} else {
					setIsSubmitting(false);
				}
			} catch (error) {
				console.error(error);

				toast.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: 'Error de red o desconocido',
				});

				setIsSubmitting(false);
			}
		}}
	/>
)}

					{/* IMAGEN SOLO PASO 1 Y 2 */}
					{(step === 1 || step === 2) && (
	<div className='hidden lg:flex items-center justify-center bg-white'>
		<div className='w-full flex items-center justify-center p-6'>
			<div className='w-[340px] xl:w-[380px] 2xl:w-[400px] h-[470px] xl:h-[520px] overflow-hidden rounded-[28px] bg-[#f8f8f8]'>
				<Image
					src='/assets/registrate.jpg'
					alt='Registro banner'
					width={1414}
					height={2000}
					className='w-full h-full object-cover object-center'
					loading='eager'
				/>
			</div>
		</div>
	</div>
)}
				</div>
			</main>
			<Toast ref={toast} />
		</>
	);
}
