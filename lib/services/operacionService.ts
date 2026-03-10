import { CreateComplaintBody } from '@/data/reclamos.model';
import type { OperationModel } from '../../data/operation.model';
import { apiRequest } from '../utils/apiHelper';
import { CreateContactBody } from '@/data/contactanos.model';

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

export async function reclamos(body: CreateComplaintBody): Promise<Response> {
	return apiRequest('/reclamos', {
		method: 'POST',
		body: JSON.stringify(body),
	});
}

export async function contactanos(body: CreateContactBody): Promise<Response> {
	return apiRequest('/contact-us', {
		method: 'POST',
		body: JSON.stringify(body),
	});
}