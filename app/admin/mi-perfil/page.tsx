'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getPersonaNaturalById, getPersonaJuridicaById } from '@/lib/services/personaService';
import { changePassword } from '@/lib/services/authService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';

export default function MiPerfilPage() {
	const { user } = useAuth();
	const [profileData, setProfileData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [showPasswordDialog, setShowPasswordDialog] = useState(false);
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
	const [changingPassword, setChangingPassword] = useState(false);
	const toast = useRef<Toast>(null);

	useEffect(() => {
		if (user) {
			loadProfileData();
		}
	}, [user]);

	const loadProfileData = async () => {
		if (!user || !user.perfilCompleto) return;

		try {
			setLoading(true);
			
			// Parsear perfilCompleto: "1N" -> id=1, tipo=N (Natural) o "2J" -> id=2, tipo=J (Jurídica)
			const perfilMatch = user.perfilCompleto.match(/^(\d+)([NJ])$/);
			
			if (!perfilMatch) {
				toast.current?.show({
					severity: 'warn',
					summary: 'Perfil incompleto',
					detail: 'No se pudo identificar el tipo de perfil',
					life: 3000,
				});
				setLoading(false);
				return;
			}
			
			const personaId = parseInt(perfilMatch[1]);
			const tipoPersona = perfilMatch[2]; // 'N' o 'J'
			
			if (tipoPersona === 'N') {
				// Obtener datos de persona natural
				const response = await getPersonaNaturalById(personaId);
				
				if (response.ok) {
					const data = await response.json();
					setProfileData({ ...data.message, tipo: 'natural' });
				} else {
					toast.current?.show({
						severity: 'error',
						summary: 'Error',
						detail: 'No se pudo cargar la información del perfil',
						life: 3000,
					});
				}
			} else if (tipoPersona === 'J') {
				// Obtener datos de persona jurídica
				const response = await getPersonaJuridicaById(personaId);
				
				if (response.ok) {
					const data = await response.json();
					setProfileData({ ...data.message, tipo: 'juridica' });
				} else {
					toast.current?.show({
						severity: 'error',
						summary: 'Error',
						detail: 'No se pudo cargar la información del perfil',
						life: 3000,
					});
				}
			}
		} catch (error) {
			console.error('Error al cargar perfil:', error);
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Ocurrió un error al cargar el perfil',
				life: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	const validatePassword = () => {
		const errors: string[] = [];

		if (!passwordData.currentPassword) {
			errors.push('La contraseña actual es obligatoria');
		}

		if (!passwordData.newPassword) {
			errors.push('La nueva contraseña es obligatoria');
		} else if (passwordData.newPassword.length < 8) {
			errors.push('La nueva contraseña debe tener mínimo 8 caracteres');
		}

		if (!passwordData.confirmPassword) {
			errors.push('Debes confirmar la nueva contraseña');
		} else if (passwordData.newPassword !== passwordData.confirmPassword) {
			errors.push('Las contraseñas no coinciden');
		}

		setPasswordErrors(errors);
		return errors.length === 0;
	};

	const handleChangePassword = async () => {
		if (!validatePassword()) return;

		try {
			setChangingPassword(true);
			const response = await changePassword(passwordData);

			if (response.ok) {
				toast.current?.show({
					severity: 'success',
					summary: 'Éxito',
					detail: 'Contraseña actualizada correctamente',
					life: 3000,
				});
				setShowPasswordDialog(false);
				setPasswordData({
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				});
				setPasswordErrors([]);
			} else {
				const errorData = await response.json();
				toast.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: errorData.message || 'No se pudo cambiar la contraseña',
					life: 3000,
				});
			}
		} catch (error) {
			console.error('Error al cambiar contraseña:', error);
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Ocurrió un error al cambiar la contraseña',
				life: 3000,
			});
		} finally {
			setChangingPassword(false);
		}
	};

	const renderPasswordDialog = () => (
		<Dialog
			header="Cambiar Contraseña"
			visible={showPasswordDialog}
			style={{ width: '90vw', maxWidth: '350px' }}
			onHide={() => {
				setShowPasswordDialog(false);
				setPasswordData({
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				});
				setPasswordErrors([]);
			}}
			footer={
				<div className="flex flex-col sm:flex-row sm:justify-end gap-2">
					<Button
						label="Cancelar"
						icon="pi pi-times"
						onClick={() => setShowPasswordDialog(false)}
						className="p-button-outlined w-full sm:w-auto"
						disabled={changingPassword}
					/>
					<Button
						label="Cambiar"
						icon="pi pi-check"
						onClick={handleChangePassword}
						loading={changingPassword}
						className="w-full sm:w-auto"
						severity="success"
						autoFocus
					/>
				</div>
			}
		>
			<div className="flex flex-col gap-4">
				{passwordErrors.length > 0 && (
					<div className="flex flex-col gap-2">
						{passwordErrors.map((error, index) => (
							<Message key={index} severity="error" text={error} />
						))}
					</div>
				)}

				<div className="flex flex-col gap-2">
					<label htmlFor="currentPassword" className="font-semibold">
						Contraseña Actual *
					</label>
					<Password
						id="currentPassword"
						value={passwordData.currentPassword}
						onChange={(e) =>
							setPasswordData({ ...passwordData, currentPassword: e.target.value })
						}
						feedback={false}
						toggleMask
						className="w-full"
						inputClassName="w-full"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="newPassword" className="font-semibold">
						Nueva Contraseña *
					</label>
					<Password
						id="newPassword"
						value={passwordData.newPassword}
						onChange={(e) =>
							setPasswordData({ ...passwordData, newPassword: e.target.value })
						}
						toggleMask
						className="w-full"
						inputClassName="w-full"
						promptLabel="Ingresa una contraseña"
						weakLabel="Débil"
						mediumLabel="Media"
						strongLabel="Fuerte"
					/>
					<small className="text-gray-500">Mínimo 8 caracteres</small>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="confirmPassword" className="font-semibold">
						Confirmar Nueva Contraseña *
					</label>
					<Password
						id="confirmPassword"
						value={passwordData.confirmPassword}
						onChange={(e) =>
							setPasswordData({ ...passwordData, confirmPassword: e.target.value })
						}
						feedback={false}
						toggleMask
						className="w-full"
						inputClassName="w-full"
					/>
				</div>
			</div>
		</Dialog>
	);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-6 max-w-6xl mx-auto">
			<Toast ref={toast} />

			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
				<p className="text-gray-600 mt-2">Información de tu cuenta y datos personales</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Card de Información Personal */}
				<Card className="lg:col-span-2">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
					<h2 className="text-xl font-semibold text-gray-700">
						Información Personal
					</h2>
					<Button
						icon="pi pi-key"
						label="Cambiar Contraseña"
						className="p-button-outlined w-full sm:w-auto"
						onClick={() => setShowPasswordDialog(true)}
					/>
				</div>

				<Divider />

					{profileData?.tipo === 'natural' ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-semibold text-gray-600">Nombres</label>
								<p className="text-gray-800 mt-1">{profileData.nombres || '-'}</p>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-600">Apellidos</label>
								<p className="text-gray-800 mt-1">{profileData.apellidos || '-'}</p>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-600">
									Tipo de Documento
								</label>
								<p className="text-gray-800 mt-1">{profileData.tipoDocumento || '-'}</p>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-600">
									Número de Documento
								</label>
								<p className="text-gray-800 mt-1">{profileData.numeroDocumento || '-'}</p>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-600">
									Fecha de Nacimiento
								</label>
								<p className="text-gray-800 mt-1">
									{profileData.fechaNacimiento
										? new Date(profileData.fechaNacimiento).toLocaleDateString('es-PE')
										: '-'}
								</p>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-600">Género</label>
								<p className="text-gray-800 mt-1">{profileData.genero || '-'}</p>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="md:col-span-2">
								<label className="text-sm font-semibold text-gray-600">Razón Social</label>
								<p className="text-gray-800 mt-1">{profileData?.razonSocial || '-'}</p>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-600">
									Tipo de Documento
								</label>
								<p className="text-gray-800 mt-1">{profileData?.tipoDocumento || '-'}</p>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-600">RUC</label>
								<p className="text-gray-800 mt-1">{profileData?.numeroDocumento || '-'}</p>
							</div>
						</div>
					)}
				</Card>

				{/* Card de Información de Contacto */}
				<Card>
					<h2 className="text-xl font-semibold text-gray-700 mb-4">Contacto</h2>
					<Divider />
					<div className="flex flex-col gap-4">
						<div>
							<label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
								<i className="pi pi-envelope"></i> Correo Electrónico
							</label>
							<p className="text-gray-800 mt-1">{user?.correo || '-'}</p>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
								<i className="pi pi-phone"></i> Teléfono
							</label>
							<p className="text-gray-800 mt-1">{profileData?.telefono || user?.telefono || '-'}</p>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
								<i className="pi pi-map-marker"></i> País
							</label>
							<p className="text-gray-800 mt-1">{profileData?.paisSeleccionado || '-'}</p>
						</div>
					</div>
				</Card>

				{/* Card de Dirección */}
				{profileData?.direccion && (
					<Card className="lg:col-span-3">
						<h2 className="text-xl font-semibold text-gray-700 mb-4">Dirección</h2>
						<Divider />
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label className="text-sm font-semibold text-gray-600">Departamento</label>
								<p className="text-gray-800 mt-1">
								{profileData.departamentoNombre || '-'}
							</p>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-600">Provincia</label>
							<p className="text-gray-800 mt-1">
								{profileData.provinciaNombre || '-'}
							</p>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-600">Distrito</label>
							<p className="text-gray-800 mt-1">
								{profileData.distritoNombre || '-'}
								</p>
							</div>
							<div className="md:col-span-3">
								<label className="text-sm font-semibold text-gray-600">Dirección</label>
								<p className="text-gray-800 mt-1">{profileData.direccion}</p>
							</div>
						</div>
					</Card>
				)}
			</div>

			{renderPasswordDialog()}
		</div>
	);
}
