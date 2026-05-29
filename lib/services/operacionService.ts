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

export async function actualizarEstadoOperacion(codigoOperacion: string, estado: string): Promise<Response> {
  return apiRequest(`/operaciones/${codigoOperacion}/estado`, {
    method: 'PUT',
    body: JSON.stringify({ estado }),
  });
}

export async function obtenerOperaciones(): Promise<Response> {
	return apiRequest('/operaciones');
}

export async function obtenerOperacionesPorPersona(codigoPersona: string): Promise<Response> {
	return apiRequest(`/operaciones/persona/${codigoPersona}`);
}

export async function obtenerOperacionesAdmin(desde?: string, hasta?: string, estados?: string[]): Promise<Response> {
  let url = '/operaciones/admin';
  const params = new URLSearchParams();
  if (desde && hasta) {
    params.append('desde', desde);
    params.append('hasta', hasta);
  }
  if (estados && estados.length > 0) {
    params.append('estados', estados.join(','));
  }
  const qs = params.toString();
  if (qs) url += `?${qs}`;
  return apiRequest(url);
}

export async function obtenerEstadisticas(desde: string, hasta: string, agrupacion: string): Promise<Response> {
  return apiRequest(`/operaciones/admin/estadisticas?desde=${encodeURIComponent(desde)}&hasta=${encodeURIComponent(hasta)}&agrupacion=${encodeURIComponent(agrupacion)}`);
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