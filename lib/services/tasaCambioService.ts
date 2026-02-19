// lib/services/tasaCambioService.ts

import { API_BASE_URL } from '../utils/constants';

export interface TasaCambio {
	id: number;
	fecha_hora: string;
	tasa_compra_usd: number;
	tasa_venta_usd: number;
	tasa_compra_pen: number;
	tasa_venta_pen: number;
	created_at: string;
}

export interface TasaCambioResponse {
	success: boolean;
	data: TasaCambio;
}

export interface TasaCambioHistoricoResponse {
	success: boolean;
	data: TasaCambio[];
}

export interface TasaHistoricaDesdeInicioAno {
	fecha: string;
	tasa_usd_pen: number;
	tasa_pen_usd: number;
}

export interface TasasDesdeInicioAnoResponse {
	success: boolean;
	status: number;
	message: string;
	data: TasaHistoricaDesdeInicioAno[];
	code: string;
	timestamp: string;
}

/**
 * Obtener la tasa de cambio actual
 */
export async function getTasaActual(): Promise<TasaCambio> {
	const response = await fetch(`${API_BASE_URL}/tasas-cambio/actual`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-store', // No cachear para obtener siempre la tasa más reciente
	});

	if (!response.ok) {
		throw new Error('Error al obtener la tasa de cambio actual');
	}

	const result: TasaCambioResponse = await response.json();
	
	if (!result.success) {
		throw new Error('La respuesta no fue exitosa');
	}

	// Asegurar que los valores numéricos sean números
	return {
		...result.data,
		tasa_compra_usd: Number(result.data.tasa_compra_usd),
		tasa_venta_usd: Number(result.data.tasa_venta_usd),
		tasa_compra_pen: Number(result.data.tasa_compra_pen),
		tasa_venta_pen: Number(result.data.tasa_venta_pen),
	};
}

/**
 * Obtener el histórico de tasas de cambio
 * @param limit Número de registros a obtener (por defecto 100)
 */
export async function getTasasHistorico(limit: number = 100): Promise<TasaCambio[]> {
	const response = await fetch(`${API_BASE_URL}/tasas-cambio/historico?limit=${limit}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Error al obtener el histórico de tasas');
	}

	const result: TasaCambioHistoricoResponse = await response.json();
	
	if (!result.success) {
		throw new Error('La respuesta no fue exitosa');
	}

	// Asegurar que los valores numéricos sean números
	return result.data.map(tasa => ({
		...tasa,
		tasa_compra_usd: Number(tasa.tasa_compra_usd),
		tasa_venta_usd: Number(tasa.tasa_venta_usd),
		tasa_compra_pen: Number(tasa.tasa_compra_pen),
		tasa_venta_pen: Number(tasa.tasa_venta_pen),
	}));
}

/**
 * Obtener tasas en un rango de fechas
 * @param fechaInicio Fecha inicial en formato YYYY-MM-DD
 * @param fechaFin Fecha final en formato YYYY-MM-DD
 */
export async function getTasasRango(fechaInicio: string, fechaFin: string): Promise<TasaCambio[]> {
	const response = await fetch(
		`${API_BASE_URL}/tasas-cambio/rango?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	if (!response.ok) {
		throw new Error('Error al obtener tasas por rango');
	}

	const result: TasaCambioHistoricoResponse = await response.json();
	
	if (!result.success) {
		throw new Error('La respuesta no fue exitosa');
	}

	// Asegurar que los valores numéricos sean números
	return result.data.map(tasa => ({
		...tasa,
		tasa_compra_usd: Number(tasa.tasa_compra_usd),
		tasa_venta_usd: Number(tasa.tasa_venta_usd),
		tasa_compra_pen: Number(tasa.tasa_compra_pen),
		tasa_venta_pen: Number(tasa.tasa_venta_pen),
	}));
}

/**
 * Obtener tasas de cambio desde el inicio del año hasta la fecha actual
 */
export async function getTasasDesdeInicioAno(): Promise<TasaHistoricaDesdeInicioAno[]> {
	// Obtener fecha actual del sistema en formato dd/mm/yyyy
	const hoy = new Date();
	const dia = String(hoy.getDate()).padStart(2, '0');
	const mes = String(hoy.getMonth() + 1).padStart(2, '0');
	const anio = hoy.getFullYear();
	const fechaActual = `${dia}/${mes}/${anio}`;

	const response = await fetch(`${API_BASE_URL}/tasas-cambio/desde-inicio-ano/${fechaActual}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Error al obtener tasas desde inicio de año');
	}

	const result: TasasDesdeInicioAnoResponse = await response.json();
	
	if (!result.success) {
		throw new Error('La respuesta no fue exitosa');
	}

	// Asegurar que los valores numéricos sean números
	return result.data.map(tasa => ({
		fecha: tasa.fecha,
		tasa_usd_pen: Number(tasa.tasa_usd_pen),
		tasa_pen_usd: Number(tasa.tasa_pen_usd),
	}));
}

/**
 * Calcular cuántos minutos han pasado desde la última actualización
 * @param fechaHora Fecha y hora de la tasa
 */
export function calcularMinutosDesdeActualizacion(fechaHora: string): number {
	const ahora = new Date().getTime();
	const fechaTasa = new Date(fechaHora).getTime();
	return Math.floor((ahora - fechaTasa) / 60000);
}
