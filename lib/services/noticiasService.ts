import { API_BASE_URL } from '@/lib/utils/constants';

export interface Noticia {
  id: number;
  titulo: string;
  subtitulo: string | null;
  resumen: string | null;
  cuerpo: string | null;
  imagen_url: string | null;
  categoria: 'Tipo de cambio' | 'Economía' | 'Empresa' | 'Promoción' | 'Mercados' | 'Internacional';
  tamanio: 'PEQUENA' | 'MEDIANA' | 'GRANDE';
  posicion_imagen: 'ARRIBA' | 'IZQUIERDA' | 'DERECHA' | 'FONDO';
  color_acento: string;
  link_externo: string | null;
  animacion: 'FADE' | 'SLIDE' | 'ZOOM' | 'NINGUNA';
  en_ticker: number;
  activa: number;
  orden: number;
  fecha_publicacion: string;
  creado_en: string;
  actualizado_en: string;
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

export const noticiasService = {
  async getNoticiasPublic(): Promise<Noticia[]> {
    const res = await fetch(`${API_BASE_URL}/noticias/public`);
    const json: ApiResponse<Noticia[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async getNoticiasTicker(): Promise<Noticia[]> {
    const res = await fetch(`${API_BASE_URL}/noticias/ticker`);
    const json: ApiResponse<Noticia[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async getNoticias(): Promise<Noticia[]> {
    const res = await fetch(`${API_BASE_URL}/noticias`, {
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<Noticia[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async createNoticia(formData: FormData): Promise<{ id: number }> {
    const res = await fetch(`${API_BASE_URL}/noticias`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });
    const json: ApiResponse<{ id: number }> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async updateNoticia(id: number, formData: FormData): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/noticias/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData,
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },

  async deleteNoticia(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/noticias/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },

  async toggleActiva(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/noticias/${id}/activa`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    const json: ApiResponse<null> = await res.json();
    if (!json.success) throw new Error(json.message);
  },
};
