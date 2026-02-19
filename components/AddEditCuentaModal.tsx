'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { registrarCuenta, editarCuenta } from '../lib/services/cuentaBancariaService';
import { BankAccountModel } from '@/data/bank-account.model';

interface AddEditCuentaModalProps {
	visible: boolean;
	onHide: () => void;
	cuenta?: BankAccountModel | null;
	onSave: (cuenta: BankAccountModel) => void;
}

export default function AddEditCuentaModal({ visible, onHide, cuenta, onSave }: AddEditCuentaModalProps) {
	const [formData, setFormData] = useState<Partial<BankAccountModel>>({
		banco: '',
		numeroCuenta: '',
		tipoCuenta: 'Ahorros',
		moneda: 'PEN',
		titular: '',
		estado: true,
		saldo: 0,
	});
	const [loading, setLoading] = useState(false);
	const toast = React.useRef<Toast>(null);

	const tiposCuenta = [
		{ label: 'Ahorros', value: 'Ahorros' },
		{ label: 'Corriente', value: 'Corriente' },
		{ label: 'Plazo Fijo', value: 'Plazo Fijo' },
	];

	const monedas = [
		{ label: 'PEN', value: 'PEN' },
		{ label: 'USD', value: 'USD' },
		{ label: 'EUR', value: 'EUR' },
	];

	const estados = [
		{ label: 'Activa', value: true },
		{ label: 'Inactiva', value: false },
	];

	useEffect(() => {
		if (cuenta) {
			setFormData(cuenta);
		} else {
			setFormData({
				banco: '',
				numeroCuenta: '',
				tipoCuenta: 'Ahorros',
				moneda: 'PEN',
				titular: '',
				estado: true,
				saldo: 0,
			});
		}
	}, [cuenta, visible]);

	const handleSave = async () => {
		setLoading(true);
		try {
			const user = JSON.parse(localStorage.getItem('user') || '{}');
			const codigoPersona = user.perfilCompleto || '';
			const dataToSend = { ...formData, codigoPersona };

			let response: Response;
			if (cuenta) {
				response = await editarCuenta(cuenta.id, dataToSend);
			} else {
				response = await registrarCuenta(dataToSend as Omit<BankAccountModel, 'id' | 'fechaRegistro' | 'saldo'>);
			}
			if (response.ok) {
				const savedCuenta = await response.json();
				onSave(savedCuenta);
				toast.current?.show({ severity: 'success', summary: 'Éxito', detail: cuenta ? 'Cuenta editada correctamente' : 'Cuenta registrada correctamente' });
				onHide();
			} else {
				const errorData = await response.json();
				toast.current?.show({ severity: 'error', summary: 'Error', detail: errorData.error || errorData.message || 'Error desconocido' });
			}
		} catch (error) {
			toast.current?.show({ severity: 'error', summary: 'Error', detail: error instanceof Error ? error.message : 'Error de red o desconocido' });
		} finally {
			setLoading(false);
		}
	};

	const footerContent = (
		<div>
			<Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text" severity="danger" outlined  />
			<Button label="Guardar" icon="pi pi-check" loading={loading} onClick={handleSave} autoFocus />
		</div>
	);

	return (
		<>
			<Dialog
				header={cuenta ? 'Editar Cuenta' : 'Registrar Cuenta'}
				visible={visible}
				style={{ width: '50vw' }}
				onHide={onHide}
				footer={footerContent}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="col-span-2 flex flex-col">
						<label htmlFor="titular" className="mb-2 font-semibold">Titular</label>
						<InputText
							id="titular"
							value={formData.titular || ''}
							onChange={(e) => setFormData({ ...formData, titular: e.target.value })}
							placeholder="Ingrese el titular"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="banco" className="mb-2 font-semibold">Banco</label>
						<InputText
							id="banco"
							value={formData.banco || ''}
							onChange={(e) => setFormData({ ...formData, banco: e.target.value })}
							placeholder="Ingrese el banco"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="numeroCuenta" className="mb-2 font-semibold">Número de Cuenta</label>
						<InputText
							id="numeroCuenta"
							value={formData.numeroCuenta || ''}
							onChange={(e) => setFormData({ ...formData, numeroCuenta: e.target.value })}
							placeholder="Ingrese el número de cuenta"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="tipoCuenta" className="mb-2 font-semibold">Tipo de Cuenta</label>
						<Dropdown
							id="tipoCuenta"
							value={formData.tipoCuenta}
							options={tiposCuenta}
							onChange={(e) => setFormData({ ...formData, tipoCuenta: e.value })}
							placeholder="Seleccione el tipo"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="moneda" className="mb-2 font-semibold">Moneda</label>
						<Dropdown
							id="moneda"
							value={formData.moneda}
							options={monedas}
							onChange={(e) => setFormData({ ...formData, moneda: e.value })}
							placeholder="Seleccione la moneda"
						/>
					</div>
					<div className="hidden">
						<label htmlFor="estado" className="mb-2 font-semibold">Estado</label>
						<Dropdown
							id="estado"
							value={formData.estado}
							options={estados}
							onChange={(e) => setFormData({ ...formData, estado: e.value })}
							placeholder="Seleccione el estado"
						/>
					</div>
				</div>
			</Dialog>
			<Toast ref={toast} />
		</>
	);
}