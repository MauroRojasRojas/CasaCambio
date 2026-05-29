import { API_BASE_URL } from '@/lib/utils/constants';

export interface Banco {
  id: number;
  nombre: string;
  logo: string;
  visible: number;
  disponible: number;
  orden: number;
  created_at: string;
  updated_at: string;
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

export const bancosService = {
  async getBancosPublic(): Promise<Banco[]> {
    const res = await fetch(`${API_BASE_URL}/bancos/public`);
    const json: ApiResponse<Banco[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async getAll(): Promise<Banco[]> {
    const res = await fetch(`${API_BASE_URL}/bancos`, {
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<Banco[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async create(data: { nombre: string; logo: string; visible: boolean; disponible: boolean; orden: number }): Promise<{ id: number }> {
    const res = await fetch(`${API_BASE_URL}/bancos`, {
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

  async update(id: number, data: Partial<{ nombre: string; logo: string; visible: boolean; disponible: boolean; orden: number }>): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/bancos/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },

  async toggleVisible(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/bancos/${id}/visible`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },

  async toggleDisponible(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/bancos/${id}/disponible`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/bancos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },
};
