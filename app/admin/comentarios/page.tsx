'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { comentariosService } from '@/lib/services/comentariosService';
import type { Comentario } from '@/lib/services/comentariosService';

const AVATAR_COLORS = ['#02254A', '#0053A4', '#0B5ED7', '#1E88E5', '#1565C0', '#0D47A1'];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function ComentariosAdmin() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    nombre_cliente: '',
    comentario: '',
    estrellas: 5,
    foto: null as File | null,
    fotoPreview: '' as string,
  });

  const toast = useRef<Toast>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const loadComentarios = useCallback(async () => {
    try {
      const data = await comentariosService.getComentarios();
      setComentarios(data);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los comentarios', life: 3000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadComentarios();
  }, [loadComentarios]);

  const resetForm = () => {
    setFormData({ nombre_cliente: '', comentario: '', estrellas: 5, foto: null, fotoPreview: '' });
    setEditingId(null);
  };

  const handleEdit = (c: Comentario) => {
    setFormData({
      nombre_cliente: c.nombre_cliente,
      comentario: c.comentario,
      estrellas: c.estrellas,
      foto: null,
      fotoPreview: c.foto_url ?? '',
    });
    setEditingId(c.id);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSave = async () => {
    if (!formData.nombre_cliente.trim() || !formData.comentario.trim()) {
      toast.current?.show({ severity: 'warn', summary: 'Validación', detail: 'Nombre y comentario son obligatorios', life: 3000 });
      return;
    }
    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('nombre_cliente', formData.nombre_cliente.trim());
      fd.append('comentario', formData.comentario.trim());
      fd.append('estrellas', String(formData.estrellas));
      if (formData.foto) {
        fd.append('foto', formData.foto);
      }
      if (formData.fotoPreview && !formData.foto && editingId) {
        fd.append('foto_url', formData.fotoPreview);
      }

      if (editingId) {
        await comentariosService.updateComentario(editingId, fd);
        toast.current?.show({ severity: 'success', summary: 'Actualizado', detail: 'Comentario actualizado correctamente', life: 3000 });
      } else {
        await comentariosService.createComentario(fd);
        toast.current?.show({ severity: 'success', summary: 'Creado', detail: 'Comentario creado correctamente', life: 3000 });
      }

      resetForm();
      await loadComentarios();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message || 'No se pudo guardar', life: 3000 });
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
      await comentariosService.deleteComentario(deleteId);
      toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Comentario eliminado', life: 3000 });
      setShowDeleteDialog(false);
      setDeleteId(null);
      if (editingId === deleteId) resetForm();
      await loadComentarios();
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar', life: 3000 });
    }
  };

  const handleToggleVisible = async (id: number) => {
    try {
      await comentariosService.toggleVisible(id);
      setComentarios((prev) =>
        prev.map((c) => (c.id === id ? { ...c, visible: c.visible ? 0 : 1 } : c))
      );
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar visibilidad', life: 3000 });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        foto: file,
        fotoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const visibleCount = comentarios.filter((c) => c.visible).length;

  return (
    <div className="max-w-7xl mx-auto">
      <Toast ref={toast} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Testimonios y Comentarios</h1>
        <p className="text-gray-500 mt-1">Administra los comentarios que aparecen en la web</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* === FORMULARIO (LADO IZQUIERDO) === */}
        <div ref={formRef} className="xl:col-span-2 xl:sticky xl:top-6 xl:self-start">
          <Card title={editingId ? 'Editar comentario' : 'Nuevo comentario'}>
            <div className="flex flex-col gap-5">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group border-2 border-dashed border-gray-300 hover:border-[#0053A4] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formData.fotoPreview ? (
                    <img
                      src={formData.fotoPreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: getAvatarColor(formData.nombre_cliente || '?') }}
                    >
                      {formData.nombre_cliente ? getInitials(formData.nombre_cliente) : '?'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="pi pi-camera text-white text-2xl" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <span className="text-xs text-gray-400">Click para cambiar foto</span>
              </div>

              {/* Nombre */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Nombre del cliente</label>
                <InputText
                  value={formData.nombre_cliente}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nombre_cliente: e.target.value }))}
                  placeholder="Ej: María García"
                  className="w-full"
                />
              </div>

              {/* Comentario */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Comentario</label>
                <InputTextarea
                  value={formData.comentario}
                  onChange={(e) => setFormData((prev) => ({ ...prev, comentario: e.target.value }))}
                  rows={4}
                  placeholder="Escribe el testimonio del cliente..."
                  className="w-full"
                />
              </div>

              {/* Estrellas */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Calificación</label>
                <Rating
                  value={formData.estrellas}
                  onChange={(e) => setFormData((prev) => ({ ...prev, estrellas: e.value ?? 5 }))}
                  stars={5}
                  cancel={false}
                  pt={{
                    onIcon: { className: 'text-2xl text-amber-400' },
                    offIcon: { className: 'text-2xl text-gray-300' },
                  }}
                />
              </div>

              {/* Botones */}
              <Button
                label={editingId ? 'Actualizar comentario' : 'Guardar comentario'}
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

        {/* === LISTA DE COMENTARIOS (LADO DERECHO) === */}
        <div className="xl:col-span-3">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Comentarios publicados ({comentarios.length})
            </h2>
            <p className="text-sm text-gray-400">
              {visibleCount} visibles &middot; {comentarios.length - visibleCount} ocultos
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <i className="pi pi-spin pi-spinner text-4xl text-blue-500" />
            </div>
          ) : comentarios.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <i className="pi pi-comment text-6xl mb-4" />
              <p className="text-lg font-medium">Aún no hay comentarios</p>
              <p className="text-sm">Los comentarios que agregues aparecerán aquí</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comentarios.map((c) => {
                const isExpanded = expandedId === c.id;
                const isLong = c.comentario.length > 120;

                return (
                  <div
                    key={c.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col"
                  >
                    {/* Header: Avatar + Name + Date */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: getAvatarColor(c.nombre_cliente) }}
                      >
                        {c.foto_url ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:3001'}${c.foto_url}`}
                            alt={c.nombre_cliente}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(c.nombre_cliente)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{c.nombre_cliente}</p>
                        <p className="text-xs text-gray-400">{formatDate(c.creado_en)}</p>
                      </div>
                      <Tag
                        value={c.visible ? 'Visible' : 'Oculto'}
                        severity={c.visible ? 'success' : 'secondary'}
                        className="text-xs flex-shrink-0"
                      />
                    </div>

                    {/* Stars */}
                    <div className="mb-2">
                      <Rating
                        value={c.estrellas}
                        readOnly
                        stars={5}
                        cancel={false}
                        pt={{
                          onIcon: { className: 'text-lg text-amber-400' },
                          offIcon: { className: 'text-lg text-gray-300' },
                        }}
                      />
                    </div>

                    {/* Comment */}
                    <div className="flex-1 mb-3">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {isLong && !isExpanded
                          ? c.comentario.slice(0, 120) + '...'
                          : c.comentario}
                      </p>
                      {isLong && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : c.id)}
                          className="text-xs text-[#0053A4] hover:underline mt-1 cursor-pointer"
                        >
                          {isExpanded ? 'Ver menos' : 'Ver más'}
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <Button
                        icon={c.visible ? 'pi pi-eye' : 'pi pi-eye-slash'}
                        rounded
                        text
                        severity="secondary"
                        tooltip={c.visible ? 'Ocultar' : 'Mostrar'}
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => handleToggleVisible(c.id)}
                      />
                      <Button
                        icon="pi pi-pencil"
                        rounded
                        text
                        severity="info"
                        tooltip="Editar"
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => handleEdit(c)}
                      />
                      <Button
                        icon="pi pi-trash"
                        rounded
                        text
                        severity="danger"
                        tooltip="Eliminar"
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => confirmDelete(c.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        header="Eliminar comentario"
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
            <p className="text-gray-700 font-medium">¿Eliminar este comentario?</p>
            <p className="text-sm text-gray-500 mt-1">
              Esta acción no se puede deshacer. El comentario se eliminará permanentemente.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
