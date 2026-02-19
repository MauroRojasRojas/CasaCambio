import type { BankAccountModel } from '../../data/bank-account.model';
import { apiRequest } from '../utils/apiHelper';

export async function registrarCuenta(cuenta: Omit<BankAccountModel, 'id' | 'fechaRegistro' | 'saldo'>): Promise<Response> {
	return apiRequest('/cuentas-bancarias', {
		method: 'POST',
		body: JSON.stringify(cuenta),
	});
}

export async function editarCuenta(id: string, cuenta: Partial<BankAccountModel>): Promise<Response> {
	return apiRequest(`/cuentas-bancarias/${id}`, {
		method: 'PUT',
		body: JSON.stringify(cuenta),
	});
}

export async function obtenerCuentas(): Promise<Response> {
	return apiRequest('/cuentas-bancarias');
}

export async function obtenerCuentasPorPersona(codigoPersona: string): Promise<Response> {
	return apiRequest(`/cuentas-bancarias/persona/${codigoPersona}`);
}