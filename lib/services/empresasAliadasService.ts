import { API_BASE_URL } from '../utils/constants';

export interface EmpresaAliada {
  id: number;
  nombre: string;
  url_web: string | null;
  logo_url: string;
  activa: number;
  creado_en: string;
  actualizado_en: string;
}

// Helper: build absolute logo URL from backend
export function buildLogoUrl(logo_url: string): string {
  if (!logo_url) return '';
  if (logo_url.startsWith('http')) return logo_url;
  const base = API_BASE_URL.replace('/api', '');
  return `${base}${logo_url}`;
}

// Public — no token needed
export async function getEmpresasPublic(): Promise<EmpresaAliada[]> {
  const res = await fetch(`${API_BASE_URL}/empresas-aliadas/public`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Error al obtener empresas aliadas');
  return json.data;
}

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Admin — with token
export async function getEmpresas(): Promise<EmpresaAliada[]> {
  const res = await fetch(`${API_BASE_URL}/empresas-aliadas`, {
    headers: getAuthHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Error al obtener empresas');
  return json.data;
}

export async function createEmpresa(formData: FormData): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE_URL}/empresas-aliadas`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Error al crear empresa');
  return json.data;
}

export async function updateEmpresa(id: number, formData: FormData): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/empresas-aliadas/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Error al actualizar empresa');
}

export async function deleteEmpresa(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/empresas-aliadas/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Error al eliminar empresa');
}

export async function toggleActivaEmpresa(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/empresas-aliadas/${id}/activa`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Error al cambiar visibilidad');
}
