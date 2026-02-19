import type { NaturalPersonModel, LegalEntityModel } from '../../data/persons.model';
import { apiRequest } from '../utils/apiHelper';

export interface PersonaResponse {
	success: boolean;
	data: any;
}

export async function registrarPersonaNatural(data: NaturalPersonModel): Promise<Response> {
	return apiRequest('/personas/naturales', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}

export async function registrarPersonaJuridica(data: LegalEntityModel): Promise<Response> {
	return apiRequest('/personas/juridicas', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}

export async function getPersonaNaturalById(id: number): Promise<Response> {
	return apiRequest(`/personas/naturales/${id}`, {
		method: 'GET',
	});
}

export async function getPersonaJuridicaById(id: number): Promise<Response> {
	return apiRequest(`/personas/juridicas/${id}`, {
		method: 'GET',
	});
}

export async function updatePersonaNatural(id: number, data: Partial<NaturalPersonModel>): Promise<Response> {
	return apiRequest(`/personas/naturales/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
}

export async function updatePersonaJuridica(id: number, data: Partial<LegalEntityModel>): Promise<Response> {
	return apiRequest(`/personas/juridicas/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});
}