import { API_BASE_URL } from '@/lib/utils/constants';

export interface RedSocial {
  id: number | null;
  red: string;
  url: string;
  activa: number;
  orden: number;
  creado_en?: string;
  actualizado_en?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  code: string;
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const redesSocialesService = {
  async getRedesPublic(): Promise<RedSocial[]> {
    const res = await fetch(`${API_BASE_URL}/redes-sociales/public`);
    const json: ApiResponse<RedSocial[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async getRedes(): Promise<RedSocial[]> {
    const res = await fetch(`${API_BASE_URL}/redes-sociales`, {
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<RedSocial[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async upsertRed(data: { red: string; url: string; activa: boolean; orden: number }): Promise<{ id: number }> {
    const res = await fetch(`${API_BASE_URL}/redes-sociales`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json: ApiResponse<{ id: number }> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async toggleActiva(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/redes-sociales/${id}/activa`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },

  async deleteRed(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/redes-sociales/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },
};
