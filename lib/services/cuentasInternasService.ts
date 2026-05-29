import { apiRequest } from '../utils/apiHelper';

export interface CuentaInterna {
  id: number;
  banco: string;
  tipo_cuenta: string;
  numero_cuenta: string;
  cci: string | null;
  moneda: 'PEN' | 'USD';
  activa: number;
  creado_en: string;
  actualizado_en: string;
}

export const cuentasInternasService = {
  async getCuentasInternas(): Promise<CuentaInterna[]> {
    const response = await apiRequest('/cuentas-internas');
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Error al obtener cuentas internas');
    return json.data;
  },

  async getCuentasByMoneda(moneda: 'PEN' | 'USD'): Promise<CuentaInterna[]> {
    const response = await apiRequest(`/cuentas-internas/moneda/${moneda}`);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Error al obtener cuentas internas por moneda');
    return json.data;
  },

  async createCuenta(data: Partial<CuentaInterna>): Promise<{ id: number }> {
    const response = await apiRequest('/cuentas-internas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Error al crear cuenta interna');
    return json.data;
  },

  async updateCuenta(id: number, data: Partial<CuentaInterna>): Promise<void> {
    const response = await apiRequest(`/cuentas-internas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Error al actualizar cuenta interna');
  },

  async deleteCuenta(id: number): Promise<void> {
    const response = await apiRequest(`/cuentas-internas/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Error al eliminar cuenta interna');
  },

  async toggleActiva(id: number): Promise<void> {
    const response = await apiRequest(`/cuentas-internas/${id}/activa`, {
      method: 'PATCH',
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || 'Error al cambiar visibilidad');
  }
};
