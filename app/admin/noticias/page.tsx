'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { ToggleButton } from 'primereact/togglebutton';
import { noticiasService } from '@/lib/services/noticiasService';
import type { Noticia } from '@/lib/services/noticiasService';

const API_STORAGE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:3001';

const CATEGORIAS = [
  { label: 'Tipo de cambio', value: 'Tipo de cambio' },
  { label: 'Economía', value: 'Economía' },
  { label: 'Empresa', value: 'Empresa' },
  { label: 'Promoción', value: 'Promoción' },
  { label: 'Mercados', value: 'Mercados' },
  { label: 'Internacional', value: 'Internacional' },
];

const TAMANIOS = [
  { label: 'Pequeña', value: 'PEQUENA', icon: 'pi pi-stop' },
  { label: 'Mediana', value: 'MEDIANA', icon: 'pi pi-th-large' },
  { label: 'Grande', value: 'GRANDE', icon: 'pi pi-box' },
];

const POSICIONES_IMAGEN = [
  { label: 'Arriba', value: 'ARRIBA', icon: 'pi pi-arrow-up' },
  { label: 'Izquierda', value: 'IZQUIERDA', icon: 'pi pi-arrow-left' },
  { label: 'Derecha', value: 'DERECHA', icon: 'pi pi-arrow-right' },
  { label: 'Fondo', value: 'FONDO', icon: 'pi pi-image' },
];

const ANIMACIONES = [
  { label: 'Fade', value: 'FADE' },
  { label: 'Slide', value: 'SLIDE' },
  { label: 'Zoom', value: 'ZOOM' },
  { label: 'Ninguna', value: 'NINGUNA' },
];

const ETIQUETAS_TAMANIO: Record<string, string> = {
  PEQUENA: 'PEQUEÑA',
  MEDIANA: 'MEDIANA',
  GRANDE: 'GRANDE',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

interface FormData {
  titulo: string;
  subtitulo: string;
  resumen: string;
  cuerpo: string;
  categoria: string;
  tamanio: string;
  posicion_imagen: string;
  color_acento: string;
  link_externo: string;
  animacion: string;
  en_ticker: boolean;
  activa: boolean;
  orden: number;
  fecha_publicacion: Date | null;
  imagen: File | null;
  imagenPreview: string;
}

const INITIAL_FORM: FormData = {
  titulo: '',
  subtitulo: '',
  resumen: '',
  cuerpo: '',
  categoria: 'Economía',
  tamanio: 'PEQUENA',
  posicion_imagen: 'ARRIBA',
  color_acento: '#02254A',
  link_externo: '',
  animacion: 'NINGUNA',
  en_ticker: false,
  activa: true,
  orden: 0,
  fecha_publicacion: new Date(),
  imagen: null,
  imagenPreview: '',
};

export default function NoticiasAdmin() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filterCategoria, setFilterCategoria] = useState<string | null>(null);
  const [filterTamanio, setFilterTamanio] = useState<string | null>(null);
  const [filterTicker, setFilterTicker] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({ ...INITIAL_FORM });

  const toast = useRef<Toast>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const loadNoticias = useCallback(async () => {
    try {
      const data = await noticiasService.getNoticias();
      setNoticias(data);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las noticias', life: 3000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNoticias();
  }, [loadNoticias]);

  const resetForm = () => {
    setFormData({ ...INITIAL_FORM });
    setEditingId(null);
  };

  const handleEdit = (n: Noticia) => {
    setFormData({
      titulo: n.titulo,
      subtitulo: n.subtitulo || '',
      resumen: n.resumen || '',
      cuerpo: n.cuerpo || '',
      categoria: n.categoria,
      tamanio: n.tamanio,
      posicion_imagen: n.posicion_imagen,
      color_acento: n.color_acento || '#02254A',
      link_externo: n.link_externo || '',
      animacion: n.animacion || 'NINGUNA',
      en_ticker: n.en_ticker === 1,
      activa: n.activa === 1,
      orden: n.orden,
      fecha_publicacion: n.fecha_publicacion ? new Date(n.fecha_publicacion) : new Date(),
      imagen: null,
      imagenPreview: n.imagen_url ? `${API_STORAGE}${n.imagen_url}` : '',
    });
    setEditingId(n.id);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSave = async () => {
    if (!formData.titulo.trim()) {
      toast.current?.show({ severity: 'warn', summary: 'Validación', detail: 'El título es obligatorio', life: 3000 });
      return;
    }
    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('titulo', formData.titulo.trim());
      fd.append('subtitulo', formData.subtitulo.trim());
      fd.append('resumen', formData.resumen.trim());
      fd.append('cuerpo', formData.cuerpo.trim());
      fd.append('categoria', formData.categoria);
      fd.append('tamanio', formData.tamanio);
      fd.append('posicion_imagen', formData.posicion_imagen);
      fd.append('color_acento', formData.color_acento);
      fd.append('link_externo', formData.link_externo.trim());
      fd.append('animacion', formData.animacion);
      fd.append('en_ticker', formData.en_ticker ? '1' : '0');
      fd.append('activa', formData.activa ? '1' : '0');
      fd.append('orden', String(formData.orden));
      if (formData.fecha_publicacion) {
        fd.append('fecha_publicacion', formData.fecha_publicacion.toISOString());
      }
      if (formData.imagen) {
        fd.append('imagen', formData.imagen);
      }
      if (formData.imagenPreview && !formData.imagen && editingId) {
        fd.append('imagen_url', formData.imagenPreview.replace(API_STORAGE, ''));
      }

      if (editingId) {
        await noticiasService.updateNoticia(editingId, fd);
        toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: 'Noticia actualizada correctamente', life: 3000 });
      } else {
        await noticiasService.createNoticia(fd);
        toast.current?.show({ severity: 'success', summary: 'Creada', detail: 'Noticia creada correctamente', life: 3000 });
      }

      resetForm();
      await loadNoticias();
    } catch (err: any) {
      console.error('Error saving news:', err);
      const detail = err.message || 'No se pudo guardar la noticia. Verifique los campos e intente de nuevo.';
      toast.current?.show({ severity: 'error', summary: 'Error de Servidor', detail, life: 5000 });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await noticiasService.deleteNoticia(deleteId);
      toast.current?.show({ severity: 'success', summary: 'Eliminada', detail: 'Noticia eliminada', life: 3000 });
      setShowDeleteDialog(false);
      setDeleteId(null);
      if (editingId === deleteId) resetForm();
      await loadNoticias();
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar', life: 3000 });
    }
  };

  const handleToggleActiva = async (id: number) => {
    try {
      await noticiasService.toggleActiva(id);
      setNoticias((prev) =>
        prev.map((n) => (n.id === id ? { ...n, activa: n.activa ? 0 : 1 } : n))
      );
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar estado', life: 3000 });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagen: file,
        imagenPreview: URL.createObjectURL(file),
      }));
    }
  };

  const filteredNoticias = noticias.filter((n) => {
    if (filterCategoria && n.categoria !== filterCategoria) return false;
    if (filterTamanio && n.tamanio !== filterTamanio) return false;
    if (filterTicker && n.en_ticker !== 1) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <style jsx global>{`
        .custom-selectbutton .p-button {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #64748b;
          transition: all 0.2s ease;
          border-width: 1px;
        }
        .custom-selectbutton .p-button:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #1e293b;
        }
        .custom-selectbutton .p-button.p-highlight {
          background: #02254A !important;
          border-color: #02254A !important;
          color: white !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          transform: translateY(-1px);
        }
        .custom-selectbutton .p-button.p-highlight:hover {
          background: #033669 !important;
        }
        .custom-selectbutton .p-button:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }
        .custom-selectbutton .p-button:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      `}</style>
      <Toast ref={toast} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Administrar Noticias</h1>
        <p className="text-gray-500 mt-1">Crea, edita y organiza las noticias del sitio</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* === FORMULARIO === */}
        <div ref={formRef} className="xl:col-span-2 xl:sticky xl:top-6 xl:self-start">
          <Card title={editingId ? 'Editar noticia' : 'Nueva noticia'}>
            <div className="flex flex-col gap-5">

              {/* Imagen */}
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Imagen</label>
                <div
                  className="relative w-full h-[180px] rounded-lg overflow-hidden cursor-pointer group border-2 border-dashed border-gray-300 hover:border-[#0053A4] transition-colors bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formData.imagenPreview ? (
                    <img
                      src={formData.imagenPreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <i className="pi pi-image text-4xl mb-2" />
                      <span className="text-sm">Click para subir imagen</span>
                      <span className="text-xs text-gray-300">300x180px recomendado</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="pi pi-camera text-white text-3xl" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              {/* Título */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Título</label>
                <InputText
                  value={formData.titulo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
                  placeholder="Título de la noticia"
                  className="w-full"
                />
              </div>

              {/* Subtítulo */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Subtítulo</label>
                <InputText
                  value={formData.subtitulo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subtitulo: e.target.value }))}
                  placeholder="Subtítulo opcional"
                  className="w-full"
                />
              </div>

              {/* Resumen */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Resumen</label>
                <InputTextarea
                  value={formData.resumen}
                  onChange={(e) => setFormData((prev) => ({ ...prev, resumen: e.target.value }))}
                  rows={3}
                  placeholder="Texto corto para vista previa en cards"
                  className="w-full"
                />
              </div>

              {/* Cuerpo */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Cuerpo completo</label>
                <InputTextarea
                  value={formData.cuerpo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cuerpo: e.target.value }))}
                  rows={6}
                  placeholder="Contenido completo de la noticia"
                  className="w-full"
                />
              </div>

              {/* Link externo */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Link externo</label>
                <InputText
                  value={formData.link_externo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, link_externo: e.target.value }))}
                  placeholder="https://..."
                  className="w-full"
                />
              </div>

              {/* Categoría y apariencia */}
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Categoría y apariencia</h3>

                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-sm font-semibold text-gray-600">Categoría</label>
                  <Dropdown
                    value={formData.categoria}
                    onChange={(e) => setFormData((prev) => ({ ...prev, categoria: e.value }))}
                    options={CATEGORIAS}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-sm font-semibold text-gray-600">Tamaño card</label>
                  <SelectButton
                    value={formData.tamanio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tamanio: e.value }))}
                    options={TAMANIOS}
                    className="w-full custom-selectbutton"
                    itemTemplate={(option) => (
                      <div className="flex flex-col items-center gap-1 py-1">
                        <i className={option.icon}></i>
                        <span className="text-xs">{option.label}</span>
                      </div>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-sm font-semibold text-gray-600">Posición imagen</label>
                  <SelectButton
                    value={formData.posicion_imagen}
                    onChange={(e) => setFormData((prev) => ({ ...prev, posicion_imagen: e.value }))}
                    options={POSICIONES_IMAGEN}
                    className="w-full custom-selectbutton"
                    itemTemplate={(option) => (
                      <div className="flex flex-col items-center gap-1 py-1">
                        <i className={option.icon}></i>
                        <span className="text-xs">{option.label}</span>
                      </div>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-sm font-semibold text-gray-600">Animación</label>
                  <Dropdown
                    value={formData.animacion}
                    onChange={(e) => setFormData((prev) => ({ ...prev, animacion: e.value }))}
                    options={ANIMACIONES}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-600">Color acento</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.color_acento}
                      onChange={(e) => setFormData((prev) => ({ ...prev, color_acento: e.target.value }))}
                      className="w-10 h-10 rounded cursor-pointer border border-slate-300"
                    />
                    <InputText
                      value={formData.color_acento}
                      onChange={(e) => setFormData((prev) => ({ ...prev, color_acento: e.target.value }))}
                      className="flex-1"
                    />
                    <div
                      className="w-8 h-8 rounded-full border border-slate-300 shrink-0"
                      style={{ backgroundColor: formData.color_acento }}
                    />
                  </div>
                </div>
              </div>

              {/* Publicación */}
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Publicación</h3>

                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-sm font-semibold text-gray-600">Orden</label>
                  <InputNumber
                    value={formData.orden}
                    onValueChange={(e) => setFormData((prev) => ({ ...prev, orden: e.value ?? 0 }))}
                    min={0}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-sm font-semibold text-gray-600">Mostrar en ticker</label>
                  <ToggleButton
                    onLabel="Sí"
                    offLabel="No"
                    onIcon="pi pi-check"
                    offIcon="pi pi-times"
                    checked={formData.en_ticker}
                    onChange={(e) => setFormData((prev) => ({ ...prev, en_ticker: e.value }))}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-sm font-semibold text-gray-600">Noticia activa</label>
                  <ToggleButton
                    onLabel="Activa"
                    offLabel="Inactiva"
                    onIcon="pi pi-check"
                    offIcon="pi pi-times"
                    checked={formData.activa}
                    onChange={(e) => setFormData((prev) => ({ ...prev, activa: e.value }))}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-600">Fecha de publicación</label>
                  <Calendar
                    value={formData.fecha_publicacion}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fecha_publicacion: e.value as Date }))}
                    showIcon
                    dateFormat="dd/mm/yy"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Botones */}
              <Button
                label={editingId ? 'Actualizar noticia' : 'Guardar noticia'}
                icon="pi pi-save"
                onClick={handleSave}
                loading={saving}
                className="w-full"
                severity="success"
              />

              {editingId && (
                <Button
                  label="Cancelar"
                  icon="pi pi-times"
                  onClick={resetForm}
                  className="w-full"
                  outlined
                  severity="secondary"
                />
              )}
            </div>
          </Card>
        </div>

        {/* === LISTA === */}
        <div className="xl:col-span-3">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Noticias ({noticias.length})
            </h2>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-white rounded-lg shadow-sm border border-slate-200">
            <Dropdown
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.value)}
              options={[{ label: 'Todas las categorías', value: null }, ...CATEGORIAS]}
              className="w-48"
              placeholder="Categoría"
            />
            <Dropdown
              value={filterTamanio}
              onChange={(e) => setFilterTamanio(e.value)}
              options={[{ label: 'Todos los tamaños', value: null }, ...TAMANIOS]}
              className="w-44"
              placeholder="Tamaño"
            />
            <ToggleButton
              onLabel="Solo ticker"
              offLabel="Todas"
              onIcon="pi pi-megaphone"
              offIcon="pi pi-list"
              checked={filterTicker}
              onChange={(e) => setFilterTicker(e.value)}
              className="shrink-0"
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <i className="pi pi-spin pi-spinner text-4xl text-blue-500" />
            </div>
          ) : filteredNoticias.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <i className="pi pi-megaphone text-6xl mb-4" />
              <p className="text-lg font-medium">No hay noticias publicadas</p>
              <p className="text-sm">Las noticias que agregues aparecerán aquí</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredNoticias.map((n) => (
                <div
                  key={n.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-[60px] shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {n.imagen_url ? (
                        <img
                          src={`${API_STORAGE}${n.imagen_url}`}
                          alt={n.titulo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <i className="pi pi-image text-xl" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: n.color_acento }}
                        >
                          {n.categoria}
                        </span>
                        <Tag value={ETIQUETAS_TAMANIO[n.tamanio]} severity="info" className="text-[10px]" />
                        {n.en_ticker === 1 && (
                          <Tag value="En ticker" severity="warning" className="text-[10px]" />
                        )}
                        <Tag
                          value={n.activa ? 'Activa' : 'Inactiva'}
                          severity={n.activa ? 'success' : 'secondary'}
                          className="text-[10px]"
                        />
                      </div>
                      <p className="font-semibold text-gray-800 truncate text-sm">{n.titulo}</p>
                      {n.resumen && (
                        <p className="text-xs text-gray-500 line-clamp-2">{n.resumen}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{formatDate(n.fecha_publicacion)}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        icon={n.activa ? 'pi pi-eye' : 'pi pi-eye-slash'}
                        rounded
                        text
                        severity="secondary"
                        tooltip={n.activa ? 'Desactivar' : 'Activar'}
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => handleToggleActiva(n.id)}
                      />
                      <Button
                        icon="pi pi-pencil"
                        rounded
                        text
                        severity="info"
                        tooltip="Editar"
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => handleEdit(n)}
                      />
                      <Button
                        icon="pi pi-trash"
                        rounded
                        text
                        severity="danger"
                        tooltip="Eliminar"
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => confirmDelete(n.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog
        header="Eliminar noticia"
        visible={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        style={{ width: '420px' }}
        draggable={false}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setShowDeleteDialog(false)}
              outlined
              severity="secondary"
            />
            <Button
              label="Eliminar"
              icon="pi pi-trash"
              onClick={handleDelete}
              severity="danger"
            />
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <i className="pi pi-exclamation-triangle text-2xl text-red-500 mt-1" />
          <div>
            <p className="text-gray-700 font-medium">¿Eliminar esta noticia?</p>
            <p className="text-sm text-gray-500 mt-1">
              Esta acción no se puede deshacer. La noticia se eliminará permanentemente.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
