import { API_BASE_URL } from '../utils/constants';

export interface ConfigTasas {
    id: number;
    modo: 'AUTO' | 'MANUAL';
    margen_compra: number;
    margen_venta: number;
    tasa_compra_usd_manual: number | null;
    tasa_venta_usd_manual: number | null;
    actualizado_en: string;
}

export async function getConfigTasas(): Promise<ConfigTasas> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/config-tasas`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return {
        ...result.data,
        margen_compra: Number(result.data.margen_compra),
        margen_venta: Number(result.data.margen_venta),
        tasa_compra_usd_manual: result.data.tasa_compra_usd_manual ? Number(result.data.tasa_compra_usd_manual) : null,
        tasa_venta_usd_manual: result.data.tasa_venta_usd_manual ? Number(result.data.tasa_venta_usd_manual) : null,
    };
}


export async function getTasaApi(): Promise<number | null> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/tasas-cambio/tasa-api`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    return result.data?.tasa_api ? Number(result.data.tasa_api) : null;
}





export async function updateConfigTasas(config: {
    modo: 'AUTO' | 'MANUAL';
    margen_compra?: number;
    margen_venta?: number;
    tasa_compra_usd_manual?: number;
    tasa_venta_usd_manual?: number;
}): Promise<ConfigTasas> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/config-tasas`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(config)
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
}

export async function forzarActualizacionTasa(): Promise<void> {
    const token = localStorage.getItem('token');
    await fetch(`${API_BASE_URL}/tasas-cambio/actualizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}