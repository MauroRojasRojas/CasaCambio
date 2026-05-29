import { API_BASE_URL } from '@/lib/utils/constants';

export interface Comentario {
  id: number;
  nombre_cliente: string;
  foto_url: string | null;
  comentario: string;
  estrellas: number;
  visible: number;
  creado_en: string;
  actualizado_en: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  code: string;
}

export const comentariosService = {
  async getComentarios(): Promise<Comentario[]> {
    const res = await fetch(`${API_BASE_URL}/comentarios`);
    const json: ApiResponse<Comentario[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async createComentario(formData: FormData): Promise<{ id: number }> {
    const res = await fetch(`${API_BASE_URL}/comentarios`, {
      method: 'POST',
      body: formData,
    });
    const json: ApiResponse<{ id: number }> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async updateComentario(id: number, formData: FormData): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/comentarios/${id}`, {
      method: 'PUT',
      body: formData,
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },

  async deleteComentario(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/comentarios/${id}`, {
      method: 'DELETE',
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },

  async toggleVisible(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/comentarios/${id}/visible`, {
      method: 'PATCH',
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },
};
