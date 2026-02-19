import type { OperationModel } from '../../data/operation.model';
import { apiRequest } from '../utils/apiHelper';

export async function registrarOperacion(operacion: Omit<OperationModel, 'id'>): Promise<Response> {
	return apiRequest('/operaciones', {
		method: 'POST',
		body: JSON.stringify(operacion),
	});
}

export async function editarOperacion(id: number, operacion: Partial<OperationModel>): Promise<Response> {
	return apiRequest(`/operaciones/${id}`, {
		method: 'PUT',
		body: JSON.stringify(operacion),
	});
}

export async function obtenerOperaciones(): Promise<Response> {
	return apiRequest('/operaciones');
}

export async function obtenerOperacionesPorPersona(codigoPersona: string): Promise<Response> {
	return apiRequest(`/operaciones/persona/${codigoPersona}`);
}